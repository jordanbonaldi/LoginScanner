import Injector from "./Injector";
import { readFileSync } from 'fs';
import path = require("path");

export default class UsernameInjector implements Injector {

    elementsToCheck: string[] = [
        'type', 'name', 'id'
    ]

    dictionary: string[];

    exclude: string[] = [
        'signup', 'gss', 'checkbox', 'password'
    ]

    constructor() {
        let content: string = readFileSync(path.join(__dirname, "../data/inputUsernameDictionary")).toString();

        this.dictionary = content.split('\n');
    }

    /**
     *
     * @param dictionary
     * @param exclude
     * @param elementsToCheck
     */
    injection(dictionary ?: string[], exclude ?: string[], elementsToCheck ?: string[]): string {
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

        let foundElement: HTMLInputElement | null = Array.from(document.querySelectorAll('input')).filter((element: any) =>
            elementsToCheck.filter((el: string) => {
                if (element[el] === '') return false;

                let a = dictionaryContains(element[el].trim(), dictionary);

                return a ? !isElementContainsExcludedWords(element) : a;
            })[0] != null
        )[0];

        //Todo: return matched input
        return foundElement == undefined ? "None" : `${foundElement.id !== '' ? 'getElementById' : 'getElementsByName'}: ${foundElement.id !== '' ? foundElement.id : foundElement.name}`;
    }

}
