import { DataService } from './../../services/data.service';
import { DataGroupService } from './../../services/data-group.service';
import { DataGroup } from './../../models/dataGroup';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataModel } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { DataMethod, UpdateDataModel } from 'src/app/models/updateDataModel';
import * as moment from 'moment';
import 'moment/locale/nl';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-group',
  templateUrl: './data-group.component.html',
  styleUrls: ['./data-group.component.scss'],
})
export class DataGroupComponent implements OnInit {
  dataGroup: DataGroup;
  dataGroupName: string;
  chart: any;
  howManyDataInChart = 60;
  // Method: DataMethod;

  constructor(
    private dataGroupService: DataGroupService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.dataGroupName = params.get('dataName');
      if (!this.dataGroupName) {
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: 'Oczekiwanie na odpowiedź od serwera...',
          willOpen: () => {
            Swal.showLoading();
          },
        });

        this.dataGroupService.getByName(this.dataGroupName).subscribe(
          (result) => {
            Swal.close();
            this.dataGroup = result;

            this.sortAndFilterList();
            this.generateChart();
          },
          (error: HttpErrorResponse) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: `Oops...`,
              html: `${error.error}. <br> Nastąpi przekierowanie na stronę główną.`,
              timer: 4000,
              timerProgressBar: true,
            }).then(() => {
              this.router.navigate(['/']);
            });
          }
        );
      }
    });

    this.dataService
      .updateListListener()
      .subscribe((result: UpdateDataModel) => {
        if (result) {
          if (result.method === DataMethod.Update) {
            // Check if data exists
            const dataInList = this.datas.filter(
              (d) => d.id === result.data.id
            );
            if (dataInList?.length) {
              this.datas = this.datas.map((d) =>
                d.id === result.data.id ? result.data : d
              );
            } else {
              // If not add this data
              this.datas.push(result.data);
            }
          } else if (result.method === DataMethod.Delete) {
            this.datas = this.datas.filter((d) => d.id !== result.data.id);
          }

          this.sortAndFilterList();
          this.generateChart();
        }
      });
  }

  generateChart(): void {
    this.chart?.destroy();

    const reversedData = this.getReverseSortedAndFilteredList();

    const labels = reversedData
      .filter((d, index) => index < this.howManyDataInChart)
      .map((d) => new Date(d.date));

    const data = reversedData
      .filter((d, index) => index < this.howManyDataInChart)
      .map((d) => d.value);

    // Translate months into polish
    moment.locale('pl');

    this.chart = new Chart('myChart', {
      type: this.dataGroup.chartType,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: 'rgba(64, 115, 255, 0.2)',
            borderColor: 'rgb(64, 115, 255)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        // straight lines instead of curves and remove fill
        elements: {
          line: {
            tension: 0,
            fill: false
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: { day: 'D MMM' },
                tooltipFormat: 'DD MMMM YYYY',
                // min: this.addDaysToDate(new Date(), -7).toString(),
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        hover: { mode: null },
        title: {
          display: true,
          text: 'Podsumowanie tygodnia.',
          fontSize: 20,
          padding: 20,
          fontColor: '#333',
        },
        legend: {
          display: false,
          onClick: null,
        },
      },
    });
  }

  sortAndFilterList(): void {
    this.datas = this.datas
      ?.filter((d) => d.dataGroupId === this.dataGroup.id)
      ?.sort((a: DataModel, b: DataModel) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }

  getReverseSortedAndFilteredList(): DataModel[] {
    return this.datas
      ?.filter((d) => d.dataGroupId === this.dataGroup.id)
      ?.sort((a: DataModel, b: DataModel) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }

  showDataModal(): void {
    this.dataService.showFormModal({
      data: null,
      dataGroupId: this.dataGroup.id,
    });
  }

  addDaysToDate(date: Date | string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  get datas(): DataModel[] {
    return this.dataGroup?.datas;
  }

  set datas(datas: DataModel[]) {
    this.dataGroup.datas = datas;
  }
}
