export * from './orderables.service';
import { OrderablesService } from './orderables.service';
export * from './orders.service';
import { OrdersService } from './orders.service';
export * from './requestOrderables.service';
import { RequestOrderablesService } from './requestOrderables.service';
export const APIS = [OrderablesService, OrdersService, RequestOrderablesService];
