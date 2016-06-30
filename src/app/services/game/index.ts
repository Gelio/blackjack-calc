/* beautify ignore:start */
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

import { Card, Deck } from '../../interfaces';
import { DeckGenerator } from '../deck-generator';
/* beautify ignore:end */

@Injectable()
export class Game {
    blankCard: Card = { symbol: '-', strengths: [0] };
    cardSymbols: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    cardTypes: Array<Card>;
    changes: Rx.Subject<number>;
    currentStrengths: Array<number>;
    dealerCard: Card;
    playerCards: Deck;
    stack: Deck;

    constructor(public DeckGenerator: DeckGenerator) {
        this.cardTypes = DeckGenerator.generateCardTypes(this.cardSymbols);
        this.changes = new Rx.Subject<number>();
        this.restart();
    }

    restart() {
        this.dealerCard = this.blankCard;
        this.playerCards = this.DeckGenerator.generateDeck(this.cardTypes, 0);
        this.stack = this.DeckGenerator.generateDeck(this.cardTypes, 4);
        this.currentStrengths = [0];
    }
}
