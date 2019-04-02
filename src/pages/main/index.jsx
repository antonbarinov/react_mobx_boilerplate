import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Container from 'components/container';


@observer
export default class MainPage extends React.Component {
    @observable time = new Date();
    updateInterval = null;

    constructor(props) {
        super(props);

        document.title = 'Main Page | Boilerplate';

        this.updateInterval = setInterval(() => {
            this.time = new Date();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render () {
        return (
            <Container>
                <h1>Main page</h1>
                <div>This time is {this.time.toISOString()}</div>
            </Container>
        )
    }
}