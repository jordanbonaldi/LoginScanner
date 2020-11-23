import {Device} from "puppeteer/DeviceDescriptors";
import {Browser, launch, Page} from 'puppeteer';
import PasswordInjector from "../Injector/PasswordInjector";
import Injector from "../Injector/Injector";
import UsernameInjector from "../Injector/UsernameInjector";
import SubmitInjector from "../Injector/SubmitInjector";
import ILoginForm from "../Interfaces/ILoginForm";
import { createIForm } from "../Interfaces/IForm";

class InputsFetcherClass {

    /**
     *
     * InputsFetcher Constructor, method empty as properties are defined dynamically
     *
     * @param url Login URL
     * @param device Device
     * @param injectors All injector that will scrap the URL
     */
    constructor(
        private url: string,
        private device: Device,
        private injectors: Injector[] = [
            new PasswordInjector(),
            new UsernameInjector(),
            new SubmitInjector()
        ]
    ) {}

    /*
     * Puppeteer declarations
     *
     * Property headless means showing or not the webpage (true for no, false for yes)
     */
    load(): Promise<ILoginForm> {
        return launch({headless: true})
            .then((browser: Browser) => browser.newPage()
                .then((page: Page) =>
                    page.emulate(this.device)
                        .then(() =>
                            page.goto(this.url, {waitUntil: 'networkidle0'}) // Program's wait that everything is loaded before executing the next instructions
                                .then(() =>
                                    this.javascriptInjection(page).then((loginForm: ILoginForm) =>
                                        browser.close().then(() => loginForm) // Not closing the browser can creates memory leaks
                                    )
                                )
                        )
                )
            )
    }

    /**
     *
     * @param page Puppeteer Page object
     */
    private javascriptInjection(page: Page): Promise<ILoginForm> {
        // Iterating over all our injectors and injecting their dictionary if found.
        return Promise.all(this.injectors.map((injector: Injector) =>
            page.evaluate(injector.injection,
                injector.dictionary === undefined ? [] : injector.dictionary,
                injector.exclude === undefined ? [] : injector.exclude,
                injector.elementsToCheck === undefined ? [] : injector.elementsToCheck
            )
        )).then((evaluation: string[]) => Promise.resolve({
            username: createIForm(evaluation[1]),
            password: createIForm(evaluation[0]),
            submit: createIForm(evaluation[2])
        }));
    }
}

/**
 *
 * Dynamic Class definition
 *
 * @param url
 * @param device
 * @constructor
 */
export default function InputsFetcher(url: string, device: Device): Promise<ILoginForm> {
    return new InputsFetcherClass(url, device).load();
}
