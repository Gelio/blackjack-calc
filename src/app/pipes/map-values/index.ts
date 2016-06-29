/* beautify ignore:start */
import {Pipe, PipeTransform} from '@angular/core';
/* beautify ignore:end */

@Pipe({
    name: 'mapValues'
})
export class MapValuesPipe implements PipeTransform {
    transform(value: any,  args? : string[]): Object[] {
        let returnArray = [];

        value.forEach((entryVal, entryKey) => {
            returnArray.push({
                key: entryKey,
                val: entryVal
            });
        });

        return returnArray;
    }
}
