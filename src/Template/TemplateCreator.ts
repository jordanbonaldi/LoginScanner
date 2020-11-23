import * as fs from 'fs';
import { Device } from 'puppeteer/DeviceDescriptors';
import ILoginForm from "../Interfaces/ILoginForm";
import IForm from "../Interfaces/IForm";
import { getAllDevices } from '..';
import InputsFetcher from '../Fetcher/InputsFetcher';

export class TemplateCreatorClass
{
    /**
     *
     * Constructor declaration, method is empty as "private" creates the property dynamically
     * Do not touch this declarations
     *
     * @param serviceName Name of the service used for file created at the end of the process
     * @param url Login url of the service
     * @param finalUrl Final URL once login is complete
     * @param device Device emulation for the extraction (for some services, html code changes for a device to another)
     */
    constructor(
        private serviceName: string,
        private url: string,
        private finalUrl: string,
        // If no device specified by default Pixel 2 XL is selected
        private device: Device = getAllDevices()['Pixel 2 XL']
    ) {}

    /**
     * Creator template loading
     *
     * The Java Template is read and some data are replaced with class attributes
     * Other data are found and replaced using the InputsFetchers
     */
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
     */
    private inputsFetching(data: string) {
        return InputsFetcher(this.url, this.device).then((login: ILoginForm) => {
            Object.keys(login).forEach((object: string) => {
                let foundObj: IForm = login[object as 'username' | 'password' | 'submit'];

                console.log('Found IForm:', foundObj);

                // Replacing the left values in the template
                data = TemplateCreatorClass.replaceAll(data, `%query${object}%`, foundObj.method)
                data = TemplateCreatorClass.replaceAll(data, `%${object}%`, foundObj.data)
            })
        }).then(() => data);
    }

    /**
     * Replace All doesn't work with typescript, so we recreated it
     */
    private static replaceAll(data: string, regex: string, replacement: string): string {
        return data.split(regex).join(replacement)
    }
}

/**
 *
 * Dynamic declaration of the class
 *
 * @param serviceName
 * @param url
 * @param finalUrl
 * @constructor
 */
export default function TemplateCreator(serviceName: string, url: string, finalUrl: string): Promise<void> {
    return new TemplateCreatorClass(serviceName, url, finalUrl).load();
}