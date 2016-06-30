/* beautify ignore:start */
import { Injectable } from '@angular/core';

import { Card, Deck } from '../../interfaces/';
/* beautify ignore:end */

@Injectable()
export class DeckGenerator {
    /**
     * Returns the card's strength based on it's symbol
     * @param   symbol  Symbol of the card
     * @returns         Array of possible card's strength values
     */
    getSymbolStrengths(symbol: string): Array<number> {
        let strengths: Array<number>;
        const parsedSymbol = parseInt(symbol);

        if (parsedSymbol >= 2 && parsedSymbol <= 10) {
            strengths = [parsedSymbol];
        } else {
            switch (symbol) {
                case 'J':
                case 'Q':
                case 'K':
                    strengths = [10];
                    break;

                case 'A':
                    strengths = [1, 11];
                    break;
            }
        }

        return strengths;
    }

    /**
     * Generates the Card objects from a given list of symbols
     * @param   list    Array of symbols to construct the Card list from
     * @returns         Array of generated Card objects
     */
    generateCardTypes(list: Array<string>): Array<Card> {
        return list.map(symbol => {
             return {
                 symbol: symbol,
                 strengths: this.getSymbolStrengths(symbol)
             };
        });
    }

    /**
     * Generates the deck given card types and the amount of the instances of each card in the deck
     * @param   cardTypes   Card types to put in the deck
     * @param   amount      The number of instances of each card in the deck 
     */
    generateDeck(cardTypes: Array<Card>, amount: number): Deck {
        return cardTypes.map(card => {
            return {
                card: card,
                amount: amount
            };
        });
    }
}
