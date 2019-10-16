import { createLogger, stdSerializers } from 'browser-bunyan';
import { ConsoleFormattedStream } from '@browser-bunyan/console-formatted-stream';

const log = createLogger({
  name: 'thomas',
  streams: [
    {
      level: 'error',
      stream: new ConsoleFormattedStream()
    }
  ],
  serializers: stdSerializers,
  src: false
});

export default log;
