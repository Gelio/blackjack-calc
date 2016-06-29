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
        if (event.previousCard !== '0') {
            let previousCard = this.cardTypes.get(event.previousCard),
                previousCardIndex = _.findIndex(this.pickedCards, { card: previousCard });
            this.pickedCards[previousCardIndex].amount--;
        }
        if (event.currentCard !== '0') {
            let currentCard = this.cardTypes.get(event.currentCard),
                currentCardIndex = _.findIndex(this.pickedCards, { card: currentCard });
            this.pickedCards[currentCardIndex].amount++;
        }

        console.log(this.pickedCards);
    }
}
