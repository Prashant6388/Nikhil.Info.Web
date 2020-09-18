import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-server-dialog',
  templateUrl: './server-dialog.component.html',
  styleUrls: ['./server-dialog.component.css']
})
export class ServerDialogComponent implements OnInit {


  server =
    {
      title: '',
      keywords: '',
      id: ''
    };
  constructor(
    public dialogRef: MatDialogRef<ServerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customHttpService: CustomHttpService,
    private storeService: StoreService) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form: NgForm) {
    if (form.valid) {
      this.customHttpService.postServer(this.server).subscribe(response => {
        this.dialogRef.close();
        this.storeService.openSuccessDialog('Data Saved Successfully');
      });
    }
  }
}
