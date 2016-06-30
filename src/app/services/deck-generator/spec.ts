/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {DeckGenerator} from './index';
/* beautify ignore:end */

describe('Service: DeckGenerator', () => {

    beforeEachProviders(() => [DeckGenerator]);

    it('should be defined', inject([DeckGenerator], (service: DeckGenerator) => {
        expect(service).toBeDefined();
    }));

});