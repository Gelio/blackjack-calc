/* beautify ignore:start */
import { Component, Input, OnInit } from '@angular/core';
import * as Rx from 'rxjs';

import { Card, Deck } from '../../interfaces';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';
/* beautify ignore:end */

@Component({
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnInit {
    @Input() isDealer: boolean = false;
    changesSubscription: Rx.Subscription;
    currentCard: Card;
    previousCard: Card;
    selectableCards: Deck;

    constructor(public DeckGenerator: DeckGenerator, public Game: Game) {
        this.changesSubscription = Game.changes.subscribe(this.updateSelectableCards.bind(this));
        this.currentCard = Game.blankCard;
        this.previousCard = Game.blankCard;
    }

    ngOnInit() {
        this.updateSelectableCards();
    }

    updateSelectableCards() {
        // 1. Get stack
        // 3. Get dealerCard
        // 4. Subtract 3 from 1
        // 5. Add current card
        this.selectableCards = this.Game.stack.slice(0);

        // this.Game.playerCards.forEach((deckElement, index) => {
        //     // TODO: replace index with actually finding the card
        //     this.selectableCards[index].amount -= deckElement.amount;
        // });

        // let dealerCardIndex = _.findIndex(this.selectableCards, { card: this.Game.dealerCard });
        // if (dealerCardIndex !== -1) {
        //     this.selectableCards[dealerCardIndex]
        // }

        // Current option will not be grayed out
        if (this.currentCard !== this.Game.blankCard) {
            let currentCardIndex = this.DeckGenerator.getCardIndex(this.selectableCards, this.currentCard);

            this.selectableCards[currentCardIndex].amount++;
        }

        console.log('Updating selectable cards:', this.selectableCards);
    }

    newCardPicked(newCard: Card) {
        this.currentCard = newCard;
        console.log('New card picked', this.previousCard.symbol, this.currentCard.symbol);

        let previousCardInDeckIndex = this.DeckGenerator.getCardIndex(this.selectableCards, this.previousCard),
            currentCardInDeckIndex = this.DeckGenerator.getCardIndex(this.selectableCards, this.currentCard);

        // Process previous card
        if (this.previousCard !== this.Game.blankCard) {
            // TODO: search every deck for a card before updating its amount (not use one for each deck)
            // TODO: possibly make a Deck not an array, but an object with searching
            this.Game.stack[previousCardInDeckIndex].amount++;

            if (!this.isDealer) {
                this.Game.playerCards[previousCardInDeckIndex].amount--;
            }
        }

        // Process current card
        if (this.currentCard !== this.Game.blankCard) {
            this.Game.stack[currentCardInDeckIndex].amount--;

            if (!this.isDealer) {
                this.Game.playerCards[currentCardInDeckIndex].amount++;
            } else {
                this.Game.dealerCard = this.currentCard;
            }
        }

        this.previousCard = this.currentCard;
        // this.currentCard = event.target.value;

        // Broadcast changes
        this.Game.changes.next(1);
    }
}
