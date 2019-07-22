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

import { NodeInterface, NodeType, NodeId, NodeStatus, ClearNodeStatus } from "./NodeInterface";
import { Message } from "./Message";
import { EventEmitter } from "events";

export abstract class Node /*extends EventEmitter*/ implements NodeInterface , EventEmitter {

    // NodeConfig
    public id: NodeId;
    public name: string;
    public type: NodeType;

    // NodeInterface
    public z: string;
    public wires: string[][];
    public updateWires: (wires: any) => void;
    public context: () => any;
    public close: (removed: any) => void;
    public send: (message: Message | Message[]) => void;
    public receive: (message: any) => void;
    public log: (message: any, ...args) => void;
    public warn: (message: any, ...args) => void;
    public error: (logMessage: any, msg?: any) => void;
    public debug: (message: any, ...args) => void;
    public trace: (message: any, ...args) => void;
    public metric: (eventname?: any, msg?: any, metricValue?: any) => void;
    public status: (status: NodeStatus | ClearNodeStatus) => void;

    // EventEmitter
    public addListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public on: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public once: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public removeListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public off: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public removeAllListeners: (event?: string | symbol) => this;
    public setMaxListeners: (n: number) => this;
    public getMaxListeners: () => number;
    public listeners: (event: string | symbol) => Array<(...args: any[]) => void>;
    public rawListeners: (event: string | symbol) => Array<(...args: any[]) => void>;
    public emit: (event: string | symbol, ...args: any[]) => boolean;
    public listenerCount: (type: string | symbol) => number;
    public prependListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    public eventNames: () => Array<string | symbol>;

    private _wireCount: number;
    private _closeCallbacks: Array<(removed: any) => void>;
    private _alias: string;
    private _flow: any;
    private _on: (event: string | symbol, listener: (...args: any[]) => void) => this;
}
