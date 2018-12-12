export function getFields(state) {
    let result = {};

    for (let fieldName in state.validationFields) {
        result[fieldName] = state.validationFields[fieldName].ref.current.value;
    }

    return result;
}

export function validateField(state, fieldName, validationFunction) {
    const value = state.validationFields[fieldName].ref.current.value;
    const result = validationFunction(value);
    if (result === true || result === undefined) {
        state.validationFields[fieldName].msg = false;
    } else {
        state.validationFields[fieldName].msg = result;
    }
}

export function validationFieldParams(state, fieldName) {
    return {
        msg: state.validationFields[fieldName].msg,
        setRef: state.validationFields[fieldName].ref,
    };
}

export function isFieldsValid(state) {
    let isValid = true;
    for (let fieldName in state.validationFields) {
        if (state.validationFields[fieldName].msg) isValid = false;
    }

    return isValid;
}