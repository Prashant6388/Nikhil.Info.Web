import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.css']
})
export class AssetSearchComponent implements OnInit {

  assets = [];
  constructor(
    private customHttpService: CustomHttpService
  ) { }

  ngOnInit(): void {
    this.customHttpService.getassets().subscribe(response => {
      this.assets = response;
    });
  }

}
