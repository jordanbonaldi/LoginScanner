import * as puppeteer from 'puppeteer';
import InputsFetcher from "./Fetcher/InputsFetcher";
import ILoginForm from "./Interfaces/ILoginForm";
import PasswordInjector from './Injector/PasswordInjector';
import UsernameInjector from './Injector/UsernameInjector';
import SubmitInjector from './Injector/SubmitInjector';
import Injector from './Injector/Injector';

export function getAllDevices() {
    return puppeteer.devices;
}
export {
    ILoginForm,
    InputsFetcher,
    PasswordInjector,
    UsernameInjector,
    SubmitInjector,
    Injector
}