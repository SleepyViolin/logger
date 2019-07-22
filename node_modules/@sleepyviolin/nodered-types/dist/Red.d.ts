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
import { NodeId, NodeConfig } from "./NodeInterface";
import { Node } from "./Node";
export interface Red {
    log: any;
    util: any;
    readonly nodes: Nodes;
    events: any;
    readonly settings: any;
    readonly version: string;
    readonly httpAdmin: any;
    readonly httpNode: any;
    readonly server: any;
    runtime: any;
    auth: any;
    start(): Promise<any>;
    stop(): Promise<any>;
}
export interface Nodes {
    createNode(node: Node, config: NodeConfig): void;
    getNode(id: NodeId): Node | null;
    eachNode(callback: (node: NodeConfig) => any): void;
    addCredentials(id: NodeId, creds: object): void;
    getCredentials(id: NodeId): object;
    deleteCredentials(id: NodeId): void;
    registerType<T extends NodeConfig>(type: string, node: new (config: T) => any, opts?: any): void;
}
