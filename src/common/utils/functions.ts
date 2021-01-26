import { lstatSync, readdirSync } from "fs";
import { join } from "path";

export const isDirectory = (source: string): boolean =>
  lstatSync(source).isDirectory();

export const getDirectories = (source: string): string[] =>
  readdirSync(source).filter(
    (name): boolean => isDirectory(join(source, name))
  );
