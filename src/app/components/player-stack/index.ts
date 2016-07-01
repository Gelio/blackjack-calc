/* beautify ignore:start */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { CardPickerComponent } from '../card-picker';
/* beautify ignore:end */

@Component({
    selector: 'player-stack',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class PlayerStackComponent implements OnInit {
    @ViewChildren(CardPickerComponent) cardPickerComponents: QueryList<CardPickerComponent>;
    cardPickers: number[];  // the length of this array determines how many select inputs are to be displayed

    constructor() {

    }

    ngOnInit() {
        this.cardPickers = [1, 1];
    }
}