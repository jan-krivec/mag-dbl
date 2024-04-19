import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ErrorDialogComponent} from "./error-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialog: MatDialog) { }

  // Method to display error dialog
  displayError(errorMessage: string): MatDialogRef<ErrorDialogComponent> {
    return this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage }
    });
  }
}
