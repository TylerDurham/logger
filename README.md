# Sudonyms.io Logger
After constantly scaffolding (.e., re-writing) basic console logging for every **NodeJS** project (specifically, unit tests), I finally got a around to putting it into an **NPM** package. It's nothing more than a simple, lightweight console logger with with basic formatting capabilities. If you need advanced logging features, look elsewhere.

It's here in NPM for my convenience, but feel free to grab if you need a **quick 'n easy** console logger that has the following features:

* TypeScript support.
* Small footprint.
* Looks good in **Jest** output.
* API similar to the **NodeJS Console API**.
* A package without any dependancies.
* Basic formatting for your console messages.

### Install the Package

``` 
npm install @sudonyms/logger
```

### Use the Logger

``` TypeScript
import logger from '@sudonyms/logger';

// Pass a prefix for your messages. Leave blank if not desired.
const log = logger('[My App]'); 

log.info('This is a test message!');
log.warn('Notice the color of the prefix when I warn().');
log.error('Notice the color of the prefix when I error().');
log.info(`Notice the "color" of "text" in quotes.`);
```

 Run your program, and the output should look like the following:
![Screenshot-1.png](https://raw.githubusercontent.com/TylerDurham/logger/main/Screenshot_1.png)

# Known Issues

* Quote formatting only supports double quotes ("). I am tinkering with adding single quotes (') and perhaps another color.
* No way to override my color preferences.