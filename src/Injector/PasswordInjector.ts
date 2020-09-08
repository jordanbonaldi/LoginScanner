import Injector from "./Injector";

export default class PasswordInjector implements Injector {

    injection(): string {
        let element: HTMLInputElement | null = document.querySelector('input[type="password"]');

        return (element == null || (element.id == undefined || element.name == undefined)) ? "None" :
            `${element.id !== '' ? 'getElementById' : 'getElementsByName'}: ${element.id !== '' ? element.id : element.name}`;
    }

}
