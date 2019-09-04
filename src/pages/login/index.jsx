import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import FormInput from 'components/formItems/Input';
import FormButton from 'components/formItems/Button';
import FormServerErrors from 'components/formItems/ServerErrors';
import Container from 'components/Container';
import { Link } from 'lib/router';
import LoadingAnimationOverlay from 'components/LoadingAntimationOverlay';
import FormFieldWrapper from 'components/formItems/FormFieldWrapper';

import styles from './styles.module.scss';

import State from './state';

const localState = new State();


@observer
export default class LoginPage extends BaseComponent {
    state = localState;
    bluredContainer = React.createRef();

    constructor(props) {
        super(props);

        document.title = 'Login Page | Boilerplate';
    }

    render() {
        const state = this.state;

        return (
            <Container className={ styles.container }>
                { state.submitInProgress && <LoadingAnimationOverlay bluredContainerRef={ this.bluredContainer } /> }
                <div ref={ this.bluredContainer }>
                    <h1>Login</h1>
                    <div>
                        <FormFieldWrapper field={ state.formFields.login }>
                            <FormInput
                                placeholder="Login"
                                field={ state.formFields.login }
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper field={ state.formFields.password }>
                            <FormInput
                                placeholder="Password"
                                type="password"
                                field={ state.formFields.password }
                            />
                        </FormFieldWrapper>
                        <FormServerErrors msg={ state.serverError } />
                        <FormButton onClick={ state.validateAndSubmit } loading={ state.submitInProgress && 'Logging in...' }>Login</FormButton>
                        <div className={ styles.underBtnText }>
                            Doesn't have account? <Link to="/signup">Sing up</Link> instead
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
