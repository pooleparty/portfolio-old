import winston from 'winston';

// no logging for tests
winston.remove(winston.transports.Console);
