import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Deck} from '../../services/deck';

import {CardPickerComponent} from '../card-picker';

@Component({
    selector: 'home',
    directives: [...FORM_DIRECTIVES, CardPickerComponent],
    providers: [Deck],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html')
})

export class Home {
    constructor(public deck: Deck) {

    }

    newGame() {
        this.deck.generateDeck();
    }
}
