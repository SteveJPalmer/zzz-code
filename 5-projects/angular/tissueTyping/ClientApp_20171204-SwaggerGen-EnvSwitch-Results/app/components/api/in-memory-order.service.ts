import { InMemoryDbService, createErrorResponse, HttpMethodInterceptorArgs, createObservableResponse } from 'angular-in-memory-web-api';

export class InMemoryOrderService implements InMemoryDbService {

  /**
  * Creates fresh copy of data each time.
  * Safe for consuming service to morph arrays and objects.
  */
  createDb() {
    let orders: any = [
      {
        "orderNumber": "501",
        "orderables": [
          {
            "testCode": "code1"
          }
        ]
      },
      {
        "orderNumber": "502",
        "orderables": [
          {
             "testCode": "code2"
          }
        ]
      }
    ];

    let acceptOrder: any = [
      {
        "id": "501",
        "accepted": "true"
      }
    ];


    let Requests: any = [
      {
        "labNumber": "abc",
        "orderNumber": "123",
        "requestedTests": [
          {
            "testCode": "PCR"
          },
          {
            "testCode": "DEF"
          }
        ]
      },
      {
        "labNumber": "xzy",
        "orderNumber": "999",
        "requestedTests": [
          {
            "testCode": "PCR"
          },
          {
            "testCode": "DEF"
          }
        ]
      }
    ];

    const db = { orders, acceptOrder, Requests };
    return db;
  }

}