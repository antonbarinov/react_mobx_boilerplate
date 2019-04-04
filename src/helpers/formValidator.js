export default class FormValidator {
    isFormValid = true;
    formFields = {};

    constructor(formFields) {
        this.formFields = formFields;
    }

    static createFormFieldObj() {
        return {
            value: '',
            errorMessage: '',
        };
    }

    applyServerValidationErrors(response) {
        let result = false;
        // Validation errors
        if (response.errorType === 'validation') {
            if (Array.isArray(response.errors)) {
                for (const { field, message } of response.errors) {
                    if (this.formFields[field]) {
                        this.formFields[field].errorMessage = message;
                    }
                }

                result = true;
            }
        }

        return result;
    }

    async validateField(fieldObject = {}, validationFunction) {
        const { value } = fieldObject;
        const result = await validationFunction(value);
        if (result !== undefined) {
            fieldObject.errorMessage = result;
            this.isFormValid = false;
        }
    }

    isFieldsValid() {
        return this.isFormValid;
    }

    getFieldsData() {
        let result = {};

        for (let fieldName in this.formFields) {
            if (this.formFields.hasOwnProperty(fieldName)) {
                result[fieldName] = this.formFields[fieldName].value;
            }
        }

        return result;
    }
}