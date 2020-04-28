import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-app-sec',
  templateUrl: './app-sec.component.html',
  styleUrls: ['./app-sec.component.css']
})
export class AppSecComponent implements OnInit {

  appsecurity = [];
  constructor(private customHttpService: CustomHttpService) { }

  ngOnInit(): void {
    this.customHttpService.getapplicationsecurity().subscribe(response => {
      this.appsecurity = response;
    });
  }

}
