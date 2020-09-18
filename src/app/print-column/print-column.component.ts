import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-print-column',
  templateUrl: './print-column.component.html',
  styleUrls: ['./print-column.component.css']
})
export class PrintColumnComponent implements OnInit {

  @ViewChild('columnlist') columnlist: MatSelectionList;
  columns = [];
  constructor(
    public dialogRef: MatDialogRef<PrintColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.columns = data;
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    const options = [];
    this.columnlist.selectedOptions.selected.forEach(option => {
      if (option.selected) {
        options.push(option.value);
      }
    });
    this.dialogRef.close(options);

  }
}
