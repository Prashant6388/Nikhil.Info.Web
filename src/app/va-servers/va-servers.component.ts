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
    const exportAsConfig: ExportAsConfig = {
      type: 'pdf',
      elementIdOrContent: this.getPrintData(), // the id of html/table element
      options: {
        jsPDF: {
          orientation: 'potrait'
        },
        margin: {
          top: '10',
          bottom: '10'
        },
        pdfCallbackFn: this.pdfCallbackFn
      }
    };
    this.exportAsService.save(exportAsConfig, 'va-server-detail').subscribe(() => {
      // save started
    });
  }

  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
      // pdf.img('')
    }
  }
  getPrintData() {
    let printString = '';
    printString += '<div style="width:750px;font-size:12px;padding:20px" >';
    printString += '<table class="table table-hover table-bordered mb-0">';
    printString += '<thead class="thead-light">';
    printString += '<tr>';
    printString += '<th scope="col" style="width: 13%;">Sr. No.</th>';
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
