import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
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
  selector: 'app-server-pie-chart',
  templateUrl: './server-pie-chart.component.html',
  styleUrls: ['./server-pie-chart.component.css']
})
export class ServerPieChartComponent implements OnInit, AfterViewInit {

  @Input()
  piechartData: any;

  @Input()
  index: any;
  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Highcharts.chart('container' + this.index,
      {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        credits:
        {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemMarginTop: 10,
          itemMarginBottom: 10
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Brands',
          type: 'pie',
          data: [{
            name: this.piechartData.title,
            y: this.piechartData.availableCountPer
          }, {
            name: 'Other',
            y: 100 - this.piechartData.availableCountPer
          }]
        }]
      }, null);
  }
}
