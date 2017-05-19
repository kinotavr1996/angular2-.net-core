import { WriterEditModel } from './../../model/writer-edit.model';
import { Validator } from './../../shared-component/validator/validator';
import { ValidationPropertyModel } from './../../model/validator-property.model';
export class WriterValidatior extends Validator {
    dateOfBirth: ValidationPropertyModel;
    firstName: ValidationPropertyModel;
    lastName: ValidationPropertyModel;

    constructor(public model: WriterEditModel) {
        super();
        this.dateOfBirth = new ValidationPropertyModel();
        this.firstName = new ValidationPropertyModel();
        this.lastName = new ValidationPropertyModel();
    }

    isDateOfBirthValid(control, modelProperty?): ValidationPropertyModel {
        this._setValid(this.dateOfBirth);
        const value = this._getValue(control, modelProperty);
        if (this._validate(this.dateOfBirth, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.dateOfBirth.isValid = false;
                this.dateOfBirth.message = 'Input normal date';
            }
        }
        return this.dateOfBirth;
    }

    isFirstnameValid(control, modelProperty?): ValidationPropertyModel {
        this._setValid(this.firstName);
        const value = this._getValue(control, modelProperty);
        if (this._validate(this.firstName, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.firstName.isValid = false;
                this.firstName.message = 'First name must be not empty';
            }
        }
        return this.firstName;
    }

    isLastnameValid(control, modelProperty?): ValidationPropertyModel {
        this._setValid(this.lastName);
        const value = this._getValue(control, modelProperty);
        if (this._validate(this.lastName, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.lastName.isValid = false;
                this.lastName.message = 'Last name must be not empty';
            }
        }
        return this.lastName;
    }

    isFormValid(): boolean {
        this.isDateOfBirthValid(null, this.model.dateOfBirth);
        this.isFirstnameValid(null, this.model.firstName);
        this.isLastnameValid(null, this.model.lastName);
        return this.dateOfBirth.isValid && this.firstName.isValid && this.lastName.isValid;
    }
}
