import { readdirSync, lstatSync } from "fs";
import { join as pathJoin } from "path";
import chalk from "chalk";
import boxen from "boxen"; // tilt.jpg

export function getDirectories(srcpath: string) {
  return readdirSync(srcpath).filter(file =>
    lstatSync(pathJoin(srcpath, file)).isDirectory()
  );
}

export function displayServer(port: number) {
  if (process.env.NODE_ENV !== "development") return;

  const localURL = `http://localhost:${port}`;

  let message = chalk.green("🚀 Server ready!");
  message += "\n\n";
  message += `• ${localURL}`;

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderColor: "green"
    })
  );
}
