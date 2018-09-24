import { OrderDto } from '../services/orders/model/models';
import { RequestDto } from '../services/requests/model/models';

export interface IAppState {
  order: OrderDto,
  request: RequestDto
}
