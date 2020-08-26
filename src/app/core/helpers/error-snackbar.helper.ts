import { MatSnackBar } from '@angular/material/snack-bar';

export class ErrorSnackbarHelper {

  static showErrorSnackbar(snackbar: MatSnackBar, error: string): void {
    const message = !!error && typeof error === 'string' ? error : 'Ooops... Something went wrong';
    snackbar.open(`⚠️${message}`, null, {
      panelClass: ['error-snackbar'],
      duration: 4000
    });
  }

}
