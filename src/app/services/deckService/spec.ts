/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {Deck} from './index';
/* beautify ignore:end */

describe('Service: Deck', () => {

    beforeEachProviders(() => [Deck]);

    it('should be defined', inject([Deck], (service: Deck) => {
        expect(service).toBeDefined();
    }));

});