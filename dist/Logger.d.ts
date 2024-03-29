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
    prefixSeperator?: string;
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
    static trace(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static debug(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static todo(givenMessage: any, givenOrigin?: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static info(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static warn(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static error(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]): any;
    static toHumanReadableTime(givenTime: number): string;
    static setNodeRedPort(givenRedNode: NodeRed.Node): void;
    static setLogLevel(givenLogLevel: LogLevel): void;
    static test(givenMessage: any, givenOrigin: any, givenOptions?: LoggerOptions, ...args: any[]): void;
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
