import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-app-sec',
  templateUrl: './app-sec.component.html',
  styleUrls: ['./app-sec.component.css']
})
export class AppSecComponent implements OnInit {

  appsecurity = [];
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
    this.customHttpService.getapplicationsecurity().subscribe(response => {
      this.appsecurity = response;
    });
  }

  getAppSecuritySearch() {

    // tslint:disable-next-line:variable-name

    this.length = this.appsecurity
      .filter(item =>
        item.application.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      ).length;

    if (this.length < this.pageEvent.pageSize) {
      this.pageEvent.pageIndex = 0;
    }

    const searchAppSecurity = this.appsecurity
      .filter(item =>
        item.application.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      )
      .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


    return searchAppSecurity;
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
      this.exportAsService.save(exportAsConfig, 'application-security-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Excel') {
      exportAsConfig = {
        type: 'xlsx',
        elementIdOrContent: 'excel-table',
      };
      this.exportAsService.save(exportAsConfig, 'application-security-detail').subscribe(() => {
        // save started
      });
    }
    else if (type === 'Html') {

    }


  }

  getPrintData() {
    let printString = '';
    printString += '<div style="width:770px;font-size:12px;margin-bottom:30px;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" >';
    printString += '<h5 align="center" style="padding:10px"> Application Security Details </h5>';
    printString += '<table class="table table-hover table-bordered mb-0">';
    printString += '<thead class="thead-light">';
    printString += '<tr>';
    printString += '<th scope="col" style="width: 8%;">Sr. No.</th>';
    printString += '<th scope="col">Application</th>';
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
      printString += '<td>' + item.application + '</td>';
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

    const searchAppSecurity = this.appsecurity
      .filter(item =>
        item.application.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.vulnerability.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.severity1.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.status.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      );


    return searchAppSecurity;
  }

  sendEmail(type: string) {
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
      this.exportAsService.get(exportAsConfig).subscribe((byteArray) => {


        fetch(byteArray)
          .then(res => res.blob())
          .then(blob => {
            // var fd = new FormData()
            // fd.append('image', blob, 'filename')

            // console.log(blob)
            const req =
            {
              fileArray: blob,
              fileName: 'asset-search.pdf'
            };
            this.customHttpService.sendEmail(req).subscribe(response => {

            });
          });

      });
    }
  }
}
