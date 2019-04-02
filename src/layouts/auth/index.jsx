import * as React from 'react';

import styles from './styles.module.scss';


export default function Layout({ children, ...restParams }) {
    document.getElementById('preloader').classList.add('hidden');

    return (
        <span>
            <div className={ styles.wrap }>
                <div className={ styles.content_holder }>
                    <div>
                        { React.cloneElement(children, restParams) }
                    </div>
                </div>
            </div>
        </span>
    );
}