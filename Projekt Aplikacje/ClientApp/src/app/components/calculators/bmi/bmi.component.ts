import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  bmiForm: FormGroup;
  bmi: number;
  result: string;
  resultTypes = [
    'Wygłodzenie',
    'Wychudzenie',
    'Niedowaga',
    'Wartość prawidłowa',
    'Nadwaga',
    'I stopień otyłości',
    'II stopień otyłości',
    'Otyłość skrajna',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bmiForm = this.fb.group({
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.bmiForm.valid) {
      this.bmi =
        Math.round(
          (this.weight.value / Math.pow(this.height.value, 2)) * 10000 * 100
        ) / 100;

      if (this.bmi < 16) {
        this.result = this.resultTypes[0];
      } else if (this.bmi >= 16 && this.bmi < 17) {
        this.result = this.resultTypes[1];
      } else if (this.bmi >= 17 && this.bmi < 18.5) {
        this.result = this.resultTypes[2];
      } else if (this.bmi >= 18.5 && this.bmi < 25) {
        this.result = this.resultTypes[3];
      } else if (this.bmi >= 25 && this.bmi < 30) {
        this.result = this.resultTypes[4];
      } else if (this.bmi >= 30 && this.bmi < 35) {
        this.result = this.resultTypes[5];
      } else if (this.bmi > 35 && this.bmi < 40) {
        this.result = this.resultTypes[6];
      } else {
        this.result = this.resultTypes[7];
      }
    }
  }

  get weight(): AbstractControl {
    return this.bmiForm.get('weight');
  }

  get height(): AbstractControl {
    return this.bmiForm.get('height');
  }
}
