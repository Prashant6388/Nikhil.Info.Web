import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-access-form',
  templateUrl: './user-access-form.component.html',
  styleUrls: ['./user-access-form.component.css']
})
export class UserAccessFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserAccessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
