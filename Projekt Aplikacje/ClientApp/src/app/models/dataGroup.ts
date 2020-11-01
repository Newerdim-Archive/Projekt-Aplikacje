import { DataModel } from 'src/app/models/dataModel';

interface IDataGroup {
  id: number;
  name: string;
  unit: string;
  chartType: string;
  datas: DataModel[];
}

export class DataGroup implements IDataGroup {
  id: number;
  name: string;
  unit: string;
  chartType: string;
  datas: DataModel[];

  public constructor(init?: Partial<DataGroup>) {
    Object.assign(this, init);
  }
}
