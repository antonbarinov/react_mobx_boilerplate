import { action, runInAction } from 'mobx';

export default class FormValidator {
    isFormValid = true;
    formFields = {};
    serverErrorMessage = '';

    constructor(formFields) {
        this.formFields = formFields;
    }

    static createFormFieldObj() {
        return {
            value: '',
            errorMessage: '',
        };
    }

    @action
    applyServerValidationErrors(e) {
        let response;

        try {
            response = e.response.data;
            if (response.errorType === undefined) return false;
        } catch (e) {
            return false;
        }

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
        // Text error from server
        else if (response.errorType === 'message') {
            this.serverErrorMessage = response.errors[0].message;
        }

        return result;
    }

    @action
    async validateField(fieldObject, validationFunction) {
        const { value } = fieldObject;
        const result = await validationFunction(value);

        runInAction(() => {
            if (result !== undefined) {
                fieldObject.errorMessage = result;
                this.isFormValid = false;
            } else {
                fieldObject.errorMessage = '';
            }
        });
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
