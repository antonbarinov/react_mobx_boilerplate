import * as React from 'react';
import Container from 'components/Container';

import styles from './styles.module.scss';


export default function NotFoundPage() {
    return (
        <Container>
            <h1 className={ styles.h1 }>OOOPS Page not found</h1>
        </Container>
    );
}
