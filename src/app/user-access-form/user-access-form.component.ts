import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-user-access-form',
  templateUrl: './user-access-form.component.html',
  styleUrls: ['./user-access-form.component.css']
})
export class UserAccessFormComponent implements OnInit {

  user = {
    id: null,
    name: '',
    email: '',
    password: '',
    contactNo: ''
  };
  constructor(
    private customHttpService: CustomHttpService,
    public dialogRef: MatDialogRef<UserAccessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.user = data;
    }
  }

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form) {
    if (form.valid) {
      this.customHttpService.postUser(this.user).subscribe(response => {
        this.dialogRef.close();
      });
    }
  }
}
