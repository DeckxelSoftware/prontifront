import {DataTabsArrayEnum} from '../enum/data-tabs-array.enum';

export interface DataTableArray {
  fieldName: string;
  showingName: string;
  type: DataTabsArrayEnum;
  prefix?: string;
  suffix?: string;
}
