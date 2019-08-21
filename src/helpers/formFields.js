// Need to bind component "this"
export function formFieldsUniversalHandleChange(e) {
    const { field } = this.props;
    if (field) {
        field.value = e.target.value;
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
