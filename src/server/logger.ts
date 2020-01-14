import { createLogger as create, format, transports } from "winston";
import chalk from "chalk";

// TODO - how to get this to come from chalk instead of being hard coded?
type Color = "red" | "blue" | "green" | "yellow" | "magenta";

const errorStackTracerFormat = format((info: any) => {
  if (info.meta && info.meta instanceof Error) {
    info.message = `${info.message} ${info.meta.stack}`;
  }
  return info;
});

export const createLogger = (color: Color) => {
  const logger = create({
    level: "info",
    format: format.combine(
      format.splat(),
      format.json(),
      errorStackTracerFormat(),
      format.printf(info => {
        return (chalk[color] as any)(info.message);
      })
    ),

    transports: [new transports.Console()]
  });

  return logger;
};

const logger = createLogger("magenta");
export default logger;
