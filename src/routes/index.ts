import express from 'express'
import { getDirectories, isDirectory } from '../common/utils/functions'
import { resolve } from "path";
import { readdirSync } from "fs";


const env = process.env.NODE_ENV || "development";
const prefix = env == "development" ? "" : "build/";

const modules: any[] = getDirectories(resolve(`${prefix}src/modules`));


const routeArray: any[] = []
const routes = () => {
	modules.forEach(
		(module): void => {
			const dir = `${prefix}src/modules/${module}`;
			readdirSync(resolve(dir)).forEach(
				(filename): void => {
					if (/.*.router/.test(filename)) {
						const path = `/modules/${module}/${filename}`
						const router = require(`.${path}`)
						routeArray.push(__dirname + path)
						express().use(`/api/${module}`, router)
					}
				}
			);
		})
}
module.exports = routes;
