import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { CardChanceStatisticsComponent } from '../card-chance-statistics';
import { CardPickerComponent } from '../card-picker';
import { ChanceCalculations } from '../../services/chance-calculations';
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

    constructor(public ChanceCalculations: ChanceCalculations, public DeckGenerator: DeckGenerator, public Game: Game) {

    }

    ngOnInit() {
        this.newGame();
    }

    newGame() {
        this.cardPickers = [1, 1];
        this.Game.restart();
    }

    insertCardPicker() {
        this.cardPickers.push(1);
    }

    resetCardPickers() {
        this.cardPickerComponents.toArray().forEach(cardPicker => {
            cardPicker.reset();
        });
    }
}
