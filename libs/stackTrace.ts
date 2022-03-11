import { get } from "stack-trace";
import chalk from "chalk";
import { ifDev } from "./ifDev";
export function printStackTrace(message: string) {
  console.log(chalk.green.bold(getError(message)));
}
export function printErrorStackTrace(message: string) {
  console.log(chalk.red(getError(message)));
}
export function printDevStackTrace(message: string) {
  ifDev && console.log(chalk.green.bold(getError(message)));
}
export function printDevErrorStackTrace(message: string) {
  ifDev && console.log(chalk.red(getError(message)));
}
function getError(message: string) {
  const trace = get();
  return `${message} at function ${trace[2].getFunctionName()}()`;
}
