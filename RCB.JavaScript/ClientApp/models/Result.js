export default class Result {
    value;
    errors;

    get hasErrors() {
        return this.errors != null && Array.isArray(this.errors) && this.errors.length > 0;
    }

    constructor(value, ...errors) {
        this.value = value;
        this.errors = errors[0] == undefined || errors[0] == null ? [] : errors;
    }
}