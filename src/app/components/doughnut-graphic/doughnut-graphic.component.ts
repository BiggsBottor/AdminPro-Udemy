// tslint:disable: no-inferrable-types
// tslint:disable: no-input-rename
import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-graphic',
  templateUrl: './doughnut-graphic.component.html',
  styles: [
  ]
})
export class DoughnutGraphicComponent implements OnInit {

  @Input('title') leyenda: string = 'Leyenda';
  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')  doughnutChartData: MultiDataSet = [[350, 450, 100]];
  @Input('type')  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
