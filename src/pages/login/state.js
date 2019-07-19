import { observable } from 'mobx';
import FormValidator from 'helpers/formValidator';
import userState from 'globalState/user';
import { smartRedirect } from 'helpers/redirect';


export default class State {
    @observable formFields = {
        login: FormValidator.createFormFieldObj(),
        password: FormValidator.createFormFieldObj(),
    };
    @observable serverError = '';

    // Validate form and submit
    validateAndSubmit = async () => {
        const fv = new FormValidator(this.formFields);
        const promises = [];

        // Validate login
        promises.push(
            fv.validateField(this.formFields.login, (val) => {
                if (val.length < 3) return `Login must contain not less than 3 symbols`;
                if (val === '111') return `This login not allowed`;
            }),
        );

        // Validate password
        promises.push(
            fv.validateField(this.formFields.password, (val) => {
                if (val.length < 3) return `Password must contain not less than 3 symbols`;
            }),
        );

        // Await for validations
        await Promise.all(promises);

        const isValid = fv.isFieldsValid();

        if (!isValid) return false;

        try {
            const data = fv.getFieldsData();
            let result = await userState.login(data);
            if (result) {
                // Success
                smartRedirect('/profile');
            }
        }
        catch (e) {
            const errorsParsed = fv.applyServerValidationErrors(e.response.data);
            if (!errorsParsed) this.serverError = fv.serverErrorMessage || e.message;
        }
    };

    handleValueChange = (e) => {
        const { name, value } = e.target;
        this.formFields[name].value = value;
    };
}