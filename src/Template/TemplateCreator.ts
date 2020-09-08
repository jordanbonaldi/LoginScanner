import * as fs from 'fs';
import {getAllDevices, InputsFetcher} from "../index";
import { Device } from 'puppeteer/DeviceDescriptors';
import ILoginForm from "../Interfaces/ILoginForm";
import IForm from "../Interfaces/IForm";


export class TemplateCreatorClass
{
    /**
     *
     * @param serviceName
     * @param url
     * @param finalUrl
     * @param device
     */
    constructor(
        private serviceName: string,
        private url: string,
        private finalUrl: string,
        private device: Device = getAllDevices()['Pixel 2 XL']
    ) {}

    public load(): Promise<void> {
        let data: string = fs.readFileSync(`${process.env.PWD}/data/XService.java`, 'utf8');
        data = TemplateCreatorClass.replaceAll(data, '%sv%', this.serviceName);
        data = TemplateCreatorClass.replaceAll(data, '%url%', this.url);
        data = TemplateCreatorClass.replaceAll(data, '%final_url%', this.finalUrl);

        return this.inputsFetching(data).then((_data: string) =>
            fs.writeFileSync(`${this.serviceName}Service.java`, _data)
        );
    }

    /**
     *
     * @param data
     * @private
     */
    private inputsFetching(data: string) {
        return InputsFetcher(this.url, this.device).then((login: ILoginForm) => {
            Object.keys(login).forEach((object: string) => {
                let foundObj: IForm = login[object as 'username' | 'password' | 'submit'];
                console.log('Found IForm:', foundObj);
                data = TemplateCreatorClass.replaceAll(data, `%query${object}%`, foundObj.method)
                data = TemplateCreatorClass.replaceAll(data, `%${object}%`, foundObj.data)
            })
        }).then(() => data);
    }

    /**
     * Replace All doesn't work
     */
    private static replaceAll(data: string, regex: string, replacement: string): string {
        return data.split(regex).join(replacement)
    }
}

/**
 *
 * @param serviceName
 * @param url
 * @param finalUrl
 * @constructor
 */
export default function TemplateCreator(serviceName: string, url: string, finalUrl: string): Promise<void> {
    return new TemplateCreatorClass(serviceName, url, finalUrl).load();
}