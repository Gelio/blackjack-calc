/* beautify ignore:start */
import {it} from '@angular/core/testing';
import {MapValuesPipe} from './index';
/* beautify ignore:end */

describe('Pipe: MapValuesPipePipe', () => {
    let pipe: MapValuesPipe;

    beforeEach(() => {
        pipe = new MapValuesPipe();
    });

    it('should be defined', () => {
        expect(pipe).toBeDefined();
    });

    it('transforms abc to abc', () => {
        expect(pipe.transform('abc')).toEqual('abc');
    });

});