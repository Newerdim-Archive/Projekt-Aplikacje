import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DataGroup } from 'src/app/models/dataGroup';

@Injectable({
  providedIn: 'root',
})
export class DataGroupService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<DataGroup[]> {
    return this.http.get<DataGroup[]>(environment.apiUrl + '/datagroup');
  }

  getById(id: number, howManyData: number): Observable<DataGroup> {
    return this.http.get<DataGroup>(
      environment.apiUrl + `/datagroup/${id}/${howManyData ?? ''}`
    );
  }

  getByName(name: string, howManyData?: number): Observable<DataGroup> {
    return this.http.get<DataGroup>(
      environment.apiUrl + `/datagroup/${name}/${howManyData ?? ''}`
    );
  }
}
