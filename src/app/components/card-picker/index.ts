/* beautify ignore:start */
import {Component, EventEmitter, Input, Output, OnInit, OnChanges} from '@angular/core';
import {MapValuesPipe} from '../../pipes/map-values';
import {DeckService} from '../../services/deckService';
import {Deck, CardList} from '../../services/deckService/types.d.ts';
import {Card} from '../../services/deckService/card';
/* beautify ignore:end */

@Component({
    pipes: [MapValuesPipe],
    providers: [DeckService],
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnInit, OnChanges {
    @Input() deck: Deck;
    @Input() pickedCards: Deck;
    @Output() changed = new EventEmitter();
    playableCards: CardList;
    selectedCard: Card;

    constructor(public deckService: DeckService) {

    }

    ngOnInit() {
        console.log('Whole deck:', this.deck);
        console.log('Picked cards', this.pickedCards);
        
        this.playableCards = this.deckService.computePlayableCards(this.deck, this.pickedCards);
    }

    ngOnChanges(changes) {
        
    }

    onChange(cardText: string) {
        console.log('Picked card', cardText);
    }
}
