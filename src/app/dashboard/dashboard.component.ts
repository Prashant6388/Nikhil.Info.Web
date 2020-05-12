import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointDialogComponent } from '../endpoint-dialog/endpoint-dialog.component';
import { CustomHttpService } from '../services/custom-http.service';
import * as Highcharts from 'highcharts';

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
export class DashboardComponent implements OnInit {

  endpoints = [];

  seriesData = [['Critical', 0], ['High', 0], ['Medium', 0], ['Low', 0]];
  public options: any = {
    title: {
      text: ''
    },
    xAxis: {
      labels: {
        format: '<div style="text-align:center;font-size:7px">&nbsp; Critical&nbsp; High&nbsp; Medium&nbsp; Low<br /><br /><div style="text-align:center;font-size:10px">{value}</div></div>',
        useHTML: true
      },
      tickInterval: 1,
      // labels: {
      //   enabled: true,
      //   formatter() { return this.value; },
      // },
      tickLength: 50,
      categories: ['Application01', 'Application02', 'Application03']
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

    series: [{
      type: 'column',
      name: 'Open',
      data: [1, 2, 1],
      stack: 'Critical'
    },
    {
      type: 'column',
      name: 'Closed',
      data: [1, 2, 1],
      stack: 'Critical'
    },
    {
      type: 'column',
      name: 'Closed',
      data: [1, 2, 1],
      stack: 'High'
    },
    {
      type: 'column',
      name: 'Closed',
      data: [1, 2, 1],
      stack: 'Medium'
    },
    {
      type: 'column',
      name: 'Open',
      data: [1, 2, 1],
      stack: 'Low'
    }
    ]
  };



  constructor(
    public dialog: MatDialog,
    private customHttpService: CustomHttpService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EndpointDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEndPoints();
    });
  }

  ngOnInit(): void {
    this.getEndPoints();
    Highcharts.chart('assetSearchContainer', this.options);
  }

  getEndPoints() {
    this.customHttpService.getendpoints().subscribe(response => {
      this.endpoints = response;
    });
  }
  deleteEndPoints(id) {
    this.customHttpService.deleteEndpoint(id).subscribe(response => {
      this.getEndPoints();
    });
  }
}
