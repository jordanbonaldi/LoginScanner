export default interface IForm {
    method: string,
    data: string
}

/**
 *
 * Parsing string to IForm format, allowing better object mapping over the project
 *
 * @param evaluation String to parse
 */
export function createIForm(evaluation: string): IForm {
    return {
        method: evaluation.split(':')[0].trim(),
        data: evaluation.split(':')[1].trim()
    }
}