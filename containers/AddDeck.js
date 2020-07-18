import React, { useCallback, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from '../styles/styles';
import { Button, Input } from 'react-native-elements';
import { tealBlue } from '../styles/colors';
import { Routes } from '../enums/navigation';
import { StatusBar } from 'expo-status-bar';
import { handleAddDeck, handleEditDeck } from '../redux/actions/decks';
import { connect } from 'react-redux';
const AddDeck = ({
  isEdit,
  deckId,
  initialDeckName,
  navigation,
  addDeck,
  editDeck,
}) => {
  navigation.setOptions({
    title: isEdit ? 'Edit deck' : 'Add a new deck',
  });
  const [deckName, setDeckName] = useState(initialDeckName);
  const handleSubmit = useCallback(() => {
    if (isEdit && deckId) {
      editDeck(deckName, deckId);
      navigation.goBack();
    } else {
      const newDeckId = addDeck(deckName);
      navigation.navigate(Routes.MainStack, {
        screen: Routes.DeckView,
        params: { deckId: newDeckId },
      });
    }
  }, [deckName]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Deck name"
          leftIcon={{ name: 'book', color: tealBlue }}
          inputContainerStyle={styles.addDeckTextInputContainer}
          inputStyle={styles.addDeckTextInput}
          value={deckName}
          onChangeText={setDeckName}
          autoFocus={true}
        />
      </View>

      <View style={styles.bottomButtonContainer}>
        <Button
          title={isEdit ? 'Save' : 'Add Deck'}
          disabled={deckName.length === 0}
          buttonStyle={styles.tealBlueButton}
          containerStyle={styles.buttomButton}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
const mapState = (state, { route }) => {
  let initialDeckName = '';
  let isEdit = false;
  let deckId;
  if (route.params) {
    deckId = route.params.deckId;
    isEdit = route.params.isEdit;
    initialDeckName = state.decks[deckId].title;
  }
  return {
    initialDeckName,
    isEdit,
    deckId,
  };
};
const mapDispatch = (dispatch) => ({
  addDeck: (deckName) => {
    return dispatch(handleAddDeck(deckName));
  },
  editDeck: (deckName, deckId) => dispatch(handleEditDeck(deckName, deckId)),
});
const connector = connect(mapState, mapDispatch);
export default connector(AddDeck);
