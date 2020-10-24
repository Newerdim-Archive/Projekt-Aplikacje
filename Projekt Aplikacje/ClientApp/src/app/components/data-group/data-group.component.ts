import { DataGroupService, DataMethod } from './../../services/data-group.service';
import { DataGroup } from './../../models/dataGroup';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-data-group',
  templateUrl: './data-group.component.html',
  styleUrls: ['./data-group.component.scss'],
})
export class DataGroupComponent implements OnInit {
  dataGroups: DataGroup[];
  dataGroupName: string;
  Method: DataMethod;

  constructor(
    private dataGroupService: DataGroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.dataGroupName = params.get('groupName');
      if (!this.dataGroupName) {
        this.router.navigate(['/']);
      } else {
        // this.getTasksFromGroup();
      }
    });


  }
}
