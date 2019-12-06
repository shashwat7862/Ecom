const winstonFileRotator=require('winston-daily-rotate-file');

//Level:Info
const infoTransport = new(winstonFileRotator)({
  name: 'info-file',
  filename: 'logs/info/.log',
  level: 'info',
  datePattern: 'dd-MM-yyyy',
  prepend: true
});
//Level:Error
const errorTransport = new(winstonFileRotator)({
  name: 'error-file',
  filename: 'logs/error/.log',
  level: 'error',
  datePattern: 'dd-MM-yyyy',
  prepend: true
});
//Level:Warn
// const warnTransport = new(winstonFileRotator)({
//   name: 'warn-file',
//   filename: 'logs/warn/.log',
//   level: 'warn',
//   datePattern: 'dd-MM-yyyy',
//   prepend: true
// });
//console
const consoleTransport = new(winston.transports.Console)({
  handleExceptions: true,
  json: true
})

let transports = [consoleTransport];

if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging' ) {
  transports = [infoTransport, errorTransport];
}

var logger = new(winston.Logger)({
  transports: transports
});

winston.handleExceptions(new winston.transports.File({
  filename: 'logs/exception/exception.log'
}));

module.exports.logger = logger