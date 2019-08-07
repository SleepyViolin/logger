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
export declare enum Color {
    Reset = "\u001B[0m",
    Bright = "\u001B[1m",
    Dim = "\u001B[2m",
    Underscore = "\u001B[4m",
    Blink = "\u001B[5m",
    Reverse = "\u001B[7m",
    Hidden = "\u001B[8m",
    FgBlack = "\u001B[30m",
    FgRed = "\u001B[31m",
    FgGreen = "\u001B[32m",
    FgYellow = "\u001B[33m",
    FgBlue = "\u001B[34m",
    FgMagenta = "\u001B[35m",
    FgCyan = "\u001B[36m",
    FgWhite = "\u001B[37m",
    BgBlack = "\u001B[40m",
    BgRed = "\u001B[41m",
    BgGreen = "\u001B[42m",
    BgYellow = "\u001B[43m",
    BgBlue = "\u001B[44m",
    BgMagenta = "\u001B[45m",
    BgCyan = "\u001B[46m",
    BgWhite = "\u001B[47m"
}
export declare enum LogLevel {
    trace = 2,
    debug = 4,
    todo = 8,
    info = 16,
    warn = 32,
    error = 64
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
    sendToPort?: string;
}
export declare class Logger {
    private static _logLevel;
    private static _isSilent;
    private static _silentLogs;
    private static _timeMeasurements;
    private static _ports;
    private static _optionsStandartValues;
    private constructor();
    static colorfull(givenString: string, givenColor: Color): string;
    static colorfullBoolean(givenBoolean: boolean): string;
    static colorfullRange(givenNumber: number, givenRange: number[]): string;
    static toHumanReadableTime(givenTime: number): string;
    static setNodeRedPort(givenRedNode: NodeRed.Node): void;
    static setLogLevel(givenLogLevel: LogLevel): void;
    static trace(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions): void;
    static debug(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions): void;
    static todo(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions): void;
    static info(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions): void;
    static warn(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions): void;
    static error(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions): void;
    static startTimeMeasurement(givenId: string): void;
    static stopTimeMeasurement(givenId: string, givenMessage?: string, givenOrigin?: any): void;
    static silentRecord(givenPrintAfterRun?: boolean, givenRecordTime?: number): void;
    static startSilentRecord(): void;
    static stopSilentRecord(): void;
    static printSilentRecords(): void;
    private static logLevelToString;
    private static getOriginName;
    private static generateTimestamp;
    private static generateMessagePrefix;
    private static generateDottedMessage;
    private static generateMessage;
    private static logMessage;
    private static logWithPrefix;
}
