export default interface IForm {
    method: string,
    data: string
}

/**
 *
 * @param evaluation
 * @private
 */
export function createIForm(evaluation: string): IForm {
    return {
        method: evaluation.split(':')[0].trim(),
        data: evaluation.split(':')[1].trim()
    }
}