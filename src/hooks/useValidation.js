import { useState } from "react"
import { getAge } from "../utils/dateFunctions";

function useValidation(validList = []) {
    const [validationList, updateList] = useState(validList);
    const updateValidationState = (inputEl) => {
        let isValid = true;
        for (let index = 0; index < validationList.length; index++) {
            if (inputEl.type === "date") {
                let age = getAge(inputEl.value);
                if (age > validationList[index].range[0] && age < validationList[index].range[1]) {
                    validationList[index].valid = true;
                    inputEl.setCustomValidity('');
                }
                else {
                    validationList[index].valid = false;
                    inputEl.setCustomValidity(validationList[index].errorMessage);
                }

            } else if (inputEl.name == "confirmPassword") {
                validationList[index].valid = inputEl.checkValidity()
            }
            else {
                if (!validationList[index].regex.exec(inputEl.value)) {
                    inputEl.setCustomValidity(validationList[index].errorMessage);
                    isValid = false;
                    validationList[index].valid = false;
                } else {
                    validationList[index].valid = true;
                }
            }
        }
        updateList([...validationList]);
        if (isValid)
            inputEl.setCustomValidity('');

    }
    return [validationList, updateValidationState]
}

export default useValidation