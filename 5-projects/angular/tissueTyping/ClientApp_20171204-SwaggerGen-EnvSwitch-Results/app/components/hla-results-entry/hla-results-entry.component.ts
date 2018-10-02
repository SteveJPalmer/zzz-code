import {Component, OnInit} from '@angular/core';
import any = jasmine.any;
import { indexOf, map } from 'lodash';

import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/observable';
import { IAppState } from '../../store/IAppState';
import { RequestedTestDto } from '../../services/requests/model/models';

import { HlaResultsEntryHelperService as HelperService} from './hla-results-entry.helper.service';
import { RequestResultsService } from '../../services/results/api/api';
import { RequestOrderablesService } from '../../services/orders/api/api';


@Component({
  selector: 'hla-results-entry',
  templateUrl: 'hla-results-entry.component.html',
  styleUrls: ['hla-results-entry.component.scss'],
  providers: [ HelperService,
               RequestResultsService,
               RequestOrderablesService
             ]
})

export class HlaResultsEntryComponent implements OnInit {

  PCRTest: boolean = true;
  DEFTest: boolean = false;
  CDCTest: boolean = false;

  request: any = [];
  tissueTypingResults: any = [];
  HLATypes: string[] = [];
  PCRResults: any = [];
  DEFResults: any = [];
  CDCResults: any = [];

  subscription: any;
  isSaved: boolean = false;
  isError: boolean = false;

  constructor(
    private helperService: HelperService,
    private requestResultsService: RequestResultsService,
    private requestOrderablesService: RequestOrderablesService,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>,) {}

  @select(['request','orderNumber']) readonly orderNumber$: Observable<string>;
  @select(['request','labNumber']) readonly labNumber$: Observable<string>;


  setTestFlags: any = () => {
    let testCodes = map(this.request.requestedTests, 'testCode');
    // console.log('>>setObservableFlags > testCodes: ' + testCodes);
    if (indexOf(testCodes, 'DEF') != -1) this.DEFTest = true;
    if (indexOf(testCodes, 'CDC') != -1) this.CDCTest = true;
  };



  addCytotoxic: any = () => {
    let tests: RequestedTestDto[] = [
      {
        "testCode": "CDC"
      }
    ];
    this.requestOrderablesService.apiOrdersByOrderNumberRequestsByLabNumberOrderablesPost(this.request.orderNumber, this.request.labNumber, tests)
      .subscribe(
        next => {
          this.CDCResults = this.helperService.resultsGrid('CDC', this.tissueTypingResults, this.HLATypes)
          this.CDCTest = true;
          // console.log('>>addCytotoxic TestService returned: next' + JSON.stringify(next, null, 2));
        },
        err => {
          this.isError = true;
        }
      );
  };


  saveResults: any = () => {
    let observations: any = [];
    observations.push({ "test": "PCR", "results": this.PCRResults});
    if (this.DEFTest) observations.push({ "test": "DEF", "results": this.DEFResults});
    if (this.CDCTest) observations.push({ "test": "CDC", "results": this.CDCResults});
    // console.log('>>saveResults >observations[]: ' + JSON.stringify(observations,undefined, 2) );
    // let results: any = {
    //   "labNumber": this.request.labNumber,
    //   "observations": observations
    // };
    // console.log('>>saveResults > payload: ' + JSON.stringify(results,undefined, 2) );
    this.requestResultsService.apiTissueTypingRequestsByLabNumberResultsPut(this.request.labNumber, observations)
      .subscribe(
        next => {
          this.isSaved = true;
          this._router.navigate(['/requestSearch']);
        },
        err => {
          this.isError = true;
        }
      );
  };


  //mock initial RESTFul service
  //getTissueTypingResultsMock: any = () => {
    // return [
    //   {
    //     "test": "PER",
    //     "results": [
    //       {
    //         "hlaType": "HLA-A",
    //         "value1": "A1",
    //         "value2": "A2"
    //       },
    //       {
    //         "hlaType": "HLA-B",
    //         "value1": "B1",
    //         "value2": "B2"
    //       }
    //     ]
    //   },
    //   {
    //     "test": "CDC",
    //     "results": [
    //       {
    //         "hlaType": "HLA-A",
    //         "value1": "C1",
    //         "value2": "C2"
    //       },
    //       {
    //         "hlaType": "HLA-B",
    //         "value1": "C11",
    //         "value2": "C12"
    //       }
    //     ]
    //   }
    // ]
  //};


  getTissueTypingResults: any = () => {
    this.requestResultsService.apiTissueTypingRequestsByLabNumberResultsGet(this.request.labNumber)
      .subscribe(
        next => {
          this.tissueTypingResults = next;
          this.PCRResults = this.helperService.resultsGrid('PCR', this.tissueTypingResults, this.HLATypes)
          if (this.DEFTest) {
            this.DEFResults = this.helperService.resultsGrid('DEF', this.tissueTypingResults, this.HLATypes)
          }
          if (this.CDCTest) {
            this.CDCResults = this.helperService.resultsGrid('CDC', this.tissueTypingResults, this.HLATypes)
          }
        },
        err => {
          this.tissueTypingResults = [];
        }
      );
  };


  ngOnInit() {
    this.ngRedux.select<string>('request')
      .subscribe(request => {
          this.request = request;
          this.setTestFlags();
      });

    this.HLATypes = this.helperService.getHLATypes();
    this.getTissueTypingResults();
  }
}

