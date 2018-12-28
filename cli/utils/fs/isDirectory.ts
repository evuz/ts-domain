import * as fs from 'fs';

export function isDirectory({ filePath }): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.isDirectory());
    });
  });
}
