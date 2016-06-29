/* beautify ignore:start */
import {Injectable} from '@angular/core';
import 'lodash';
import {CardList, Deck} from './types.d.ts';
import {Card} from './card';
/* beautify ignore:end */

@Injectable()
export class DeckService {
    /**
     * Generates all the card types and stores it in an internal map
     * @returns A generated card types map
     */
    generateCardTypes(): CardList {
        const cardTypes = new Map<string, Card>();

        // Regular 'number' cards
        for (let i = 2; i <= 10; i++) {
            let card = new Card(i, i.toString());
            cardTypes.set(i.toString(), card);
        }

        // Court (face cards)
        let court = ['J', 'Q', 'K', 'A'];
        court.forEach(cardLetter => {
            let card = new Card(10, cardLetter);
            cardTypes.set(cardLetter, card);
        });

        return cardTypes;
    }

    /**
     * Generates the whole deck from already generated card types
     * @param cardTypes A map of card types to generate a deck from
     * @param amount    How many times each card will be put into the deck
     * @returns         A deck generated from provided card types
     */
    generateDeck(cardTypes: CardList, amount: number = 1): Deck {
        const deck: Deck = [];

        if (cardTypes.size === 0) {
            throw new Error('There must be at least one card type to generate the deck');
        }

        // 4 of each card type
        cardTypes.forEach(card => {
            deck.push({
                card: card,
                amount: amount
            });
        });

        return deck;
    }

    /**
     * Counts which cards are playable
     * @param deck          The list of all possible cards along with their amount
     * @param pickedCards   The list of picked cards along with their amount
     * @returns             A list of cards that can be played
     */
    computePlayableCards(deck: Deck, pickedCards: Deck): CardList {
        let playableCards = new Map<string, Card>();

        deck.forEach(deckElement => {
            let {card, amount: total} = deckElement;
            let pickedAmount = _.find(pickedCards, { card: card }).amount;
            let leftoverAmount = total - pickedAmount;

            if (leftoverAmount > 0) {
                playableCards.set(card.text, card);
            }
        });

        return playableCards;
    }
}
