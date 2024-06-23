# Sudonyms.io Logger

A simple, lightweight console logger with basic formatting capabilities.

### Install the Package
``` 
npm install @sudonyms/logger
```

### Use the Logger

``` JavaScript
import logger from '@sudonyms/logger';

cont log = logger('[My App]');
log.info('This is a test message!');

log.warn('Notice the color of the prefix.');

log.error('Notice the color of the prefix.');

log.info('Notice the "color" of 'text' in quotes.);
```

<img src="[Screenshot-1.png](https://github.com/TylerDurham/logger/blob/main/Screenshot-1.png?raw=true)"/>

## F.A.Q.

### I have some messages with multiple apostrophe's, and they are messing up the output format.

Escape the apostrophe's with a backslash: ```Jack's``` becomes ```Jack\\'```s.