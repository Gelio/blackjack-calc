/* beautify ignore:start */
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs';
import * as _ from 'lodash';

import { ChanceCalculations } from '../../services/chance-calculations';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';
/* beautify ignore:end */

@Component({
    selector: 'card-chance-statistics',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardChanceStatisticsComponent implements OnInit, OnDestroy {
    playerCardsStrengths: Array<number>;
    strengthPercentageValues: Array<number>;
    changeSubscription: Rx.Subscription;
    totalChance: number;

    constructor(public ChanceCalculations: ChanceCalculations, public DeckGenerator: DeckGenerator, public Game: Game) {
        this.changeSubscription = Game.changeObservable.subscribe(this.refresh.bind(this));
    }

    refresh() {
        this.playerCardsStrengths = this.ChanceCalculations.computeStrengths(this.Game.playerCards);
        this.strengthPercentageValues = this.playerCardsStrengths.map(strength => this.ChanceCalculations.computeStrengthPercentageValue(strength, this.Game.stack));

        this.totalChance = _.sum(this.strengthPercentageValues) / _.compact(this.strengthPercentageValues).length;
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnDestroy() {
        this.changeSubscription.unsubscribe();
    }
}
