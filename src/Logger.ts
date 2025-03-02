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

import * as NodeRed from "node-red";
import { Color } from "./Color";

// ++++++++++++++++++++++++++++++ Types ++++++++++++++++++++++++++++++

export enum LogLevel {
    trace = 1 << 1,
    debug = 1 << 2,
    todo = 1 << 3,
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
    prefixSeperator?: string;
    emptyMessagePlaceholder?: string;
    spacer?: string;
    silent?: boolean;
    sendToPort?: string; // TODO
}

// ++++++++++++++++++++++++++++++ Class ++++++++++++++++++++++++++++++

export class Logger {
    // ************************************************************************
    // *** Propertys ***

    // *** Public ***

    // *** Private ***

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
        prefixSeperator: `>>`,
        emptyMessagePlaceholder: `End`,
        spacer: ` `,
        silent: false,
        sendToPort: `Console`,
    };

    // ************************************************************************
    // *** Getter / Setter ***

    // ************************************************************************
    // *** Constructor and Initializer ***

    private constructor() {
        // do something construct...
    }

    // ************************************************************************
    // *** Static Functions ***

    // *** Public ***

    public static trace(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & LogLevel.trace) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.trace, givenOptions, ...args);
        }
    }

    public static debug(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug)) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.debug, givenOptions, ...args);
        }
    }

    public static todo(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.todo)) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.todo, givenOptions, ...args);
        }
    }

    public static info(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.todo | LogLevel.info)) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.info, givenOptions, ...args);
        }
    }

    public static warn(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.todo | LogLevel.info | LogLevel.warn)) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.warn, givenOptions, ...args);
        }
    }

    public static error(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & (LogLevel.trace | LogLevel.debug | LogLevel.todo | LogLevel.info | LogLevel.warn | LogLevel.error)) {
            return this.logMessage(givenMessage, givenOrigin, LogLevel.error, givenOptions, ...args);
        }
    }

    public static toHumanReadableTime(givenTime: number): string {
        const milliSeconds = givenTime % 1000;
        const seconds = Math.floor(givenTime / 1000) % 60;
        const minutes = Math.floor(givenTime / 1000 / 60) % 60;
        const hours = Math.floor(givenTime / 1000 / 60 / 24) % 24;
        const days = Math.floor(givenTime / 1000 / 60 / 60 / 24 / 365) % 365;
        const years = Math.floor(givenTime / 1000 / 60 / 60 / 24 / 365);

        let humanReadableTime = years ? years + `y ` : ``;
        humanReadableTime += days ? days + `d ` : ``;
        humanReadableTime += hours ? hours + `h ` : ``;
        humanReadableTime += minutes ? minutes + `m ` : ``;
        humanReadableTime += seconds ? seconds + `s ` : ``;
        humanReadableTime += milliSeconds ? milliSeconds + `ms` : ``;

        return humanReadableTime;
    }

    public static setNodeRedPort(givenRedNode: NodeRed.Node) {
        Logger._ports.set(`NodeRed`, givenRedNode);
    }

    public static setLogLevel(givenLogLevel: LogLevel) {
        Logger._logLevel = givenLogLevel;
    }

    public static test(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]) {
        if (Logger._logLevel & LogLevel.trace) {
            Logger.logMessage(givenMessage, givenOrigin, LogLevel.trace, givenOptions, ...args);
        }
    }

    public static startTimeMeasurement(givenId: string) {
        this._timeMeasurements.set(givenId, Date.now());
    }

    public static stopTimeMeasurement(givenId: string, givenMessage: string = ``, givenOrigin?: any) {
        const measuredTime = Date.now() - this._timeMeasurements.get(givenId);
        Logger.debug(`${givenMessage} -> measured time for Id(${givenId}): ${measuredTime}ms`, givenOrigin);
    }

    public static silentRecord(givenPrintAfterRun?: boolean, givenRecordTime: number = 10000) {
        this.startSilentRecord();
        setTimeout(() => {
            this.stopSilentRecord();
            if (givenPrintAfterRun) {
                this.printSilentRecords();
            }
        }, givenRecordTime);
    }

    public static startSilentRecord() {
        this._isSilent = true;
    }

    public static stopSilentRecord() {
        this._isSilent = false;
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1])());
        this._silentLogs = new Array();
    }

    public static printSilentRecords() {
        this._silentLogs.forEach((logMessage) => Logger.logWithPrefix(logMessage[0], logMessage[1])());
        this._silentLogs = new Array();
    }

    // *** Protected ***

    // *** Private ***

    private static logLevelToString(givenLogLevel: LogLevel): string {
        let logLevelString: string;
        switch (givenLogLevel) {
            case LogLevel.trace:
                logLevelString = `[Trace]  `;
                break;
            case LogLevel.todo:
                logLevelString = `[${Color.black(Color.bgCyan(`TODO`))}]   `;
                break;
            case LogLevel.debug:
                logLevelString = `[${Color.yellow(`Debug`)}]  `;
                break;
            case LogLevel.info:
                logLevelString = `[Info]   `;
                break;
            case LogLevel.warn:
                logLevelString = `[${Color.black(Color.bgYellow(`Warning`))}]`;
                break;
            case LogLevel.error:
                logLevelString = `[${Color.black(Color.bgRed(`Error`))}]  `;
                break;
            default:
                logLevelString = `[WTF]    `;
        }
        return logLevelString;
    }

    private static getOriginName(givenOrigin: any): string {
        let originName = ``;
        if (givenOrigin) {
            if (typeof givenOrigin === `string`) {
                // Passthrough string
                return givenOrigin;
            }
            if (givenOrigin.constructor.name === `Function`) {
                originName += givenOrigin.name;
            } else {
                originName += givenOrigin.constructor.name;
            }
            originName += `[${Color.cyan(`${givenOrigin.id || `Class`}`)}]`;
        }
        return originName;
    }

    private static generateTimestamp(): string {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + (date.getTimezoneOffset() / 60) * -1);
        const utcTimestamp = date.toUTCString();
        let formattedTimestamp = `${utcTimestamp.slice(5, 11)}${utcTimestamp.slice(16, 25)}`;
        formattedTimestamp = formattedTimestamp.replace(/^0+/, ""); // remove leading zeros
        return formattedTimestamp;
    }

    private static generateMessagePrefix(givenOrigin: any, givenLogLevel: LogLevel): string {
        let messagePrefix = `${Logger.generateTimestamp()} - ${Logger.logLevelToString(givenLogLevel)} `;
        messagePrefix += `${Logger.getOriginName(givenOrigin)} ${Logger._optionsStandartValues.prefixSeperator}`;
        return messagePrefix;
    }

    private static generateDottedMessage(givenMessage: string, givenOrigin: any, givenOptions: LoggerOptions): string {
        const options = Object.assign(Object.assign({}, Logger._optionsStandartValues), givenOptions);

        let message = givenMessage || options.emptyMessagePlaceholder;
        message = options.spacer + message + options.spacer;

        const dynamicDottedLength = options.dottedLength - Logger.getOriginName(givenOrigin).length - message.length;
        const leftPatternCount = Math.floor(dynamicDottedLength / 2 / (options.severalPattern ? options.dotPatternLeft.length : options.dotPattern.length));
        const rigthPatternCount = Math.floor(dynamicDottedLength / 2 / (options.severalPattern ? options.dotPatternRight.length : options.dotPattern.length));
        const dottedMessageLenth =
            leftPatternCount * (options.severalPattern ? options.dotPatternLeft.length : options.dotPattern.length) +
            message.length +
            rigthPatternCount * (options.severalPattern ? options.dotPatternRight.length : options.dotPattern.length);
        const realLength = dottedMessageLenth + Logger.getOriginName(givenOrigin).length;
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

    private static logMessage(givenMessage: string, givenOrigin: any, givenLogLevel: LogLevel, givenOptions: LoggerOptions, ...args: any[]) {
        const nodeRedPort = Logger._ports.get(`NodeRed`);
        const messagePrefix = Logger.generateMessagePrefix(givenOrigin, givenLogLevel);
        if (this._isSilent || (givenOptions && givenOptions.silent)) {
            this._silentLogs.push([messagePrefix, givenMessage]);
        } else if (nodeRedPort) {
            nodeRedPort.log({ message: givenMessage, origin: givenOrigin });
        } else {
            const message = Logger.generateMessage(givenMessage, givenOrigin, givenOptions);
            return Logger.logWithPrefix(message, messagePrefix, ...args);
        }
    }

    private static logWithPrefix(givenMessage: string, givenMessagePrefix: string, ...args: any[]) {
        return console.log.bind(console, givenMessagePrefix, givenMessage, ...args);
    }
}
