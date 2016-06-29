/* beautify ignore:start */
import {Component, EventEmitter, Input, Output, OnChanges} from '@angular/core';
import {MapValuesPipe} from '../../pipes/map-values';
import {DeckService} from '../../services/deckService';
import {Deck, CardList, CardSelectEvent} from '../../services/deckService/types.d.ts';
/* beautify ignore:end */

@Component({
    pipes: [MapValuesPipe],
    providers: [DeckService],
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnChanges {
    @Input() deck: Deck;
    @Input() pickedCards: Deck;
    @Output('cardSelected') cardSelected = new EventEmitter<CardSelectEvent>();
    playableCards: CardList;
    previousCard: string = '0';
    currentCard: string = '0';

    constructor(public deckService: DeckService) {

    }

    ngOnChanges(changes) {
        console.log('ngOnChanges: pickedCards:', this.pickedCards);
        this.refreshPlayableCards();
    }

    onChange(cardText: string) {
        this.previousCard = this.currentCard;
        this.currentCard = cardText;

        this.cardSelected.emit({
            previousCard: this.previousCard,
            currentCard: cardText
        });
    }

    refreshPlayableCards() {
        this.playableCards = this.deckService.computePlayableCards(this.deck, this.pickedCards);
    }
}
