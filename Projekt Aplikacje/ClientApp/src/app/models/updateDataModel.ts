import { DataModel } from './dataModel';

export interface UpdateDataModel {
  method: DataMethod;
  data: DataModel;
}

export enum DataMethod {
  Add,
  Update,
  Delete,
}
