import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import FormInput from 'components/formItems/Input';
import FormButton from 'components/formItems/Button';
import FormServerErrors from 'components/formItems/ServerErrors';
import { Link } from 'lib/router';
import Container from 'components/Container';
import LoadingAnimationOverlay from 'components/LoadingAntimationOverlay';
import FormFieldWrapper from 'components/formItems/FormFieldWrapper';

import styles from './styles.module.scss';

import State from './state';

const localState = new State();

export default function SignUpPage() {
    const [ state ] = useState(localState);
    const bluredContainer = useRef();

    useEffect(() => {
        document.title = 'Signup Page | Boilerplate';
    }, []);

    return (
        <Container className={ styles.container }>
            { state.submitInProgress && <LoadingAnimationOverlay bluredContainerRef={ bluredContainer } /> }
            <div ref={ bluredContainer }>
                <h1>Sign up</h1>
                <div>
                    <FormFieldWrapper field={ state.formFields.full_name }>
                        <FormInput
                            placeholder="Full name"
                            field={ state.formFields.full_name }
                        />
                    </FormFieldWrapper>
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
                    <FormButton onClick={ state.validateAndSubmit } loading={ state.submitInProgress && 'Signing up...' }>Sign up</FormButton>
                    <div className={ styles.underBtnText }>
                        Already have account? <Link to="/login">Login</Link> instead
                    </div>
                </div>
            </div>
        </Container>
    );
}

SignUpPage = observer(SignUpPage);
