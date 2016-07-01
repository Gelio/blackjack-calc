import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { CardChanceStatisticsComponent } from '../card-chance-statistics';
import { CardPickerComponent } from '../card-picker';
import { ChanceCalculations } from '../../services/chance-calculations';
import { Deck } from '../../interfaces';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';

@Component({
    selector: 'home',
    directives: [...FORM_DIRECTIVES, CardChanceStatisticsComponent, CardPickerComponent],
    providers: [ChanceCalculations, DeckGenerator, Game],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html')
})

export class Home implements OnInit {
    @ViewChildren(CardPickerComponent) cardPickerComponents: QueryList<CardPickerComponent>;
    cardPickers: number[];  // the length of this array determines how many select inputs are to be displayed
    cardPickersSplit: number[]; // this one regards the second (split) stack
    currentDeck: Deck;

    constructor(public ChanceCalculations: ChanceCalculations, public DeckGenerator: DeckGenerator, public Game: Game) {

    }

    ngOnInit() {
        this.newGame();
    }

    newGame() {
        this.cardPickers = [1, 1];
        this.cardPickersSplit = [1, 1];
        this.Game.restart();
        this.currentDeck = this.Game.playerCards;
    }

    insertCardPicker(which: number) {
        if (which === 1) {
            this.cardPickers.push(1);
        } else {
            this.cardPickersSplit.push(1);
        }
    }

    resetCardPickers() {
        this.cardPickerComponents.toArray().forEach(cardPicker => {
            cardPicker.reset();
        });
        this.currentDeck = this.Game.playerCards;
    }

    switchDeck(event, which: number) {
        if (which === 1) {
            this.currentDeck = this.Game.playerCards;
        } else {
            this.currentDeck = this.Game.playerCards2;
        }

        event.preventDefault();
    }
}
