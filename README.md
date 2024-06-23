# Sudonyms.io Logger

A simple, lightweight console logger with basic formatting capabilities.

* You need TypeScript support.
* You want some basic formatting for your console messages.

### Install the Package

``` 
npm install @sudonyms/logger
```

### Use the Logger

``` TypeScript
import logger from '@sudonyms/logger';

const log = logger('[My App]');

log.info('This is a test message!');
log.warn('Notice the color of the prefix when I warn().');
log.error('Notice the color of the prefix when I error().');
log.info(`Notice the "color" of 'text' in quotes.`);
```

 Run your program, and the output should look like the following:
![Screenshot-1.png](https://raw.githubusercontent.com/TylerDurham/logger/main/Screenshot-1.png)
