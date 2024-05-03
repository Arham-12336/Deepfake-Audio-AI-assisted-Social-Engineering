export class Utils {
    removeExtraOperators = (response: string) => {
        const final_result = response.replace('%', '');
        return final_result
    }
}