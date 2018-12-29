import { PathLike, MakeDirectoryOptions, WriteFileOptions } from 'fs';

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

export interface IMkDir {
  path: PathLike;
  options?: number | string | MakeDirectoryOptions;
}

export interface IWriteFile {
  path: PathLike | number;
  data: any;
  options?: WriteFileOptions;
}
