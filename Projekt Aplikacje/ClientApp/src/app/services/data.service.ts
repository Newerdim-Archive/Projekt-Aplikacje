import { UpdateDataModel } from './../models/updateDataModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataModel } from '../models/dataModel';
import { DataFormModel } from '../models/dataFormModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private showModal: BehaviorSubject<DataFormModel> = new BehaviorSubject<
    DataFormModel
  >(undefined);
  private updateDataList: BehaviorSubject<
    UpdateDataModel
  > = new BehaviorSubject<UpdateDataModel>(null);
  private closeModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {}

  getAll(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>(environment.apiUrl + '/data');
  }

  getById(id: string): Observable<DataModel> {
    return this.http.get<DataModel>(environment.apiUrl + `/data/${id}`);
  }

  add(data: DataModel): Observable<DataModel> {
    return this.http.post<DataModel>(environment.apiUrl + '/data', data);
  }

  update(dataId: number, data: DataModel): Observable<DataModel> {
    return this.http.put<DataModel>(
      environment.apiUrl + `/data/${dataId}`,
      data
    );
  }

  delete(dataId: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `/data/${dataId}`);
  }

  refreshDataListener(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  refreshData(): void {
    this.refresh.next(true);
  }

  updateListListener(): Observable<any> {
    return this.updateDataList.asObservable();
  }

  updateList(updateData: UpdateDataModel): void {
    this.updateDataList.next(updateData);
  }

  showFormModal(dataFormModel: DataFormModel): void {
    this.showModal.next(dataFormModel);
  }

  showModalListener(): Observable<DataFormModel> {
    return this.showModal.asObservable();
  }

  closeFormModal(): void {
    this.closeModal.next(true);
  }

  closeModalListener(): Observable<boolean> {
    return this.closeModal.asObservable();
  }
}
