import { Component, OnInit } from '@angular/core';

declare const checkInputs;

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.scss']
})
export class UserFormsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    checkInputs();
  }

}
