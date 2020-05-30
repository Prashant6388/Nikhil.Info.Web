import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public dialog: MatDialog) { }

  loggedInUser = null;

  openErrorDialog(errorResponse)
  {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      disableClose : true,
      data : errorResponse
    });
  }
  openSuccessDialog(successResponse)
  {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '600px',
      disableClose : true,
      data : successResponse
    });
  }
}
