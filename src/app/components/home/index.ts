import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {CardList, Deck, CardSelectEvent} from '../../services/deckService/types.d.ts';

import {DeckService} from '../../services/deckService';

import {CardPickerComponent} from '../card-picker';

@Component({
    selector: 'home',
    directives: [...FORM_DIRECTIVES, CardPickerComponent],
    providers: [DeckService],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html')
})

export class Home {
    cardTypes: CardList;
    deck: Deck;
    pickedCards: Deck;

    constructor(public deckService: DeckService) {
        this.cardTypes = this.deckService.generateCardTypes();
        this.newGame();
    }

    newGame() {
        this.deck = this.deckService.generateDeck(this.cardTypes);
        this.pickedCards = this.deckService.generateDeck(this.cardTypes, 0);
    }

    cardSelected(event: CardSelectEvent) {
        let previousCard = this.cardTypes.get(event.previousCard),
            previousCardAmount = this.pickedCards.get(previousCard),
            currentCard = this.cardTypes.get(event.currentCard),
            currentCardAmount = this.pickedCards.get(currentCard);

        this.pickedCards.set(previousCard, previousCardAmount + 1);
        this.pickedCards.set(currentCard, currentCardAmount - 1);
    }
}
