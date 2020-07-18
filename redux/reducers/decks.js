import { DeckActions } from '../../enums/types';
import produce from 'immer';
const decks = (state = {}, action) => {
  switch (action.type) {
    case DeckActions.FetchDeck:
      return action.decks;
    case DeckActions.AddDeck:
      const { deck } = action;
      return produce(state, (draft) => {
        draft[deck.id] = deck;
      });
    case DeckActions.EditDeck:
      return produce(state, (draft) => {
        draft[action.deckId].title = action.deckName;
      });
    case DeckActions.DeleteDeck:
      return produce(state, (draft) => {
        delete draft[action.deckId];
      });
    case DeckActions.AddCard:
      const { deckId, question: questionToBeAdded } = action;
      return produce(state, (draft) => {
        draft[deckId].questions[questionToBeAdded.id] = questionToBeAdded;
      });
    case DeckActions.EditCard:
      const { deckId: deckIdToBeEdited, question: questionToBeEdited } = action;
      return produce(state, (draft) => {
        draft[deckIdToBeEdited].questions[
          questionToBeEdited.id
        ] = questionToBeEdited;
      });
    case DeckActions.DeleteCard:
      const { deckId: deckIdToBeDeleted, questionId } = action;
      return produce(state, (draft) => {
        delete draft[deckIdToBeDeleted].questions[questionId];
      });
    default:
      return state;
  }
};
export default decks;
