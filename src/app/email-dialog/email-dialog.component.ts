import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomHttpService } from '../services/custom-http.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  emailIds = '';
  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customHttpService: CustomHttpService,
    private storeService: StoreService) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form: NgForm) {
    this.data.emailID = this.emailIds;
    if (form.valid) {
      this.customHttpService.sendEmail(this.data).subscribe(response => {
        this.dialogRef.close();
        this.storeService.openSuccessDialog('Email Sent Successfully');
      });
    }
  }
}
