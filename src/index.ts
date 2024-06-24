import { AnsiConsoleCodes, style } from "./ansi-colors";
import * as util from 'util';

type LogMessage = string | object;
type StyleFunction = (text: string) => string;

const INFO = "info";
const WARNING = "warning";
const ERROR = "error";

const {  Bold, Red, Green, Yellow, Blue, Magenta } = AnsiConsoleCodes;

const REGEX_SINGLE_QUOTES = /'([^'\\]|\\.)*'/gus;
const REGEX_DOUBLE_QUOTES = /"([^"\\]|\\.)*"/gus;

enum LogType {
    Info = INFO,
    Warning = WARNING,
    Error = ERROR,
}

/** Map of function references for each of the global console methods. */
const CONSOLE_FUNCS = {
    [LogType.Info]: console.info,
    [LogType.Warning]: console.warn,
    [LogType.Error]: console.error,
};

/** Map of style functions that will style the prefix prepended to messages sent to the console output. */
const PREFIX_STYLES = {
    [LogType.Info]: (text: string) => { return style(text, Blue, Bold) },
    [LogType.Warning]: (text: string) => { return style(text, Yellow, Bold) },
    [LogType.Error]: (text: string) => { return style(text, Red, Bold) }
}

const styleQuotes = (message: string) => {
    return message.replace(REGEX_DOUBLE_QUOTES, (message: string) => {
        return style(message, Green);
    });

    // return temp.replace(REGEX_DOUBLE_QUOTES, (message: string) => {
    //     return style(message, Green);
    // });
};

const DEFAULT_PREFIX = "Sudonyms.io Logger";

class Logger {
    constructor(prefix: string = DEFAULT_PREFIX) {
        this._prefix = prefix;
    }

    private write(type: LogType, message: LogMessage, ...args: any) {
        // Determine our console functon (info | warn | error)
        const c_func = CONSOLE_FUNCS[type];

        // Determine our prefix style (info | warn | error)
        const p_style = PREFIX_STYLES[type];
        let output = message;

        if (typeof message === "string") {
            const p = (this.prefix) ? p_style(this.prefix) + ' ' : '';
            output = `${p}${styleQuotes(message)}`;
        }

        if (this._spy && typeof this._spy === "function") {
            // Send output to 'spy' function...
            this._spy(util.format(message, ...args));

            // Just for fun...
            //console.log(`${p_style(this.prefix)} Caller is spying! 🥸`);
        }
        c_func(output, ...args);
    }

    /**
     * Writes a message to STDOUT. If a prefix is used, prefix is colored BLUE.
     * @param message The primary message sent to STDOUT.
     * @param args Optional substitution values (similar to printf()).
     */
    public info(message: LogMessage, ...args: any) {
        this.write(LogType.Info, message, ...args);
    }

    /**
     * Writes a message to STDERR. If a prefix is used, prefix is colored YELLOW.
     * @param message The primary message sent to STDERR.
     * @param args Optional substitution values (similar to printf()).
     */
    public warn(message: LogMessage, ...args: any) {
        this.write(LogType.Warning, message, ...args);
    }

    /**
     * Writes a message to STDERR. If a prefix is used, prefix is colored RED.
     * @param message The primary message sent to STDERR.
     * @param args Optional substitution values (similar to printf()).
     */
    public error(message: LogMessage, ...args: any) {
        this.write(LogType.Error, message, ...args);
    }

    /** Private reference to the prefix. */
    private _prefix: string;

    /** Gets the prefix that is prepended to each message sent to the console output. */
    public get prefix(): string {
        return this._prefix;
    }

    /** Sets the prefix that is prepended to each message sent to the console output. */
    public set prefix(v: string) {
        this._prefix = v;
    }

    private _spy: any;
}

/**
 * Factory function for the Logger class.
 * @param prefix The prefix for each message sent to the console.
 * @returns A new Logger instance.
 */
const logger = (prefix: string = DEFAULT_PREFIX) => {
    return new Logger(prefix);
};

export default logger;

