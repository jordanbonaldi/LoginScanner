import * as puppeteer from 'puppeteer';
import TemplateCreator from "./Template/TemplateCreator";

export function getAllDevices() {
    return puppeteer.devices;
}

TemplateCreator(process.argv[2], process.argv[3], process.argv[4]).then(() => console.log("File created on the root folder"));