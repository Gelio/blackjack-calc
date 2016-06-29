// Basic card type
export interface ICard {
    value: number;
    text: string;
}

export type CardList = Map<string, ICard>;
export type Deck = Map<ICard, number>;

export type CardSelectEvent = { previousCard: string, currentCard: string };
