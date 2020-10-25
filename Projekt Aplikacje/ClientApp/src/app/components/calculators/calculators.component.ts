import { Component, OnInit } from '@angular/core';

declare const checkInputs;

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.scss']
})
export class CalculatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    checkInputs();
  }

}
