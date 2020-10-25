import { DataService } from './../../services/data.service';
import { DataGroupService } from './../../services/data-group.service';
import { DataGroup } from './../../models/dataGroup';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataModel } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { DataMethod, UpdateDataModel } from 'src/app/models/updateDataModel';
import { Chart } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-group',
  templateUrl: './data-group.component.html',
  styleUrls: ['./data-group.component.scss'],
})
export class DataGroupComponent implements OnInit {
  dataGroup: DataGroup;
  dataGroupName: string;
  chart: any;
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

            if (this.dataGroup.name === 'Waga') {
              this.generateChart('line');
            } else {
              this.generateChart('bar');
            }
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
          if (result.method === DataMethod.Add) {
            this.datas.push(result.data);
          } else if (result.method === DataMethod.Update) {
            this.datas = this.datas.map((d) =>
              d.id === result.data.id ? result.data : d
            );
          } else if (result.method === DataMethod.Delete) {
            this.datas = this.datas.filter((d) => d.id !== result.data.id);
          }

          this.sortAndFilterList();
          if (this.dataGroup.name === 'Waga') {
            this.generateChart('line');
          } else {
            this.generateChart('bar');
          }
        }
      });
  }

  generateChart(type: string): void {
    // const canvas = document.getElementById('myChart').getContext('2d');

    const labels = this.datas
      .filter((d, index) => index < 7)
      .map((d) => new DatePipe('pl-PL').transform(d.date, 'dd MMM yyyy'));

    const data = this.datas.filter((d, index) => index < 7).map((d) => d.value);

    this.chart = new Chart('myChart', {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: 'rgba(64, 115, 255, 0.2)',
            borderColor: 'rgb(64, 115, 255)'
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
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
          fontColor: '#333'
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

  showDataModal(): void {
    this.dataService.showFormModal({
      data: null,
      dataGroupId: this.dataGroup.id,
    });
  }

  get datas(): DataModel[] {
    return this.dataGroup?.datas;
  }

  set datas(datas: DataModel[]) {
    this.dataGroup.datas = datas;
  }
}
