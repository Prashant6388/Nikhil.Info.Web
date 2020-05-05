import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointDialogComponent } from '../endpoint-dialog/endpoint-dialog.component';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  endpoints = [];
  constructor(
    public dialog: MatDialog,
    private customHttpService: CustomHttpService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EndpointDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEndPoints();
    });
  }

  ngOnInit(): void {
    this.getEndPoints();
  }

  getEndPoints() {
    this.customHttpService.getendpoints().subscribe(response => {
      this.endpoints = response;
    });
  }
  deleteEndPoints(id) {
    this.customHttpService.deleteEndpoint(id).subscribe(response => {
      this.getEndPoints();
    });
  }
}
