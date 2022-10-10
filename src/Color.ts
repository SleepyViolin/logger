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

// ++++++++++++++++++++++++++++++ Types ++++++++++++++++++++++++++++++

export enum ColorCode {
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",

    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",

    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
}

// ++++++++++++++++++++++++++++++ Class ++++++++++++++++++++++++++++++

export class Color {
    public static bright(givenString: string): string {
        return Color.colorfull(ColorCode.FgBlack, givenString);
    }
    public static dim(givenString: string): string {
        return Color.colorfull(ColorCode.FgRed, givenString);
    }
    public static underscore(givenString: string): string {
        return Color.colorfull(ColorCode.FgGreen, givenString);
    }
    public static blink(givenString: string): string {
        return Color.colorfull(ColorCode.FgYellow, givenString);
    }
    public static reverse(givenString: string): string {
        return Color.colorfull(ColorCode.FgBlue, givenString);
    }
    public static hidden(givenString: string): string {
        return Color.colorfull(ColorCode.FgMagenta, givenString);
    }

    public static black(givenString: string): string {
        return Color.colorfull(ColorCode.FgBlack, givenString);
    }
    public static red(givenString: string): string {
        return Color.colorfull(ColorCode.FgRed, givenString);
    }
    public static green(givenString: string): string {
        return Color.colorfull(ColorCode.FgGreen, givenString);
    }
    public static yellow(givenString: string): string {
        return Color.colorfull(ColorCode.FgYellow, givenString);
    }
    public static blue(givenString: string): string {
        return Color.colorfull(ColorCode.FgBlue, givenString);
    }
    public static magenta(givenString: string): string {
        return Color.colorfull(ColorCode.FgMagenta, givenString);
    }
    public static cyan(givenString: string): string {
        return Color.colorfull(ColorCode.FgCyan, givenString);
    }
    public static white(givenString: string): string {
        return Color.colorfull(ColorCode.FgWhite, givenString);
    }

    public static bgBlack(givenString: string): string {
        return Color.colorfull(ColorCode.BgBlack, givenString);
    }
    public static bgRed(givenString: string): string {
        return Color.colorfull(ColorCode.BgRed, givenString);
    }
    public static bgGreen(givenString: string): string {
        return Color.colorfull(ColorCode.BgGreen, givenString);
    }
    public static bgYellow(givenString: string): string {
        return Color.colorfull(ColorCode.BgYellow, givenString);
    }
    public static bgBlue(givenString: string): string {
        return Color.colorfull(ColorCode.BgBlue, givenString);
    }
    public static bgMagenta(givenString: string): string {
        return Color.colorfull(ColorCode.BgMagenta, givenString);
    }
    public static bgCyan(givenString: string): string {
        return Color.colorfull(ColorCode.BgCyan, givenString);
    }
    public static bgWhite(givenString: string): string {
        return Color.colorfull(ColorCode.BgWhite, givenString);
    }

    public static colorfull(givenColorCode: ColorCode, givenString: string) {
        return `${givenColorCode}${givenString}${ColorCode.Reset}`;
    }

    public static colorfullBoolean(givenBoolean: boolean): string {
        const booleanString = `${givenBoolean}`;
        if (givenBoolean) {
            return `${Color.colorfull(ColorCode.FgGreen, booleanString)}`;
        } else {
            return `${Color.colorfull(ColorCode.FgRed, booleanString)}`;
        }
    }

    public static colorfullRange(givenNumber: number, givenRange: number[]): string {
        const numberString = `${givenNumber}`;
        if (Array.from(givenRange.keys()).includes(givenNumber)) {
            return `${Color.colorfull(ColorCode.FgGreen, numberString)}`;
        } else {
            return `${Color.colorfull(ColorCode.FgRed, numberString)}`;
        }
    }
}
