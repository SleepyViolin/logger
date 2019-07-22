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

import { Message } from "./Message";

export type NodeId = string;
export type NodeType = string;
export type NodeStatusFill = `red` | `green` | `yellow` | `blue` | `grey`;
export type NodeStatusShape = `ring` | `dot`;

export interface NodeStatus {
    fill: NodeStatusFill;
    shape: NodeStatusShape;
    text: string;
}

export interface ClearNodeStatus {
    fill?: undefined;
    shape?: undefined;
    text?: undefined;
}

export interface NodeConfig {
    id: NodeId;
    name: string;
    type: NodeType;
}

export interface NodeInterface extends NodeConfig {
    z: string;
    wires: any[];
    updateWires(wires: any): void;
    context(): any;
    close(removed: any): void;
    send(message: Message[]): void;
    send(message?: Message): void;
    receive(message: any): void;
    log(message: any, ...args): void;
    warn(message: any, ...args): void;
    error(logMessage: any, msg?: any): void;
    debug(message: any, ...args): void;
    trace(message: any, ...args): void;
    metric(eventname?: any, msg?: any, metricValue?: any): void;
    status(status: NodeStatus | ClearNodeStatus): void;
}
