/* beautify ignore:start */
import {Component, EventEmitter, Input, Output, OnInit, OnChanges, DoCheck, KeyValueDiffers} from '@angular/core';
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
export class CardPickerComponent implements OnInit, OnChanges, DoCheck {
    @Input() deck: Deck;
    @Input() pickedCards: Deck;
    @Output() cardSelected = new EventEmitter<CardSelectEvent>();
    playableCards: CardList;
    previousCard: string = '0';
    currentCard: string = '0';

    differList: any;

    constructor(public deckService: DeckService, private differs: KeyValueDiffers) {

    }

    ngOnInit() {
        this.differList = []; 
    }

    ngOnChanges(changes) {
        console.log('ngOnChanges: pickedCards:', this.pickedCards);
        this.refreshPlayableCards();
    }

    ngDoCheck() {
        
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
