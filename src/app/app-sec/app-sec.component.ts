import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

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
  constructor(private customHttpService: CustomHttpService) { }
 
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
}
