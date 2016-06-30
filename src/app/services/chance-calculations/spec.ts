/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {ChanceCalculations} from './index';
/* beautify ignore:end */

describe('Service: ChanceCalculations', () => {

    beforeEachProviders(() => [ChanceCalculations]);

    it('should be defined', inject([ChanceCalculations], (service: ChanceCalculations) => {
        expect(service).toBeDefined();
    }));

});