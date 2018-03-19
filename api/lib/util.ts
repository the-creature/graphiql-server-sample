import { readdirSync, lstatSync } from 'fs';
import { join as pathJoin } from 'path';
import * as chalk from 'chalk';
const boxen = require('boxen'); // tilt.jpg

export function getDirectories(srcpath: string) {
  return readdirSync(srcpath).filter(file =>
    lstatSync(pathJoin(srcpath, file)).isDirectory()
  );
}

export function displayServer(server: any) {
  if (process.env.NODE_ENV !== 'development') return;

  const details = server.address();
  const localURL = `http://localhost:${details.port}`;

  let message = chalk.green('Express is running!');
  message += '\n\n';
  message += `• ${localURL}`;

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderColor: 'green',
    })
  );
}
