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

import * as NodeRed from "@sleepyviolin/nodered-types";

// ++++++++++++++++++++++++++++++ Types ++++++++++++++++++++++++++++++

export enum LogLevel {
    trace = 1 << 1,
    todo = 1 << 2,
    debug = 1 << 3,
    info = 1 << 4,
    warn = 1 << 5,
    error = 1 << 6,
}

export interface LoggerOptions {
    dotted?: boolean;
    dottedLength?: number;
    dotPattern?: string;
    severalPattern?: boolean;
    dotPatternLeft?: string;
    dotPatternRight?: string;
    emptyMessagePlaceholder?: string;
    spacer?: string;
    silent?: boolean;
    sendToPort?: string; // TODO
}

// ++++++++++++++++++++++++++++++ Class Logger ++++++++++++++++++++++++++++++

export class Logger {

    // ************************************************************************
    // *** Propertys ***

    // private static _instance: Logger;
    private static _logLevel: number = LogLevel.trace;
    private static _isSilent: boolean = false;
    private static _silentLogs: string[][] = [];
    private static _timeMeasurements: Map<string, number> = new Map();
    private static _ports: Map<string, NodeRed.Node> = new Map();
    private static _optionsStandartValues: LoggerOptions = {
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

    // ************************************************************************
    // *** Getter / Setter ***

    // ************************************************************************
    // *** Constructor and Initializer ***

    private constructor() {
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

    public static setNodeRedPort(givenRedNode: NodeRed.Node) {
        Logger._ports.set(`NodeRed`, givenRedNode);
    }

    public static setLogLevel(givenLogLevel: LogLevel) {
        Logger._logLevel = givenLogLevel;
    }

    public static trace(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & LogLevel.trace) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.trace, givenOptions);
        }
    }

    public static todo(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.todo)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.todo, givenOptions);
        }
    }

    public static debug(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug)) {
            // if (typeof givenMessage === "object") { givenMessage = JSON.stringify(givenMessage, null, 4) }
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.debug, givenOptions);
        }
    }

    public static info(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.info, givenOptions);
        }
    }

    public static warn(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info | LogLevel.warn)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.warn, givenOptions);
        }
    }

    public static error(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.info | LogLevel.warn | LogLevel.error)) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.error, givenOptions);
        }
    }

    public static startTimeMeasurement(givenId: string) {
        this._timeMeasurements.set(givenId, Date.now());
    }

    public static stopTimeMeasurement(givenId: string) {
        return Date.now() - this._timeMeasurements.get(givenId);
    }

    public static silentRecord(givenRecordTime: number = 10000) {
        this.startSilentRecord();
        setTimeout(() => { this.stopSilentRecord(); }, givenRecordTime);
    }

    public static startSilentRecord() {
        this._isSilent = true;
    }

    public static stopSilentRecord() {
        this._isSilent = false;
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1]));
        this._silentLogs = new Array();
    }

    public static printSilentRecords() {
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1]));
        this._silentLogs = new Array();
    }

    // *** Protected ***

    // *** Private ***

    private static logLevelToString(givenLogLevel: LogLevel): string {
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

    private static getOriginName(givenOrigin: any): string {
        let originName = ``;
        if (givenOrigin) {
            originName = (givenOrigin.constructor.name === `Function`) ? `${givenOrigin.name}:` : `${givenOrigin.constructor.name}:`;
        }
        return originName;
    }

    private static generateTimestamp(): string {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + ((date.getTimezoneOffset() / 60) * -1));
        const utcTimestamp = date.toUTCString();
        const formattedTimestamp = `${utcTimestamp.slice(5, 11)}${utcTimestamp.slice(16, 25)}`;
        return formattedTimestamp;
    }

    private static generateMessagePrefix(givenOrigin: any, givenLogLevel: LogLevel): string {
        let messagePrefix = `${Logger.generateTimestamp()} - ${Logger.logLevelToString(givenLogLevel)} `;
        messagePrefix += Logger.getOriginName(givenOrigin);
        return messagePrefix;
    }

    private static generateDottedMessage(givenMessage: string, givenOrigin: any, givenOptions: LoggerOptions): string {
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
        } else {
            leftPattern = `${options.dotPattern.repeat(leftPatternCount)}`;
            rightPattern = `${options.dotPattern.repeat(rigthPatternCount)}`;
        }
        return leftPattern + options.spacer.repeat(Math.ceil(offsetLength / 2)) + message + options.spacer.repeat(Math.floor(offsetLength / 2)) + rightPattern;
    }

    private static generateMessage(givenMessage: string, givenOrigin: any, givenOptions: LoggerOptions): string {
        let message = ``;
        if (givenOptions && givenOptions.dotted) {
            message = Logger.generateDottedMessage(givenMessage, givenOrigin, givenOptions);
        } else {
            message = givenMessage;
        }
        return message;
    }

    private static logMessage(givenMessage: string, givenOrigin: any, givenLogLevel: LogLevel, givenOptions: LoggerOptions) {
        const nodeRedPort = Logger._ports.get(`NodeRed`);
        const messagePrefix = Logger.generateMessagePrefix(givenOrigin, givenLogLevel);
        if (this._isSilent || (givenOptions && givenOptions.silent)) {
            this._silentLogs.push([messagePrefix, givenMessage]);
        } else if (nodeRedPort) {
            nodeRedPort.log({ message: givenMessage, origin: givenOrigin });
        } else {
            const message = Logger.generateMessage(givenMessage, givenOrigin, givenOptions);
            Logger.logWithPrefix(message, messagePrefix);
        }
    }

    private static logWithPrefix(givenMessage: string, givenMessagePrefix: string) {
        const prefixedLogger = console.log.bind(console, givenMessagePrefix);
        prefixedLogger(givenMessage);
    }
}
