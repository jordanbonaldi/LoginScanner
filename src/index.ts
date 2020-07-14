import * as puppeteer from 'puppeteer';
import InputsFetcher from "./Api/InputsFetcher";

export function getAllDevices() {
    return puppeteer.devices;
}

InputsFetcher(
    'https://www.expedia.co.uk/user/signin',
    getAllDevices()['Pixel 2 XL']
).then((evaluation: string[]) => console.log(evaluation));
