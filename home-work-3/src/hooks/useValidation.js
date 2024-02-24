import { useState } from "react"

function useValidation(validList) {
    const [validationList, updateList] = useState(validList);
    const updateValidationState = (inputEl) => {
        let isValid = true;
        for (let index = 0; index < validationList.length; index++) {
            if (!validationList[index].regex.test(inputEl.value)) {
                inputEl.setCustomValidity(validationList[index].errorMessage);
                isValid = false;
                validationList[index].valid = false;
            } else {
                validationList[index].valid = true;
            }
        }
        updateList([...validationList]);
        if (isValid)
            inputEl.setCustomValidity('');

    }
    return [validationList, updateValidationState]
}

export default useValidation