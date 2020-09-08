import {Device} from "puppeteer/DeviceDescriptors";
import {Browser, launch, Page} from 'puppeteer';
import PasswordInjector from "../Injector/PasswordInjector";
import Injector from "../Injector/Injector";
import UsernameInjector from "../Injector/UsernameInjector";
import SubmitInjector from "../Injector/SubmitInjector";
import ILoginForm from "../Interfaces/ILoginForm";
import IForm, { createIForm } from "../Interfaces/IForm";

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
            new SubmitInjector()
        ]
        // Todo: Login Type
    ) {}

    load(): Promise<ILoginForm> {
        return launch({headless: true})
            .then((browser: Browser) => browser.newPage()
                .then((page: Page) =>
                    page.emulate(this.device)
                        .then(() =>
                            page.goto(this.url, {waitUntil: 'networkidle0'})
                                .then(() =>
                                    this.javascriptInjection(page).then((loginForm: ILoginForm) =>
                                        browser.close().then(() => loginForm)
                                    )
                                )
                        )
                )
            )
    }

    /**
     *
     * @param page
     */
    private javascriptInjection(page: Page): Promise<ILoginForm> {
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
 * @param url
 * @param device
 * @constructor
 */
export default function InputsFetcher(url: string, device: Device): Promise<ILoginForm> {
    return new InputsFetcherClass(url, device).load();
}
