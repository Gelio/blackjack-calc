/* beautify ignore:start */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Deck } from '../../interfaces';
/* beautify ignore:end */

@Injectable()
export class ChanceCalculations {
    /**
     * Computes all possible combinations of deck's card strengths
     */
    computeStrengths(deck: Deck): Array<number> {
        let cardsToCount = _.filter(deck, deckElement => (deckElement.amount > 0));

        // make an array of all possible strength combinations
        let totalStrengths = [0];
        cardsToCount.forEach(deckElement => {
            for (let i = 1; i <= deckElement.amount; i++) {
                let nextStrengths = [];
                deckElement.card.strengths.forEach(cardStrength => {
                    totalStrengths.forEach(previousStrength => {
                        nextStrengths.push(previousStrength + cardStrength);
                    });
                });
                totalStrengths = _.uniq(nextStrengths);
            }
        });

        return _.sortBy(totalStrengths);
    }
}