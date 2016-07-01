/* beautify ignore:start */
import { Component, Input } from '@angular/core';

import { Card, Deck } from '../../interfaces';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';
/* beautify ignore:end */

@Component({
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent {
    @Input('deck') currentDeck: Deck;
    @Input() isDealer: boolean = false;
    currentCard: Card;
    previousCard: Card;
    selectableCards: Deck;

    constructor(public DeckGenerator: DeckGenerator, public Game: Game) {
        this.reset();
    }

    reset() {
        this.currentCard = this.Game.blankCard;
        this.previousCard = this.Game.blankCard;
    }

    newCardPicked(newCard: Card) {
        this.previousCard = this.currentCard;
        this.currentCard = newCard;

        let previousCardInDeckIndex = this.DeckGenerator.getCardIndex(this.Game.stack, this.previousCard),
            currentCardInDeckIndex = this.DeckGenerator.getCardIndex(this.Game.stack, this.currentCard);

        // Process previous card
        if (this.previousCard !== this.Game.blankCard) {
            // TODO: search every deck for a card before updating its amount (not use one for each deck)
            // TODO: possibly make a Deck not an array, but an object with searching
            this.Game.stack[previousCardInDeckIndex].amount++;
            this.Game.totalAmount++;

            if (!this.isDealer) {
                this.currentDeck[previousCardInDeckIndex].amount--;
            }
        }

        // Process current card
        if (newCard !== this.Game.blankCard) {
            this.Game.stack[currentCardInDeckIndex].amount--;
            this.Game.totalAmount--;

            if (!this.isDealer) {
                this.currentDeck[currentCardInDeckIndex].amount++;
            } else {
                this.Game.dealerCard = newCard;
            }
        }

        // Emit changes
        this.Game.changeObservable.next(1);
    }
}
