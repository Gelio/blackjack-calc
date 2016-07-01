/* beautify ignore:start */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs';
import * as _ from 'lodash';

import { ChanceCalculations } from '../../services/chance-calculations';
import { Deck } from '../../interfaces';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';
/* beautify ignore:end */

@Component({
    selector: 'card-chance-statistics',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardChanceStatisticsComponent implements OnInit, OnDestroy {
    @Input('deck') currentDeck: Deck;
    playerCardsStrengths: Array<number>;
    strengthPercentageValues: Array<number>;
    changeSubscription: Rx.Subscription;
    totalChance: number;

    constructor(public ChanceCalculations: ChanceCalculations, public DeckGenerator: DeckGenerator, public Game: Game) {
        this.changeSubscription = Game.changeObservable.subscribe(this.refresh.bind(this));
    }

    refresh() {
        this.playerCardsStrengths = this.ChanceCalculations.computeStrengths(this.currentDeck);
        this.strengthPercentageValues = this.playerCardsStrengths.map(strength => this.ChanceCalculations.computeStrengthPercentageValue(strength, this.Game.stack));

        let nonZeroChances = _.compact(this.strengthPercentageValues).length;
        if (nonZeroChances !== 0) {
            this.totalChance = _.sum(this.strengthPercentageValues) / nonZeroChances;
        } else {
            this.totalChance = 0;
        }
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnDestroy() {
        this.changeSubscription.unsubscribe();
    }
}
