enum AnsiConsoleCodes {
    Bold = 1,
    Italic = 3,
    Underline = 4,
    Black = 30,
    Red = 31,
    Green = 32,
    Yellow = 33,    
    Blue = 34,
    Magenta = 35,
    Cyan = 36,
    White = 37
}

const style = (text: string, ...codes: AnsiConsoleCodes[]) => {
    return "\u001b[" + codes.join(';') + "m" + text + "\u001b[0m";
}

export { AnsiConsoleCodes, style }

/*
console.log(style('This is the style for info prefix.', Bold, Blue));
console.warn(warnPrefix('This is the style for warn prefix'));
console.error(errorPrefix('This is the style for error prefix'));

console.info(quoteSingle(`'This is the style of single quotes.'`));
console.info(quoteDouble(`"This is the style of double quotes."`));


const infoPrefix = (text: string) => {
    return style(text, Blue, Bold);
}

const warnPrefix = (text: string) => {
    return style(text, Yellow, Bold);
}

const errorPrefix = (text: string) => {
    return style(text, Red, Bold);
}

const quoteSingle = (text: string) => {
    return style(text, Magenta);
}

const quoteDouble = (text: string) => {
    return style(text, Green);
}

*/