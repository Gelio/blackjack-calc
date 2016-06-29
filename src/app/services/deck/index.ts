/* beautify ignore:start */
import {Injectable} from '@angular/core';
import {Card} from './card';
/* beautify ignore:end */

@Injectable()
export class Deck {
    cardTypes: Map<string, Card>;   // lists available card types referring to them with their name
    deck: Map<Card, number>;    // the number is the amount of that card left in the deck

    constructor() {
        // Generate card types
        this.generateCardTypes();
        this.generateDeck();
    }

    generateCardTypes() {
        this.cardTypes = new Map<string, Card>();

        // Regular 'number' cards
        for (let i = 2; i <= 10; i++) {
            let card = new Card(i, i.toString());
            this.cardTypes.set(i.toString(), card);
        }

        // Court (face cards)
        let court = ['J', 'Q', 'K', 'A'];
        court.forEach(cardLetter => {
            let card = new Card(10, cardLetter);
            this.cardTypes.set(cardLetter, card);
        });
    }

    generateDeck() {
        if (this.cardTypes.size === 0) {
            throw new Error('Card types have to be generated before generating the deck');
        }

        this.deck = new Map<Card, number>();

        // 4 of each card type
        this.cardTypes.forEach(card => {
            this.deck.set(card, 4);
        });
    }
}
