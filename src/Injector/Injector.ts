/**
 * Injector interface
 */
export default interface Injector {

    elementsToCheck ?: string[];

    dictionary ?: string[];

    exclude ?: string[];

    /**
     *
     * @param dictionary
     * @param exclude
     * @param elementsToCheck
     */
    injection(dictionary ?: string[], exclude ?: string[], elementsToCheck ?: string[]): string;
}
