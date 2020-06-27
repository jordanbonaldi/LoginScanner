import * as puppeteer from 'puppeteer';
import {Browser, Page} from "puppeteer";
import {Device} from "puppeteer/DeviceDescriptors";

/**
 *
 * @param website
 * @param device
 */
export default function load(website: string, device: Device) {
    return puppeteer.launch({headless: false})
        .then((browser: Browser) =>
            browser.newPage().then((page: Page) =>
                page.emulate(device).then(() => page.goto(website))
            )
        );
}

export function getAllDevices() {
    return puppeteer.devices;
}

load('https://www.expedia.co.uk/user/signin', puppeteer.devices['Pixel 2 XL']);
