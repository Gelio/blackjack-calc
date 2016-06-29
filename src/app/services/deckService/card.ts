import {ICard} from './types.d.ts';

export class Card implements ICard {
    constructor(public value: number, public text: string) {

    }
}
