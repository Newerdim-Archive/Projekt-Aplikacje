import { Component, Input, OnInit } from '@angular/core';
import { DataModel } from 'src/app/models/dataModel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() data: DataModel;
  @Input() unit: string;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
  }

  showDataModal(): void {
    this.dataService.showFormModal({data: this.data, dataGroupId: this.data.dataGroupId});
  }
}
