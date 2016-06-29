/* beautify ignore:start */
import {Component, Input, OnInit} from '@angular/core';
import {MapValuesPipe} from '../../pipes/map-values';
import {Deck} from '../../services/deckService/types.d.ts';
/* beautify ignore:end */

@Component({
    pipes: [MapValuesPipe],
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnInit {
    @Input() deck: Deck;

    constructor() {
        console.log(this.deck);
    }

    ngOnInit() {
        console.log(this.deck);
    }
}
