import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import FormInput from 'components/formItems/Input';
import FormButton from 'components/formItems/Button';
import FormServerErrors from 'components/formItems/ServerErrors';
import Container from 'components/Container';
import { Link } from 'lib/router';
import LoadingAnimationOverlay from 'components/LoadingAntimationOverlay';
import FormFieldWrapper from 'components/formItems/FormFieldWrapper';

import styles from './styles.module.scss';

import { useLocalState } from './state';


export default function LoginPage() {
    const state = useLocalState();
    const bluredContainer = useRef();

    useEffect(() => {
        document.title = 'Login Page | Boilerplate';
    }, []);

    return (
        <Container className={ styles.container }>
            { state.submitInProgress && <LoadingAnimationOverlay bluredContainerRef={ bluredContainer } /> }
            <div ref={ bluredContainer }>
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

LoginPage = observer(LoginPage);
