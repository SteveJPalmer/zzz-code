import { Pipe, PipeTransform } from '@angular/core';
import { VCTRequestStatus } from 'app/models';

@Pipe({
  name: 'VctStatus'
})
export class VctStatusPipe implements PipeTransform {

  transform(value: number): string {
    let status = VCTRequestStatus[value];
    return status;
  }
}
