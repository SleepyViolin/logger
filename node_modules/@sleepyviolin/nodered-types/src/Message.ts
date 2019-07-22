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

export interface Message {
    payload: any;           // contains the main body of the message. For example, the text of a Tweet, the content of a webpage or a sensor reading.
    title?: any;            // a title giving a good representation of what the message contains.
    description?: any;      // a brief explanation of what data is contained within the message.
    data?: any;             // some APIs provide large responses. For example, the Twitter api returns a huge object for each tweet containing many properties beyond just the text. This property can be used to store the original response - allowing access to all of the properties, not just those that get pulled out into msg.payload.
    location?: {            // an object containing properties representing location information.
        lat: any,
        lon: any,
        name: any,
        city: any,
        country: any
    };
    time?: any;              // a time. The time should be either JavaScript Date object, or a number of milliseconds since epoch.

    /*
    For Fitness/ activity based nodes/ flows:

    msg.payload.id - The ID of the activity in the given fitness system/ API
    msg.payload.type - The type of the activity, example: run / cycle ride
    msg.payload.duration - Duration of the activity in seconds
    msg.payload.distance - Distance of activity in metres
    msg.payload.calories - Calories burned during activity in kilocalories
    msg.payload.starttime - JavaScript Date object representing the start time of the activity
    */
}
