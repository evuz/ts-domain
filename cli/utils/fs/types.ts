import { PathLike } from 'fs';

export interface IReadDir {
  path: PathLike;
  options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding;
}

export interface IReadFile {
  path: PathLike;
  options?: { encoding: string; flag?: string } | string;
}

export interface IExist {
  path: PathLike;
}

export interface IIsDirectory {
  filePath: PathLike;
}
