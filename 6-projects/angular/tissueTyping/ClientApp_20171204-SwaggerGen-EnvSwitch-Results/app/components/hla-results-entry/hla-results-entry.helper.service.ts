import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HlaResultsEntryHelperService {

  constructor() {
  }

  getHLATypes: () => string[] = function () {
    let types: string[] = [];
    types.push('HLA-A', 'HLA-B', 'HLA-Bw', 'HLA-Cw', 'HLA-DR', 'HLA-DR51,52,53', 'HLA-DQ', 'HLA-DPB1');
    // types.push('HLA-Bw', 'HLA-B', 'HLA-A');   //manual test data
    return types;
  }


  //mapGridResults
  resultsGrid: any = (test: string, results: any, types: string[]) => {
    return this.mapToHlaType(this.extractResult(results, test), types)
  };

  extractResult: any = (data: any, test: string) => {
    let elem = _.find(data, ['test', test]);
    if (typeof elem == 'undefined') {
      return [];
    }
    else {
      return elem.results;
    }
  };

  mapToHlaType: any = (data: any, types: string[]) => {
    let orderedData: any = [];
    let nextElem: any;
    for (let type of types) {
      nextElem = _.find(data, {'hlaType':type});
      if (!nextElem) {
        nextElem = { "hlaType": type, "value1": "", "value2": "" }
      };
      orderedData.push(nextElem);
    }
    return orderedData;
  };


}

