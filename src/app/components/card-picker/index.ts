/* beautify ignore:start */
import {Component, Input, OnInit} from '@angular/core';
import {Deck as DeckType} from '../../services/deckService/types.d.ts';
/* beautify ignore:end */

@Component({
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnInit {
    @Input() deck: DeckType;

    ngOnInit() {
        console.log(this.deck);
    }
}
