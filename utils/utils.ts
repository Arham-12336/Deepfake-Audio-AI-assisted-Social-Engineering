export class Utils {
    removeExtraOperators = (response: string) => {
        const final_result = response.replace('%', '');
        return final_result
    }

    alertChecker = (DFresult: String, SEResult: any) => {
        console.log("DF result inside Utils: ", DFresult, SEResult)
        let ratingMessage: string = '';
        if (DFresult === 'Fake' && SEResult < 50) {
            ratingMessage = "Medium"
        }
        else if (DFresult === 'Fake' && SEResult > 50) {
            ratingMessage = 'High'
        }
        else {
            ratingMessage = 'Low'
        }
        return ratingMessage
    }
}