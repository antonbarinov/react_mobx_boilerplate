import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Container from 'components/container';
import { currentRoute } from 'components/router';


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

    render() {
        const { routeParams } = currentRoute;
        const { page } = routeParams;

        return (
            <Container>
                <h1>Main page</h1>
                { page && <h3>Route param "page": { page }</h3> }
                <div>This time is { this.time.toISOString() }</div>
            </Container>
        );
    }
}
