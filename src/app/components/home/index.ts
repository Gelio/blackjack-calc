import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
// import * as Rx from 'rxjs';
// import * as _ from 'lodash';

import { CardPickerComponent } from '../card-picker';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';

@Component({
    selector: 'home',
    directives: [...FORM_DIRECTIVES, CardPickerComponent],
    providers: [DeckGenerator, Game],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html')
})

export class Home implements OnInit {
    @ViewChildren(CardPickerComponent) cardPickerComponents: QueryList<CardPickerComponent>;
    cardPickers: number[];  // the length of this array determines how many select inputs are to be displayed

    constructor(public DeckGenerator: DeckGenerator, public Game: Game) {

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
