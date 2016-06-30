/* beautify ignore:start */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { BLACKJACK, Deck } from '../../interfaces';
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

    /**
     * Computes how worth is it for a given strength to draw a card
     * @param   strength    Strength to compute chance for
     * @param   deck        The deck from which the next card is going to be drawn
     */
    computeStrengthPercentageValue(strength: number, deck: Deck): number {
        if (strength > BLACKJACK) {
            return 0;
        }

        if (deck.length === 0) {
            return 0;
        }

        const maxPossibleDraw = BLACKJACK - strength;
        let goodDraws = 0,
            totalDraws = 0;

        deck.forEach(deckElement => {
            const minStrength = _.min(deckElement.card.strengths);

            if (strength + minStrength <= BLACKJACK) {
                goodDraws += deckElement.amount;
            }
            totalDraws += deckElement.amount;
        });

        return goodDraws / totalDraws;
    }
}
