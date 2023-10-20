import { AbstractControl, FormGroup } from '@angular/forms';
import { OptionsErrorMessage } from '../models/optionsErrorMessage';

export class ErrorFormMessage {
  getErrorMessage(
    field: string,
    form: FormGroup,
    options: OptionsErrorMessage,
  ): string | undefined {
    let error: AbstractControl<any, any> = form.get(field)!;
    let message;

    if (error?.errors?.['required']) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength')) {
      message = `Debe colocar un mínimo de ${options.minLength} caracteres`;
    }
    if (error.hasError('maxlength')) {
      message = `Debe colocar un máximo de ${options.minLength} caracteres`;
    }
    if (error.hasError('email')) {
      message = 'El email es invalido';
    }
    if (error.hasError('pattern')) {
      if (!options.message) options.message = 'Campo invalido';

      message = options.message;
    }

    return message;
  }

  isValidField(field: string, form: FormGroup): boolean | undefined {
    const error = form.get(field);

    return (error?.dirty || error?.touched) && error?.status === 'INVALID';
  }

  constructor() {}
}
