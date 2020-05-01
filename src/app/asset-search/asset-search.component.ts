import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.css']
})
export class AssetSearchComponent implements OnInit {

  assets = [];
  searchCriteria = '';
  length = 0;
  pageEvent =
    {
      pageIndex: 0,
      pageSize: 10
    };
  pageSizeOptions: number[] = [10, 25, 50, 100];
  constructor(
    private customHttpService: CustomHttpService
  ) { }

  ngOnInit(): void {
    this.customHttpService.getassets().subscribe(response => {
      this.assets = response;
    });
  }
  getAssetSearch() {

    // tslint:disable-next-line:variable-name

    this.length = this.assets
      .filter(item =>
        item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.ipAddress.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
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
        item.loggedInUser.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.operatingSystem.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.patchesInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.softwareInstalled.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.softwareVersion.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0 ||
        item.userAccountDetails.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0
      )
      .slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);


    return searchAssets;
  }
  pageChanged(event) {
    this.pageEvent = event;
  }
}
