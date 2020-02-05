import { Pipe, PipeTransform } from '@angular/core';
import { RejectReason } from 'app/models';

@Pipe({
  name: 'RejectReason'
})
export class RejectReasonPipe implements PipeTransform {

  transform(value: number): string {
    let status = RejectReason[value];
    return status;
  }
}
