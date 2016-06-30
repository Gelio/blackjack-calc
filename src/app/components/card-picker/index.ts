/* beautify ignore:start */
import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { MapValuesPipe } from '../../pipes/map-values';
import { DeckService } from '../../services/deckService';
import { Deck, CardList, CardSelectEvent } from '../../services/deckService/types.d.ts';
/* beautify ignore:end */

@Component({
    pipes: [MapValuesPipe],
    providers: [DeckService],
    selector: 'card-picker',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardPickerComponent implements OnChanges, OnInit {
    @Input() deck: Deck;
    @Input() pickedCards: Deck;
    @Input() pickedCardsSubject: Rx.Subject<Deck>;
    @Output() cardSelected = new EventEmitter<CardSelectEvent>();
    playableCards: CardList;
    previousCard: string = '0';
    currentCard: string = '0';

    constructor(public deckService: DeckService) {

    }

    ngOnInit() {
        this.pickedCardsSubject.subscribe(newPickedCards => {
            this.refreshPlayableCards();
        });
    }

    ngOnChanges(changes) {
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
