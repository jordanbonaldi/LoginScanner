import {Device} from "puppeteer/DeviceDescriptors";
import {Browser, launch, Page} from 'puppeteer';
import PasswordInjector from "../Injector/PasswordInjector";
import Injector from "../Injector/Injector";
import UsernameInjector from "../Injector/UsernameInjector";

class InputsFetcherClass {

    /**
     *
     * @param url
     * @param device
     * @param injectors
     */
    constructor(
        private url: string,
        private device: Device,
        private injectors: Injector[] = [
            new PasswordInjector(),
            new UsernameInjector(),
        ]
        // Todo: Login Type
    ) {}

    load(): Promise<string[]> {
        return launch({headless: false})
            .then((browser: Browser) => browser.newPage()
                .then((page: Page) =>
                    page.emulate(this.device)
                        .then(() =>
                            page.goto(this.url, {waitUntil: 'networkidle0'})
                                .then(() => page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'}))
                                .then(() => this.javascriptInjection(page))
                        )
                )
            )
    }

    /**
     *
     * @param page
     */
    private javascriptInjection(page: Page): Promise<string[]> {
        return Promise.all(this.injectors.map((injector: Injector) =>
            page.evaluate(injector.injection,
                injector.dictionary === undefined ? [] : injector.dictionary,
                injector.exclude === undefined ? [] : injector.exclude,
                injector.elementsToCheck === undefined ? [] : injector.elementsToCheck
            )
        ));
    }
}

/**
 *
 * @param url
 * @param device
 * @constructor
 */
export default function InputsFetcher(url: string, device: Device): Promise<string[]> {
    return new InputsFetcherClass(url, device).load();
}
