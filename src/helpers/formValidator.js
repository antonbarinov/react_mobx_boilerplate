import * as React from "react";

class FormValidator {
    component = {};

    constructor(component) {
        this.component = component;
    }

    getFields() {
        let result = {};
        const state = this.component.state;
        const inputRefs = this.component.inputRefs;

        for (let fieldName in state.validationFields) {
            result[fieldName] = inputRefs[fieldName].current.value;
        }

        return result;
    }

    validateField(fieldName, validationFunction) {
        let state = { ...this.component.state };
        const value = this.component.inputRefs[fieldName].current.value;
        const result = validationFunction(value);

        if (result === true || result === undefined) {
            state.validationFields[fieldName].msg = false;
        } else {
            state.validationFields[fieldName].msg = result;
        }

        this.component.setState(state);
    }

    validationFieldParams(fieldName) {
        return {
            msg: this.component.state.validationFields[fieldName].msg,
            setRef: this.component.inputRefs[fieldName],
        };
    }

    isFieldsValid() {
        let isValid = true;
        const state = this.component.state;
        for (let fieldName in state.validationFields) {
            if (state.validationFields[fieldName].msg) isValid = false;
        }

        return isValid;
    }

}

export default FormValidator;