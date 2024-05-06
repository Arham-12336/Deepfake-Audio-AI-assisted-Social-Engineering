export class Utils {
    removeExtraOperators = (response: string) => {
        const final_result = response.replace('%', '');
        return final_result
    }

    alertChecker = (DFresult: any, SEResult: any) => {
        let ratingMessage: string = '';
        if (DFresult === 'fake' && SEResult < 50) {
            ratingMessage = "Medium"
        }
        else if (DFresult === 'fake' && SEResult > 50) {
            ratingMessage = 'High'
        }
        else {
            ratingMessage = 'Low'
        }
        return ratingMessage
    }
}