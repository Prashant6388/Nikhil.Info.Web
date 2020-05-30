import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomHttpService } from '../services/custom-http.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-endpoint-dialog',
  templateUrl: './endpoint-dialog.component.html',
  styleUrls: ['./endpoint-dialog.component.css']
})
export class EndpointDialogComponent implements OnInit {

  endpoint =
    {
      title: '',
      keywords: '',
      id: ''
    };
  constructor(
    public dialogRef: MatDialogRef<EndpointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customHttpService: CustomHttpService,
    private storeService : StoreService) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form: NgForm) {
    if (form.valid) {
      this.customHttpService.postEndpoint(this.endpoint).subscribe(response => {
        this.dialogRef.close();
        this.storeService.openSuccessDialog('Data Saved Successfully');
      });
    }
  }
}
