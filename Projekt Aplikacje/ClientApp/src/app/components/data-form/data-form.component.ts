import { DataFormModel } from './../../models/dataFormModel';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataGroup } from 'src/app/models/dataGroup';
import { DataModel } from 'src/app/models/dataModel';
import { DataGroupService } from 'src/app/services/data-group.service';
import { DataService } from 'src/app/services/data.service';
import { DataMethod, UpdateDataModel } from 'src/app/models/updateDataModel';

declare const checkInputs;

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  dataForm: FormGroup;
  formTitle: string;
  dataGroups: DataGroup[];
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private dataGroupService: DataGroupService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.dataForm = this.fb.group({
      id: [''],
      value: ['', [Validators.required]],
      date: ['', [Validators.required]],
      dataGroupId: [''],
    });

    // Get all data groups
    this.dataGroupService.getAll().subscribe((dataGroups) => {
      this.dataGroups = dataGroups;
    });

    // Show modal listener
    this.dataService.showModalListener().subscribe((result: DataFormModel) => {
      if (result === undefined) {
        return;
      }

      this.dataForm.reset();

      if (result.data) {
        this.setDataToForm(result.data);
        this.formTitle = 'Edycja Danych';
      } else {
        this.setDefaultDataToForm(result.dataGroupId);
        this.formTitle = 'Dodawanie Danych';
      }

      checkInputs();
      this.showModal = true;
    });

    // Close modal openModalListener
    this.dataService.closeModalListener().subscribe(result => {
      if (result) {
        this.hideModal();
      }
    });
  }

  setDataToForm(dataModel: DataModel): void {
    this.dataForm.patchValue(dataModel);
    this.date.patchValue(this.dateForInput(dataModel.date));

    if (!dataModel.dataGroupId) {
      this.dataGroupId.setValue('');
    }
  }

  setDefaultDataToForm(dataGroupId): void {
    this.setDataToForm(
      new DataModel({
        id: null,
        value: null,
        date: new Date(),
        dataGroupId,
      })
    );
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      const dataModel = new DataModel({
        id: this.id.value,
        value: this.value.value,
        date: this.date.value,
        dataGroupId: this.dataGroupId.value,
      });

      if (!this.id?.value) {
        this.dataService.add(dataModel).subscribe((result: DataModel) => {
          this.dataService.updateList({ data: result, method: DataMethod.Update });
        });
      } else {
        this.dataService
          .update(this.id.value, dataModel)
          .subscribe((result: DataModel) => {
            this.dataService.updateList({
              data: result,
              method: DataMethod.Update,
            });
          });
      }

      this.hideModal();
    }
  }

  deleteData(dataId: number): void {
    this.dataService.delete(dataId).subscribe(() => {
      const updateDataModel: UpdateDataModel = {
        data: new DataModel({ id: dataId }),
        method: DataMethod.Delete,
      };
      this.dataService.updateList(updateDataModel);
      this.hideModal();
    });
  }

  hideModal(): void {
    this.showModal = false;
  }

  dateForInput(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-CA');
  }

  get id(): AbstractControl {
    return this.dataForm.get('id');
  }

  get value(): AbstractControl {
    return this.dataForm.get('value');
  }

  get date(): AbstractControl {
    return this.dataForm.get('date');
  }

  get dataGroupId(): AbstractControl {
    return this.dataForm.get('dataGroupId');
  }

  get unit(): string {
    return this.dataGroups?.find(g => g.id === +this.dataGroupId?.value)?.unit;
  }
}
