import Injector from "./Injector";

export default class PasswordInjector implements Injector {

    injection(): string {
        let element: HTMLInputElement | null = document.querySelector('input[type="password"]');

        return (element ==  null || (!element.id || !element.name)) ? "None" :
            `${element.id ? 'ID' : 'Name'}: ${element.id || element.name}`;
    }

}
