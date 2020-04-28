import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-va-servers',
  templateUrl: './va-servers.component.html',
  styleUrls: ['./va-servers.component.css']
})
export class VaServersComponent implements OnInit {

  vaservers = [];
  constructor(private customHttpService: CustomHttpService) { }

  ngOnInit(): void {
    this.customHttpService.getvaservers().subscribe(response => {
      this.vaservers = response;
    });
  }
}
