export interface IDataModel {
  id: number;
  value: number;
  date: Date;
  dataGroupId: number;
}

export class DataModel implements IDataModel {
  id: number;
  value: number;
  date: Date;
  dataGroupId: number;

  public constructor(init?: Partial<DataModel>) {
    Object.assign(this, init);
  }
}
