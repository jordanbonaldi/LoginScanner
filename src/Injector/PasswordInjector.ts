import Injector from "./Injector";

export default class PasswordInjector implements Injector {

    /**
     * As all known services hide their fields password with the only existing type 'password'
     * The injector will scrap the inputs and find the one using a "type=password"
     * Once the HTMLInputElement is resolved we create a query to return
     * This query will be used in the template as string replacement
     */
    injection(): string {
        let element: HTMLInputElement | null = document.querySelector('input[type="password"]');

        return (element == null || (element.id == undefined || element.name == undefined)) ? "None" :
            `${element.id !== '' ? 'getElementById' : 'getElementsByName'}: ${element.id !== '' ? element.id : element.name}`;
    }

}
