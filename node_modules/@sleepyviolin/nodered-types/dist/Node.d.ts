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
/// <reference types="node" />
import { NodeInterface, NodeType, NodeId, NodeStatus, ClearNodeStatus } from "./NodeInterface";
import { Message } from "./Message";
import { EventEmitter } from "events";
export declare abstract class Node/*extends EventEmitter*/  implements NodeInterface, EventEmitter {
    id: NodeId;
    name: string;
    type: NodeType;
    z: string;
    wires: string[][];
    updateWires: (wires: any) => void;
    context: () => any;
    close: (removed: any) => void;
    send: (message: Message | Message[]) => void;
    receive: (message: any) => void;
    log: (message: any, ...args: any[]) => void;
    warn: (message: any, ...args: any[]) => void;
    error: (logMessage: any, msg?: any) => void;
    debug: (message: any, ...args: any[]) => void;
    trace: (message: any, ...args: any[]) => void;
    metric: (eventname?: any, msg?: any, metricValue?: any) => void;
    status: (status: NodeStatus | ClearNodeStatus) => void;
    addListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    on: (event: string | symbol, listener: (...args: any[]) => void) => this;
    once: (event: string | symbol, listener: (...args: any[]) => void) => this;
    removeListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    off: (event: string | symbol, listener: (...args: any[]) => void) => this;
    removeAllListeners: (event?: string | symbol) => this;
    setMaxListeners: (n: number) => this;
    getMaxListeners: () => number;
    listeners: (event: string | symbol) => Array<(...args: any[]) => void>;
    rawListeners: (event: string | symbol) => Array<(...args: any[]) => void>;
    emit: (event: string | symbol, ...args: any[]) => boolean;
    listenerCount: (type: string | symbol) => number;
    prependListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
    eventNames: () => Array<string | symbol>;
    private _wireCount;
    private _closeCallbacks;
    private _alias;
    private _flow;
    private _on;
}
