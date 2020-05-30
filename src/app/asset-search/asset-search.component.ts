import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { StoreService } from '../services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';

@Component({
  selector: 'app-asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.css']
})
export class AssetSearchComponent implements OnInit {

  assets = [];
  searchCriteria = '';
  searchColumn = 'All';
  length = 0;
  pageEvent =
    {
      pageIndex: 0,
      pageSize: 10
    };
  pageSizeOptions: number[] = [10, 25, 50, 100];
  constructor(
    private customHttpService: CustomHttpService,
    private exportAsService: ExportAsService,
    private storeService: StoreService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.customHttpService.getassets().subscribe(response => {
      this.assets = response;
    });
  }
  getAssetSearch() {

    // tslint:disable-next-line:variable-name
    if (this.searchColumn === 'All') {

      this.length = this.assets
        .filter(item =>
          item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.computerName.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.operatingSystem.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.patchesInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareVersion.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.userAccountDetails.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        ).length;

      if (this.length < this.pageEvent.pageSize) {
        this.pageEvent.pageIndex = 0;
      }

      const searchAssets = this.assets
        .filter(item =>
          item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.computerName.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.operatingSystem.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.patchesInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareVersion.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.userAccountDetails.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        )
        .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);

      return searchAssets;
    }
    else {
      this.length = this.assets
        .filter(item =>
          item[this.searchColumn].toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        ).length;

      if (this.length < this.pageEvent.pageSize) {
        this.pageEvent.pageIndex = 0;
      }

      const searchAssets = this.assets
        .filter(item =>
          item[this.searchColumn].toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        )
        .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


      return searchAssets;
    }
  }
  pageChanged(event) {
    this.pageEvent = event;
  }
  download(type: string) {
    let exportAsConfig: ExportAsConfig = null;
    if (type === 'PDF') {
      const marginArray = [5, 0, 10, 0];
      exportAsConfig = {
        type: 'pdf',
        elementIdOrContent: this.getPrintData(),
        options: {
          jsPDF: { orientation: 'landscape' },
          margin: marginArray,
          pagebreak: { before: '.header' },
        }
      };
      this.exportAsService.save(exportAsConfig, 'asset-search-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Excel') {
      exportAsConfig = {
        type: 'xlsx',
        elementIdOrContent: 'excel-table',
      };
      this.exportAsService.save(exportAsConfig, 'asset-search-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Html') {

    }


  }

  getPrintData() {
    let printString = '';
    printString += '<div style="width:1100px;font-size:12px;margin-bottom:30px;padding-top:0px;padding-bottom:20px;padding-left:20px;padding-right:20px" >';
    printString += '<h5 align="center" style="padding:10px"> Asset Search Details </h5>';
    printString += '<table class="table table-hover table-bordered mb-0">';
    printString += '<thead class="thead-light">';
    printString += '<tr>';
    printString += '<th scope="col" style="width:6%">Sr. No.</th>';
    printString += '<th scope="col">Logged In User</th>';
    printString += '<th scope="col">Computer Name</th>';
    printString += '<th scope="col">Operating System</th>';
    printString += '<th scope="col">IP Address</th>';
    printString += '<th scope="col">Software Installed</th>';
    printString += '<th scope="col">Software Version</th>';
    printString += '<th scope="col">Patches Installed</th>';
    printString += '<th scope="col">User Account Details</th>';
    printString += '</tr>';
    printString += '</thead>';
    printString += '<tbody>';

    let i = 1;
    this.getAssetSearchPrint().forEach(item => {

      if (i % 7 === 0) {
        printString += '<tr class="header" style="border:none"> <td colspan="9"></td></tr>';
      }
      printString += '<tr>';
      printString += '<th scope="row">' + i + '</th>';
      printString += '<td>' + item.loggedInUser + '</td>';
      printString += '<td>' + item.computerName + '</td>';
      printString += '<td>' + item.operatingSystem + '</td>';
      printString += '<td>' + item.ipAddress + '</td>';
      printString += '<td>' + item.softwareInstalled + '</td>';
      printString += '<td>' + item.softwareVersion + '</td>';
      printString += '<td>' + item.patchesInstalled + '</td>';
      printString += '<td>' + item.userAccountDetails + '</td>';
      printString += '</tr>';

      i = i + 1;
    });
    printString += '</tbody>';
    printString += '</table>';
    printString += '</div>';
    return printString;
  }
  getAssetSearchPrint() {

    if (this.searchColumn === 'All') {
      const searchAssets = this.assets
        .filter(item =>
          item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.computerName.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.operatingSystem.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.patchesInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.softwareVersion.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
          item.userAccountDetails.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        );
      return searchAssets;
    }
    else {
      const searchAssets = this.assets
        .filter(item =>
          item[this.searchColumn].toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
        );
      return searchAssets;
    }


  } 

  openEmailDialog(): void {

    let exportAsConfig: ExportAsConfig = null;
    const marginArray = [5, 0, 10, 0];
    exportAsConfig = {
      type: 'pdf',
      elementIdOrContent: this.getPrintData(),
      options: {
        jsPDF: { orientation: 'landscape' },
        margin: marginArray,
        pagebreak: { before: '.header' },
      }
    };
    this.exportAsService.get(exportAsConfig).subscribe((byteArray) => {
      const arrayFile = byteArray.split('base64');
      const file = arrayFile[1].substring(1, arrayFile[1].length);

      const req =
      {
        fileArray: file,
        fileName: 'asset-search.pdf',
        Subject: 'Asset Search Report',
        body: 'Please Find Attached Asset Search Report.',
        emailID: '',
        loginName: ''
      };

      const dialogRef = this.dialog.open(EmailDialogComponent, {
        width: '400px',
        disableClose: true,
        data: req
      });

    });

  }
}

