import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-access-dialog',
  templateUrl: './user-access-dialog.component.html',
  styleUrls: ['./user-access-dialog.component.css']
})
export class UserAccessDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserAccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
