import { observable } from 'mobx';
import FormValidator from 'helpers/formValidator';
import userState from 'globalState/user';
import { smartRedirect } from 'helpers/redirect';
import { withOnlyOneInTime } from 'helpers/asyncHelpers';


export default class LoginPageState {
    @observable formFields = {
        login: FormValidator.createFormFieldObj(),
        password: FormValidator.createFormFieldObj(),
    };
    @observable serverError = '';
    @observable submitInProgress = false;

    // Validate form and submit
    validateAndSubmit = async () => {
        withOnlyOneInTime(this, 'validateAndSubmit', async () => {
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
                this.submitInProgress = true;
                const data = fv.getFieldsData();
                let result = await userState.login(data);
                if (result) {
                    // Success
                    smartRedirect('/profile');
                }
            }
            catch (e) {
                const errorsParsed = fv.applyServerValidationErrors(e);
                if (!errorsParsed) this.serverError = fv.serverErrorMessage || e.message;
            } finally {
                this.submitInProgress = false;
            }
        });
    };

    handleValueChange = (e) => {
        const { name, value } = e.target;
        this.formFields[name].value = value;
    };
}
