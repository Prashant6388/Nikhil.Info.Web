import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../services/custom-http.service';

@Component({
  selector: 'app-pt-network-devices',
  templateUrl: './pt-network-devices.component.html',
  styleUrls: ['./pt-network-devices.component.css']
})
export class PtNetworkDevicesComponent implements OnInit {

  ptnetworkservice = [];
  constructor(private customHttpService: CustomHttpService) { }

  ngOnInit(): void {
    this.customHttpService.getptnetworkservices().subscribe(response => {
      this.ptnetworkservice = response;
    });
  }

}
