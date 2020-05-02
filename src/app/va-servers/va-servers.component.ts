import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
@Component({
  selector: 'app-va-servers',
  templateUrl: './va-servers.component.html',
  styleUrls: ['./va-servers.component.css']
})
export class VaServersComponent implements OnInit {

  vaservers = [];
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
    private exportAsService: ExportAsService) { }

  ngOnInit(): void {
    this.customHttpService.getvaservers().subscribe(response => {
      this.vaservers = response;
    });
  }
  getAppSecuritySearch() {

    // tslint:disable-next-line:variable-name

    this.length = this.vaservers
      .filter(item =>
        item.datacenter.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.hostname.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      ).length;

    if (this.length < this.pageEvent.pageSize) {
      this.pageEvent.pageIndex = 0;
    }

    const searchVAservers = this.vaservers
      .filter(item =>
        item.datacenter.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.hostname.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      )
      .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


    return searchVAservers;
  }
  pageChanged(event) {
    this.pageEvent = event;
  }
  download(type: string) {
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
      this.exportAsService.save(exportAsConfig, 'va-server-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Excel') {
      exportAsConfig = {
        type: 'xlsx',
        elementIdOrContent: 'excel-table',
      };
      this.exportAsService.save(exportAsConfig, 'va-server-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Html') {
      
    }


  }

  getPrintData() {
    let printString = '';
    printString += '<div style="width:770px;font-size:12px;margin-bottom:30px;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" >';
    printString += '<h5 align="center" style="padding:10px"> VA Server Details </h5>';
    printString += '<table class="table table-hover table-bordered mb-0">';
    printString += '<thead class="thead-light">';
    printString += '<tr>';
    printString += '<th scope="col" style="width: 8%;">Sr. No.</th>';
    printString += '<th scope="col">Data Center</th>';
    printString += '<th scope="col">Host Name</th>';
    printString += '<th scope="col">IP Address</th>';
    printString += '<th scope="col">Vulnerability</th>';
    printString += '<th scope="col">Severity</th>';
    printString += '<th scope="col">Severity1</th>';
    printString += '<th scope="col">Status</th>';
    printString += '</tr>';
    printString += '</thead>';
    printString += '<tbody>';

    let i = 1;
    this.getAppSecurityPrint().forEach(item => {

      if (i % 21 === 0) {
        printString += '<tr class="header" style="border:none"> <td colspan="8"></td></tr>';
      }
      printString += '<tr>';
      printString += '<th scope="row">' + i + '</th>';
      printString += '<td>' + item.datacenter + '</td>';
      printString += '<td>' + item.hostname + '</td>  ';
      printString += '<td>' + item.ipAddress + '</td>';
      printString += '<td>' + item.vulnerability + '</td>';
      printString += '<td>' + item.severity + '</td>';
      printString += '<td>' + item.severity1 + '</td>';
      printString += '<td>' + item.status + '</td>';
      printString += '</tr>';

      i = i + 1;


    });
    printString += '</tbody>';
    printString += '</table>';
    printString += '</div>';
    return printString;
  }
  getAppSecurityPrint() {

    const searchVAservers = this.vaservers
      .filter(item =>
        item.datacenter.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.hostname.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      );


    return searchVAservers;
  }
}
