import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointDialogComponent } from '../endpoint-dialog/endpoint-dialog.component';
import { CustomHttpService } from '../services/custom-http.service';
import * as Highcharts from 'highcharts';
import { StoreService } from '../services/store.service';
import { ServerDialogComponent } from '../server-dialog/server-dialog.component';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  endpoints = [];
  servers = [];
  constructor(
    public dialog: MatDialog,
    private customHttpService: CustomHttpService,
    private storeService: StoreService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EndpointDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEndPoints();
    });
  }

  ngOnInit(): void {
    this.getEndPoints();
    //this.getServers();
  }

  getEndPoints() {
    this.customHttpService.getendpoints().subscribe(response => {
      this.endpoints = response;
    });
  }
  deleteEndPoints(id) {
    this.customHttpService.deleteEndpoint(id).subscribe(response => {
      this.getEndPoints();
      this.storeService.openSuccessDialog('Endpoint Deleted Successfully');
    });
  }
  getapplicationsecuritybarchart() {
    this.customHttpService.getapplicationsecuritybarchart().subscribe(response => {
      const applicationSecurityChartData = response;
      const options: any =
      {
        title: {
          text: ''
        },
        xAxis: {
          labels: {
            format: '<div style="text-align:center;font-size:7px">Critical  &nbsp; &nbsp; &nbsp; &nbsp; High  &nbsp; &nbsp; &nbsp; &nbsp; Medium &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; Low<br /><br /><div style="text-align:center;font-size:10px">{value}</div></div>',
            useHTML: true
          },
          tickInterval: 1,
          // labels: {
          //   enabled: true,
          //   formatter() { return this.value; },
          // },
          tickLength: 50,
          categories: applicationSecurityChartData.categories
        },

        yAxis: {
          allowDecimals: false,
          stackLabels:
          {
            // enabled: true,
            // verticalAlign: 'bottom',
            // rotation: -45,
            // formatter() {
            //   return this.stack;
            // }
          },
          min: 0,
          title: {
            text: 'Count of Severity'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          backgroundColor: '#FFFFFF',
          labelFormatter() {
            return this.userOptions.stack + ' - ' + this.name;
          }
        },
        credits:
        {
          enabled: false
        },
        tooltip: {
          formatter() {
            return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>' +
              'Total: ' + this.point.stackTotal;
          }
        },

        plotOptions: {
          column: {
            stacking: 'normal',
            pointPadding: 0.2,
            groupPadding: 0.2,
            pointWidth: 10,
            padding: 20,
          }
        },

        series: applicationSecurityChartData.series
      };
      Highcharts.chart('assetSearchContainer', options);
    });
  }
  ngAfterViewInit(): void {
    this.getapplicationsecuritybarchart();
    this.getvaserverbarchart();
    this.getptnetworkservicebarchart();
  }

  getptnetworkservicebarchart() {
    this.customHttpService.getptnetworkservicebarchart().subscribe(response => {
      const ptnetworkServiceChartData = response;
      const options: any =
      {
        title: {
          text: ''
        },
        xAxis: {
          labels: {
            format: '<div style="text-align:center;font-size:7px">Critical  &nbsp; &nbsp; &nbsp; &nbsp; High  &nbsp; &nbsp; &nbsp; &nbsp; Medium &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; Low<br /><br /><div style="text-align:center;font-size:10px">{value}</div></div>',
            useHTML: true
          },
          tickInterval: 1,
          // labels: {
          //   enabled: true,
          //   formatter() { return this.value; },
          // },
          tickLength: 50,
          categories: ptnetworkServiceChartData.categories
        },

        yAxis: {
          allowDecimals: false,
          stackLabels:
          {
            // enabled: true,
            // verticalAlign: 'bottom',
            // rotation: -45,
            // formatter() {
            //   return this.stack;
            // }
          },
          min: 0,
          title: {
            text: 'Count of Severity'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          backgroundColor: '#FFFFFF',
          labelFormatter() {
            return this.userOptions.stack + ' - ' + this.name;
          }
        },
        credits:
        {
          enabled: false
        },
        tooltip: {
          formatter() {
            return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>' +
              'Total: ' + this.point.stackTotal;
          }
        },

        plotOptions: {
          column: {
            stacking: 'normal',
            pointPadding: 0.2,
            groupPadding: 0.2,
            pointWidth: 10,
            padding: 10,
          }
        },

        series: ptnetworkServiceChartData.series
      };
      Highcharts.chart('PTNetworkContainer', options);
    });
  }

  getvaserverbarchart() {
    this.customHttpService.getvaserverbarchart().subscribe(response => {
      const vaserverChartData = response;
      const options: any =
      {
        title: {
          text: ''
        },
        xAxis: {
          labels: {
            format: '<div style="text-align:center;font-size:7px">Critical  &nbsp; &nbsp; &nbsp; &nbsp; High  &nbsp; &nbsp; &nbsp; &nbsp; Medium &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; Low<br /><br /><div style="text-align:center;font-size:10px">{value}</div></div>',
            useHTML: true
          },
          tickInterval: 1,
          // labels: {
          //   enabled: true,
          //   formatter() { return this.value; },
          // },
          tickLength: 50,
          categories: vaserverChartData.categories
        },

        yAxis: {
          allowDecimals: false,
          stackLabels:
          {
            // enabled: true,
            // verticalAlign: 'bottom',
            // rotation: -45,
            // formatter() {
            //   return this.stack;
            // }
          },
          min: 0,
          title: {
            text: 'Count of Severity'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          backgroundColor: '#FFFFFF',
          labelFormatter() {
            return this.userOptions.stack + ' - ' + this.name;
          }
        },
        credits:
        {
          enabled: false
        },
        tooltip: {
          formatter() {
            return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>' +
              'Total: ' + this.point.stackTotal;
          }
        },

        plotOptions: {
          column: {
            stacking: 'normal',
            pointPadding: 0.2,
            groupPadding: 0.2,
            pointWidth: 10,
            padding: 10,
          }
        },

        series: vaserverChartData.series
      };
      Highcharts.chart('VAServerContainer', options);
    });
  }

  openServerDialog() {
    const dialogRef = this.dialog.open(ServerDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEndPoints();
    });
  }
  getServers() {
    this.customHttpService.getServers().subscribe(response => {
      this.servers = response;
    });
  }
  deleteServer(id) {
    this.customHttpService.deleteServer(id).subscribe(response => {
      this.getServers();
      this.storeService.openSuccessDialog('Server Deleted Successfully');
    });
  }
}
