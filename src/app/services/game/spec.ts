/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {Game} from './index';
/* beautify ignore:end */

describe('Service: Game', () => {

    beforeEachProviders(() => [Game]);

    it('should be defined', inject([Game], (service: Game) => {
        expect(service).toBeDefined();
    }));

});