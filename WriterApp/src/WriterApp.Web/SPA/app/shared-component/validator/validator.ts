import { ValidationPropertyModel } from './../../model/validator-property.model';
import { FormControl } from '@angular/forms';

export class Validator {
    formValid: boolean;
    submitted: boolean = false;

    submit(): void {
        this.submitted = true;
    }

    protected _validate(validationProperty, control, modelProperty) {
        this._setValid(validationProperty);
        return (control && control.touched) || this.submitted || this._isNotEmptyOrWhitespace(modelProperty);
    }

    protected _getValue(control, modelProperty) {
        return control && control.value ? control.value : modelProperty;
    }

    protected _setValid(obj: ValidationPropertyModel): ValidationPropertyModel {
        obj.isValid = true;
        obj.message = '';
        return obj;
    }

    protected _isNotEmptyOrWhitespace(value): boolean {
        if (typeof value === 'undefined') {
            return false;
        }

        if (typeof value === 'string') {
            value = value.trim();
            return !!value && value.length > 0;
        }

        if (typeof value === 'number') {
            return !isNaN(value);
        }

        return !!value;
    }

    protected _isMinLengthValid(value: string, min: number = 6): boolean {
        if (typeof value === 'string') {
            value = value.trim();
            return !!value && value.length >= min;
        }

        return false;
    }

    protected _isPhoneNumber(phone): boolean {
        const phoneRegExp = /([0-9])\w/;
        return phoneRegExp.test(phone);
    }
    protected _isEmailValid(email): boolean {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegExp.test(email);
    }
}
