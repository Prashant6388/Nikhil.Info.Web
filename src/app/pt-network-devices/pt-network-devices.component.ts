import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { PrintColumnComponent } from '../print-column/print-column.component';

@Component({
  selector: 'app-pt-network-devices',
  templateUrl: './pt-network-devices.component.html',
  styleUrls: ['./pt-network-devices.component.css']
})
export class PtNetworkDevicesComponent implements OnInit {

  ptnetworkservice = [];
  printArray = [];
  columns =
    [
      'ipAddress',
      'vulnerability',
      'severity',
      'severity1',
      'status',
    ];
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
    private exportAsService: ExportAsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customHttpService.getptnetworkservices().subscribe(response => {
      this.ptnetworkservice = response;
    });
  }


  getPTNetworkServiceSearch() {

    // tslint:disable-next-line:variable-name

    this.length = this.ptnetworkservice
      .filter(item =>
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      ).length;

    if (this.length < this.pageEvent.pageSize) {
      this.pageEvent.pageIndex = 0;
    }

    const searchPTNetworkService = this.ptnetworkservice
      .filter(item =>
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      )
      .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


    return searchPTNetworkService;
  }
  pageChanged(event) {
    this.pageEvent = event;
  }
  download(type: string) {
    const dialogRef = this.dialog.open(PrintColumnComponent, {
      width: '400px',
      disableClose: true,
      data: this.columns
    });

    dialogRef.afterClosed().subscribe(res => {
      this.printArray = res;
      let exportAsConfig: ExportAsConfig = null;
      if (type === 'PDF') {
        const marginArray = [10, 0, 10, 0];
        exportAsConfig = {
          type: 'pdf',
          elementIdOrContent: this.getPrintData(),
          options: {
            margin: marginArray,
            pagebreak: { before: '.header' },
          }
        };
        this.exportAsService.save(exportAsConfig, 'pt-network-sevices').subscribe(() => {
          // save started
        });
      }
      else if (type === 'Excel') {
        exportAsConfig = {
          type: 'xlsx',
          elementIdOrContent: 'excel-table',
        };
        this.exportAsService.save(exportAsConfig, 'pt-network-sevices').subscribe(() => {
          // save started
        });
      }
      else if (type === 'Html') {

      }
    });

  }
  isPrintArrayHas(column) {
    return this.printArray.find(d => d === column) != null;
  }
  getPrintData() {
    let printString = '';
    printString += '<div style="width:770px;font-size:12px;margin-bottom:30px;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" >';
    printString += '<h5 align="center" style="padding:10px"> PT Network Sevices Details </h5>';
    printString += '<table class="table table-hover table-bordered mb-0">';
    printString += '<thead class="thead-light">';
    printString += '<tr>';
    printString += '<th scope="col" style="width: 8%;">Sr. No.</th>';
    if (this.isPrintArrayHas('ipAddress')) {
      printString += '<th scope="col">IP Address</th>';
    }
    if (this.isPrintArrayHas('vulnerability')) {
      printString += '<th scope="col">Vulnerability</th>';
    }
    if (this.isPrintArrayHas('severity')) {
      printString += '<th scope="col">Severity</th>';
    }
    if (this.isPrintArrayHas('severity1')) {
      printString += '<th scope="col">Severity1</th>';
    }
    if (this.isPrintArrayHas('status')) {
      printString += '<th scope="col">Status</th>';
    }
    printString += '</tr>';
    printString += '</thead>';
    printString += '<tbody>';

    let i = 1;
    this.getPTNetworkServicePrint().forEach(item => {

      if (i % 21 === 0) {
        printString += '<tr class="header" style="border:none"> <td colspan="8"></td></tr>';
      }
      printString += '<tr>';
      printString += '<th scope="row">' + i + '</th>';
      if (this.isPrintArrayHas('ipAddress')) {
        printString += '<td>' + item.ipAddress + '</td>';
      }
      if (this.isPrintArrayHas('vulnerability')) {
        printString += '<td>' + item.vulnerability + '</td>';
      }
      if (this.isPrintArrayHas('severity')) {
        printString += '<td>' + item.severity + '</td>';
      }
      if (this.isPrintArrayHas('severity1')) {
        printString += '<td>' + item.severity1 + '</td>';
      }
      if (this.isPrintArrayHas('status')) {
        printString += '<td>' + item.status + '</td>';
      }
      printString += '</tr>';

      i = i + 1;


    });
    printString += '</tbody>';
    printString += '</table>';
    printString += '</div>';
    return printString;
  }
  getPTNetworkServicePrint() {

    const searchPTNetworkService = this.ptnetworkservice
      .filter(item =>
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      );


    return searchPTNetworkService;
  }
  openEmailDialog(): void {

    let exportAsConfig: ExportAsConfig = null;
    const marginArray = [10, 0, 10, 0];
    exportAsConfig = {
      type: 'pdf',
      elementIdOrContent: this.getPrintData(),
      options: {
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
        fileName: 'pt-network-services.pdf',
        Subject: 'PT Network Service Search Report',
        body: 'Please Find Attached PT Network Service Search Report.',
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
