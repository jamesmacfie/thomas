import { createLogger as create, format, transports } from 'winston';
import chalk from 'chalk';

interface LoggerInitConfig {
  name: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
}

export const createLogger = ({ name, color }: LoggerInitConfig) => {
  const logger = create({
    level: 'info',
    format: format.combine(
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
      format.printf(info => {
        const prefix = `${(chalk[color] as any)(`${name} - `)}`;
        return `${prefix}${info.message}`;
      })
    ),

    transports: [new transports.Console()]
  });

  return logger;
};
