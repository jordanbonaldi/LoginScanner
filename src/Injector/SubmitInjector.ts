import Injector from "./Injector";
import { readFileSync } from 'fs';
import path = require("path");

export default class SubmitInjector implements Injector {

    elementsToCheck: string[] = [
        'type', 'name', 'id', 'value', 'innerText'
    ]

    exclude: string[] = [
        'signup', 'gss', 'checkbox', 'password'
    ]

    dictionary: string[];

    constructor() {
        let content: string = readFileSync(path.join(__dirname, "../data/inputButtonDictionary")).toString();

        this.dictionary = content.split('\n');
    }

    /**
     *
     * @param dictionary
     * @param exclude
     * @param elementsToCheck
     */
    injection(dictionary ?: string[], exclude ?: string[], elementsToCheck ?: string[]): string
    {
        if (
            (elementsToCheck == undefined || !Array.isArray(elementsToCheck)) ||
            (dictionary === undefined || !Array.isArray(dictionary)) ||
            (exclude === undefined || !Array.isArray(exclude))
        ) return 'none';

        let dictionaryContains = (containedWord: string, type: any) =>
            type.filter((word: string) => (word != '' && containedWord != '') && (word.includes(containedWord) || containedWord.includes(word)))[0] != null;

        let isElementContainsExcludedWords = (element: any) => {
            return elementsToCheck.filter((el: string) =>
                dictionaryContains(element[el].trim(), exclude)
            )[0] != null;
        }

        let allTypeSubmit: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[type=submit]');

        if (allTypeSubmit.length === 1)
            return 'querySelector: button[type=submit]'; // Only if we have one button that submit php code on the form

        let foundElement: HTMLButtonElement | null = Array.from(document.querySelectorAll('button')).filter((element: any) =>
            elementsToCheck.filter((el: string) => {
                if (element[el] === '') return false;

                let a = dictionaryContains(element[el].trim(), dictionary);

                return a ? !isElementContainsExcludedWords(element) : a;
            })[0] != null
        )[0];

        // Trying to retrieve Name and ID of the button
        return foundElement == undefined ? "None" : `${foundElement.id !== '' ? 'getElementById' : 'getElementsByName'}: ${foundElement.id !== '' ? foundElement.id : foundElement.name}`;
    }

}
