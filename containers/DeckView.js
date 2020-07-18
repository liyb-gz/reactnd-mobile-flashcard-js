import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles/styles';
import { Routes } from '../enums/navigation';
import QuestionItem from '../components/QuestionItem';
import { bottomButtonContainer } from '../styles/buttons';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { handleDeleteCard } from '../redux/actions/decks';
const DeckView = ({ navigation, questions, title, deckId, deleteCard }) => {
  useEffect(() => {
    const numOfQuestions = Object.keys(questions).length;
    navigation.setOptions({
      title: `${title} (${numOfQuestions} card${
        numOfQuestions > 1 ? 's' : ''
      })`,
    });
  }, [questions]);
  return (
    <SafeAreaView style={styles.listContainer}>
      <StatusBar style="light" />
      <SwipeListView
        data={Object.keys(questions)}
        keyExtractor={(questionId) => questionId}
        renderItem={({ item: questionId }) => (
          <QuestionItem
            question={questions[questionId]}
            style={styles.listRowFront}
            onPress={() => {
              navigation.navigate(Routes.AddCard, {
                isEdit: true,
                deckId,
                questionId,
              });
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.listEmpty}>
            <Text style={styles.listEmptyText}>Add a card to get started</Text>
          </View>
        )}
        renderHiddenItem={({ item: questionId }) => (
          <View style={styles.listRowBack}>
            <TouchableOpacity
              style={[styles.listBackRightBtn]}
              onPress={() => {
                console.log('delete card params:', questionId, deckId);
                deleteCard(questionId, deckId);
              }}
            >
              <Text style={styles.listBackTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe={true}
        rightOpenValue={-100}
        stopRightSwipe={-150}
        useNativeDriver={true}
      />
      <View style={bottomButtonContainer}>
        <Button
          title="Start Quiz"
          disabled={Object.keys(questions).length === 0}
          buttonStyle={styles.tealBlueButton}
          containerStyle={styles.buttomButton}
          onPress={() => {
            navigation.navigate(Routes.Quiz, { deckId });
          }}
        />
        <Button
          title="Add Card"
          buttonStyle={styles.tealBlueButton}
          containerStyle={styles.buttomButton}
          onPress={() => {
            navigation.navigate(Routes.AddCard, { deckId });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const mapState = (state, { route }) => {
  const { deckId } = route.params;
  return {
    questions: state.decks[deckId].questions,
    title: state.decks[deckId].title,
    deckId,
  };
};
const mapDispatch = (dispatch) => ({
  deleteCard: (questionId, deckId) =>
    dispatch(handleDeleteCard(questionId, deckId)),
});
const connector = connect(mapState, mapDispatch);
export default connector(DeckView);
