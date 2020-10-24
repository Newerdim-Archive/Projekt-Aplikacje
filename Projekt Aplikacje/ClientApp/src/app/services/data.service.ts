import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataModel } from '../models/dataModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private openModal: BehaviorSubject<DataModel> = new BehaviorSubject<
    DataModel
  >(null);
  private updateDataList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getAll(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>(environment.apiUrl + '/data');
  }

  getById(id: string): Observable<DataModel> {
    return this.http.get<DataModel>(environment.apiUrl + `/data/${id}`);
  }

  add(data: DataModel): Observable<DataModel> {
    return this.http.post<DataModel>(environment.apiUrl + 'data', data);
  }

  update(dataId: number, data: DataModel): Observable<DataModel> {
    return this.http.put<DataModel>(
      environment.apiUrl + `data/${dataId}`,
      data
    );
  }

  delete(dataId: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `data/${dataId}`);
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

  updateList(data: DataModel, method: DataMethod): void {
    this.updateDataList.next({data, method});
  }

  openFormModal(data: DataModel): void {
    this.openModal.next(data);
  }

  openModalListener(): Observable<DataModel> {
    return this.openModal.asObservable();
  }
}

export enum DataMethod {
  Add,
  Update,
  Delete,
}
