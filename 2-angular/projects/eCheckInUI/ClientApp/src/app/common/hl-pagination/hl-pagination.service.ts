import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class HlPaginationService {

  constructor() { }

  getHeaderToken(resp: HttpResponse<any>): string {
    const headers: HttpHeaders  = resp.headers;
    let token = headers.get('ContinuationToken');
    return token;
  }

  getTokenIndex(pos: string, pageIndex: number): number {
    let index: number;
    if (pos === 'next') {
      index = pageIndex;
    } else if (pos === 'prev') {
      index = pageIndex - 2;
    } else {
      index = +pos - 1;
    }
    return index;
  }

  setPagingIndex(pos: string, pageIndex: number): number {
    let index: number;
    switch (pos) {
      case 'next':
        index = ++pageIndex;
        break;
      case 'prev':
        (--pageIndex <= 0) ? index = 1 : index = pageIndex;
        break;
      default:
        index = +pos;
    }
    return index;
  }

  manageTokenArray(pos: string, pageIndex: number, tokenArray: Array<string>, token: string): void {
    /* manage pagination token array (if 'next', last array item & end point not reached) */
    if (pos === 'next' && (pageIndex === tokenArray.length) ) {
      if (token) {
        tokenArray.push(token);
      } else {                // no further continuationTokens
        tokenArray.push('');
      }
    }
  }

}
