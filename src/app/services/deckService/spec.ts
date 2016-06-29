/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {DeckService} from './index';
/* beautify ignore:end */

describe('Service: Deck', () => {

    beforeEachProviders(() => [DeckService]);

    it('should be defined', inject([DeckService], (service: DeckService) => {
        expect(service).toBeDefined();
    }));

});