/* beautify ignore:start */
import { Injectable } from '@angular/core';

import { Card, Deck } from '../../interfaces';
import { DeckGenerator } from '../deck-generator';
/* beautify ignore:end */

@Injectable()
export class Game {
    blankCard: Card = { symbol: '-', strengths: [0] };
    cardSymbols: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    cardTypes: Array<Card>;
    currentStrengths: Array<number>;
    dealerCard: Card;
    playerCards: Deck;
    stack: Deck;
    totalAmount: number;

    constructor(public DeckGenerator: DeckGenerator) {
        this.cardTypes = DeckGenerator.generateCardTypes(this.cardSymbols);
        this.restart();
    }

    restart() {
        let eachCardAmount = 4;

        this.currentStrengths = [0];
        this.dealerCard = this.blankCard;
        this.playerCards = this.DeckGenerator.generateDeck(this.cardTypes, 0);
        this.stack = this.DeckGenerator.generateDeck(this.cardTypes, eachCardAmount);
        this.totalAmount = this.cardTypes.length * eachCardAmount;
    }
}
