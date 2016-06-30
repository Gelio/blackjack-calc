/* beautify ignore:start */
import { Component } from '@angular/core';

import { ChanceCalculations } from '../../services/chance-calculations';
import { DeckGenerator } from '../../services/deck-generator';
import { Game } from '../../services/game';
/* beautify ignore:end */

@Component({
    selector: 'card-chance-statistics',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class CardChanceStatisticsComponent {
    constructor(public ChanceCalculations: ChanceCalculations, public DeckGenerator: DeckGenerator, public Game: Game) {

    }
}
