import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapToIterable'
})
export class MapToIterable implements PipeTransform {
    transform(value: {}, args: string[]): Array<any> {
        var a = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                a.push({ key: key, val: value[key] });
            }
        }
        return a;
    }
}
