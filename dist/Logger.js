"use strict";
/**
 * Copyright 2017 Raphael Lauterbach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// ++++++++++++++++++++++++++++++ Types ++++++++++++++++++++++++++++++
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["trace"] = 2] = "trace";
    LogLevel[LogLevel["todo"] = 4] = "todo";
    LogLevel[LogLevel["debug"] = 8] = "debug";
    LogLevel[LogLevel["info"] = 16] = "info";
    LogLevel[LogLevel["warn"] = 32] = "warn";
    LogLevel[LogLevel["error"] = 64] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// ++++++++++++++++++++++++++++++ Class Logger ++++++++++++++++++++++++++++++
class Logger {
    // ************************************************************************
    // *** Getter / Setter ***
    // ************************************************************************
    // *** Constructor and Initializer ***
    constructor() {
        // do something construct...
    }
    /*
    static getInstance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger()
        }
        return Logger._instance;
    }
    */
    // ************************************************************************
    // *** Static Functions ***
    // *** Public ***
    static setNodeRedPort(givenRedNode) {
        Logger._ports.set(`NodeRed`, givenRedNode);
    }
    static setLogLevel(givenLogLevel) {
        Logger._logLevel = givenLogLevel;
    }
    static trace(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & LogLevel.trace) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.trace, givenOptions);
        }
    }
    static todo(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.todo)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.todo, givenOptions);
        }
    }
    static debug(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug)) {
            // if (typeof givenMessage === "object") { givenMessage = JSON.stringify(givenMessage, null, 4) }
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.debug, givenOptions);
        }
    }
    static info(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.info, givenOptions);
        }
    }
    static warn(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info | LogLevel.warn)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.warn, givenOptions);
        }
    }
    static error(givenMessage, givenOrigin, givenOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info | LogLevel.warn | LogLevel.error)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.error, givenOptions);
        }
    }
    static startTimeMeasurement(givenId) {
        this._timeMeasurements.set(givenId, Date.now());
    }
    static stopTimeMeasurement(givenId) {
        return Date.now() - this._timeMeasurements.get(givenId);
    }
    static silentRecord(givenRecordTime = 10000) {
        this.startSilentRecord();
        setTimeout(() => { this.stopSilentRecord(); }, givenRecordTime);
    }
    static startSilentRecord() {
        this._isSilent = true;
    }
    static stopSilentRecord() {
        this._isSilent = false;
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1]));
        this._silentLogs = new Array();
    }
    static printSilentRecords() {
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1]));
        this._silentLogs = new Array();
    }
    // *** Protected ***
    // *** Private ***
    static logLevelToString(givenLogLevel) {
        let logLevelString;
        switch (givenLogLevel) {
            case LogLevel.trace:
                logLevelString = `[Trace]  `;
                break;
            case LogLevel.todo:
                logLevelString = `[TODO]   `;
                break;
            case LogLevel.debug:
                logLevelString = `[Debug]  `;
                break;
            case LogLevel.info:
                logLevelString = `[Info]   `;
                break;
            case LogLevel.warn:
                logLevelString = `[Warning]`;
                break;
            case LogLevel.error:
                logLevelString = `[Error]  `;
                break;
            default:
                logLevelString = `[WTF]    `;
        }
        return logLevelString;
    }
    static getOriginName(givenOrigin) {
        let originName = ``;
        if (givenOrigin) {
            originName = (givenOrigin.constructor.name === `Function`) ? `${givenOrigin.name}:` : `${givenOrigin.constructor.name}:`;
        }
        return originName;
    }
    static generateTimestamp() {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + ((date.getTimezoneOffset() / 60) * -1));
        const utcTimestamp = date.toUTCString();
        const formattedTimestamp = `${utcTimestamp.slice(5, 11)}${utcTimestamp.slice(16, 25)}`;
        return formattedTimestamp;
    }
    static generateMessagePrefix(givenOrigin, givenLogLevel) {
        let messagePrefix = `${Logger.generateTimestamp()} - ${Logger.logLevelToString(givenLogLevel)} `;
        messagePrefix += Logger.getOriginName(givenOrigin);
        return messagePrefix;
    }
    static generateDottedMessage(givenMessage, givenOrigin, givenOptions) {
        const options = Object.assign(Object.assign({}, Logger._optionsStandartValues), givenOptions);
        let message = givenMessage || options.emptyMessagePlaceholder;
        message = options.spacer + message + options.spacer;
        const dynamicDottedLength = options.dottedLength - (Logger.getOriginName(givenOrigin)).length - message.length;
        const leftPatternCount = Math.floor((dynamicDottedLength / 2) / (options.severalPattern ? options.dotPatternLeft.length : options.dotPattern.length));
        const rigthPatternCount = Math.floor((dynamicDottedLength / 2) / (options.severalPattern ? options.dotPatternRight.length : options.dotPattern.length));
        const dottedMessageLenth = (leftPatternCount * (options.severalPattern ? options.dotPatternLeft.length : options.dotPattern.length))
            + message.length
            + (rigthPatternCount * (options.severalPattern ? options.dotPatternRight.length : options.dotPattern.length));
        const realLength = dottedMessageLenth + (Logger.getOriginName(givenOrigin)).length;
        const offsetLength = options.dottedLength - realLength;
        let leftPattern = ``;
        let rightPattern = ``;
        if (options.severalPattern) {
            leftPattern = `${options.dotPatternLeft.repeat(leftPatternCount)}`;
            rightPattern = `${options.dotPatternRight.repeat(rigthPatternCount)}`;
        }
        else {
            leftPattern = `${options.dotPattern.repeat(leftPatternCount)}`;
            rightPattern = `${options.dotPattern.repeat(rigthPatternCount)}`;
        }
        return leftPattern + options.spacer.repeat(Math.ceil(offsetLength / 2)) + message + options.spacer.repeat(Math.floor(offsetLength / 2)) + rightPattern;
    }
    static generateMessage(givenMessage, givenOrigin, givenOptions) {
        let message = ``;
        if (givenOptions && givenOptions.dotted) {
            message = Logger.generateDottedMessage(givenMessage, givenOrigin, givenOptions);
        }
        else {
            message = givenMessage;
        }
        return message;
    }
    static logMessage(givenMessage, givenOrigin, givenLogLevel, givenOptions) {
        const nodeRedPort = Logger._ports.get(`NodeRed`);
        const messagePrefix = Logger.generateMessagePrefix(givenOrigin, givenLogLevel);
        if (this._isSilent || (givenOptions && givenOptions.silent)) {
            this._silentLogs.push([messagePrefix, givenMessage]);
        }
        else if (nodeRedPort) {
            nodeRedPort.log({ message: givenMessage, origin: givenOrigin });
        }
        else {
            const message = Logger.generateMessage(givenMessage, givenOrigin, givenOptions);
            Logger.logWithPrefix(message, messagePrefix);
        }
    }
    static logWithPrefix(givenMessage, givenMessagePrefix) {
        const prefixedLogger = console.log.bind(console, givenMessagePrefix);
        prefixedLogger(givenMessage);
    }
}
// ************************************************************************
// *** Propertys ***
// private static _instance: Logger;
Logger._logLevel = LogLevel.trace;
Logger._isSilent = false;
Logger._silentLogs = [];
Logger._timeMeasurements = new Map();
Logger._ports = new Map();
Logger._optionsStandartValues = {
    dotted: false,
    dottedLength: 110,
    dotPattern: `-`,
    severalPattern: false,
    dotPatternLeft: `-->`,
    dotPatternRight: `<--`,
    emptyMessagePlaceholder: `End`,
    spacer: ` `,
    silent: false,
    sendToPort: `Console`
};
exports.Logger = Logger;
