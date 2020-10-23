import { DataGroupService } from './../../services/data-group.service';
import { DataGroup } from 'src/app/models/dataGroup';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-summary',
  templateUrl: './data-summary.component.html',
  styleUrls: ['./data-summary.component.scss'],
})
export class DataSummaryComponent implements OnInit {
  dataGroups: DataGroup[];

  constructor(private dataGroupService: DataGroupService) {}

  ngOnInit(): void {
    this.dataGroupService.getAll().subscribe((dataGroups: DataGroup[]) => {
      this.dataGroups = dataGroups;
    });
  }
}
