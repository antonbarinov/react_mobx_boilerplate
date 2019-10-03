// Need to bind component "this"
import { runInAction } from 'mobx';

export function formFieldsUniversalHandleChange(e) {
    const { field } = this.props;
    if (field) {
        runInAction(() => {
            field.value = e.target.value;
        });
    }
}

export function formFieldsUniversalValueParams(props) {
    const { field } = props;
    const result = {};
    if (field) {
        result.value = field.value;
    }

    return result;
}
