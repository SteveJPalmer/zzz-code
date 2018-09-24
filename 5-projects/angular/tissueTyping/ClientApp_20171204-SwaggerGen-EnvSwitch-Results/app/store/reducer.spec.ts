/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { reducer } from './reducer';

import { IAppState } from './index';
import { OrderDto, } from '../services/orders/index';
import { RequestDto } from '../services/requests/index';

import { ADD_ORDER, RESET_ORDER } from '../components/order-search-panel/order-search.actions';
import { ADD_REQUEST, RESET_REQUEST } from '../components/request-search-panel/request-search.actions';


describe('Ng2-Redux store reducer', () => {

  const initialState: IAppState =
    {
      order: {},
      request: {}
    };


  describe('Ng2-Redux - test env', () => {
    it('true is true', () => expect(true).toBe(true));
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_ORDER', () => {
    let mockOrder: OrderDto = {
      "orderNumber": "701",
      "labNumber": "abc-def",
      "status": OrderDto.StatusEnum.Pending,
      "orderables": [
        {
          "testCode": "HLA1"
        }
      ]
    };

    expect(
      reducer(initialState, {
        type: ADD_ORDER,
        order: mockOrder
      })
    ).toEqual(
      {
        order: {
          "orderNumber": "701",
          "labNumber": "abc-def",
          "status": OrderDto.StatusEnum.Pending,
          "orderables": [
            {
              "testCode": "HLA1"
            }
          ]
        },
        request: {}
      }
    );
  });


  it('should handle RESET_ORDER', () => {
    expect(
      reducer(initialState, {
        type: RESET_ORDER
      })
    ).toEqual(initialState);
  });


  it('should handle ADD_REQUEST', () => {
    let mockRequest: RequestDto = {
      "labNumber": "aaa-bbb",
      "orderNumber": "111",
      "requestedTests": [
        {
          "testCode": "PCR"
        },
        {
          "testCode": "DEF"
        }
      ]
    };

    expect(
      reducer(initialState, {
        type: ADD_REQUEST,
        request: mockRequest
      })
    ).toEqual({
        order: {},
        request: {
          "labNumber": "aaa-bbb",
          "orderNumber": "111",
          "requestedTests": [
            {
              "testCode": "PCR"
            },
            {
              "testCode": "DEF"
            }
          ]
        }
      }
    );
  });


  it('should handle RESET_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: RESET_REQUEST
      })
    ).toEqual(initialState);
  });

});



