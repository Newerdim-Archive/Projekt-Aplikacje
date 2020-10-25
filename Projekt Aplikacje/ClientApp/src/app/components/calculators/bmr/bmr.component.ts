import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent implements OnInit {
  bmrForm: FormGroup;
  result: number;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bmrForm = this.fb.group({
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      activity: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.bmrForm.valid) {
      if (this.gender.value === 'm') {
        this.result = Math.round((this.weight.value * 10 + 6.25 * this.height.value - 5 * this.age.value + 5) * this.activity.value);
      } else {
        this.result = Math.round((this.weight.value * 10 + 6.25 * this.height.value - 5 * this.age.value - 161) * this.activity.value);
      }
    }
  }

  get protein(): number {
    return Math.floor(this.result * 0.15);
  }

  get carbo(): number {
    return Math.floor(this.result * 0.55);
  }

  get fat(): number {
    return Math.floor(this.result * 0.30);
  }

  get proteinG(): number {
    return Math.floor(this.result * 0.15 / 4);
  }

  get carboG(): number {
    return Math.floor(this.result * 0.55 / 4);
  }

  get fatG(): number {
    return Math.floor(this.result * 0.30 / 9);
  }

  get gender(): AbstractControl {
    return this.bmrForm.get('gender');
  }

  get age(): AbstractControl {
    return this.bmrForm.get('age');
  }

  get weight(): AbstractControl {
    return this.bmrForm.get('weight');
  }

  get height(): AbstractControl {
    return this.bmrForm.get('height');
  }

  get activity(): AbstractControl {
    return this.bmrForm.get('activity');
  }

}
