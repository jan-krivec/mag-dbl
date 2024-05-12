import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ErrorDialogComponent} from "./error-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  // Method to display error dialog
  displayError(errorMessage: string): MatDialogRef<ErrorDialogComponent> {
    return this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage }
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
