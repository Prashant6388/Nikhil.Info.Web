import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';
import { UserAccessFormComponent } from '../user-access-form/user-access-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {


  users = [];
  searchCriteria = '';
  length = 0;
  pageEvent =
    {
      pageIndex: 0,
      pageSize: 10
    };
  pageSizeOptions: number[] = [10, 25, 50, 100];
  constructor(
    private customHttpService: CustomHttpService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.customHttpService.getusers().subscribe(response => {
      this.users = response;
    });
  }
  getUserSearch() {

    // tslint:disable-next-line:variable-name

    this.length = this.users
      .filter(item =>
        item.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.email.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.contactNo.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      ).length;

    if (this.length < this.pageEvent.pageSize) {
      this.pageEvent.pageIndex = 0;
    }

    const searchUsers = this.users
      .filter(item =>
        item.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.email.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.contactNo.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      )
      .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


    return searchUsers;
  }
  pageChanged(event) {
    this.pageEvent = event;
  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(UserAccessFormComponent, {
      width: '400px',
      data: item != null ? item : null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  deleteUser(id) {
    this.customHttpService.deleteUser(id).subscribe(response => {
      this.getUsers();
    });
  }
}
