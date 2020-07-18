import { DeckActions } from '../../enums/types';
import AsyncStorage from '@react-native-community/async-storage';
import ID from '../../utils/ID';
export const fetchDecks = (decks) => ({
  type: DeckActions.FetchDeck,
  decks,
});
export const addDeck = (deck) => ({
  type: DeckActions.AddDeck,
  deck,
});
export const editDeck = (deckName, deckId) => ({
  type: DeckActions.EditDeck,
  deckName,
  deckId,
});
export const deleteDeck = (deckId) => ({
  type: DeckActions.DeleteDeck,
  deckId,
});
export const addCard = (question, deckId) => ({
  type: DeckActions.AddCard,
  question,
  deckId,
});
export const editCard = (question, deckId) => ({
  type: DeckActions.EditCard,
  question,
  deckId,
});
export const deleteCard = (questionId, deckId) => ({
  type: DeckActions.DeleteCard,
  questionId,
  deckId,
});
var StorageKeys;
(function (StorageKeys) {
  StorageKeys['Deck'] = 'DECK';
})(StorageKeys || (StorageKeys = {}));
const saveStateToAsyncStorage = (state) => {
  AsyncStorage.setItem(StorageKeys.Deck, JSON.stringify(state.decks)).catch(
    (error) => {
      console.error('Error: ', error);
    }
  );
};
export const handleAddDeck = (deckName) => (dispatch, getState) => {
  const deck = {
    id: ID(),
    title: deckName,
    questions: {},
  };
  dispatch(addDeck(deck));
  saveStateToAsyncStorage(getState());
  return deck.id;
};
export const handleEditDeck = (deckName, deckId) => (dispatch, getState) => {
  dispatch(editDeck(deckName, deckId));
  saveStateToAsyncStorage(getState());
};
export const handleDeleteDeck = (deckId) => (dispatch, getState) => {
  dispatch(deleteDeck(deckId));
  saveStateToAsyncStorage(getState());
};
export const handleAddCard = (questionInput, deckId) => (
  dispatch,
  getState
) => {
  const question = {
    ...questionInput,
    id: ID(),
  };
  dispatch(addCard(question, deckId));
  saveStateToAsyncStorage(getState());
};
export const handleEditCard = (question, deckId) => (dispatch, getState) => {
  dispatch(editCard(question, deckId));
  saveStateToAsyncStorage(getState());
};
export const handleDeleteCard = (questionId, deckId) => (
  dispatch,
  getState
) => {
  dispatch(deleteCard(questionId, deckId));
  saveStateToAsyncStorage(getState());
};
export const handleFetchDecks = () => (dispatch) => {
  AsyncStorage.getItem(StorageKeys.Deck)
    .then((deckData) => {
      if (deckData !== null) {
        return JSON.parse(deckData);
      } else {
        return {};
      }
    })
    .then((decks) => {
      dispatch(fetchDecks(decks));
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};
