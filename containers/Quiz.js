import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import styles from '../styles/styles';
import * as Progress from 'react-native-progress';
import QuizCard from '../components/QuizCard';
import { Routes } from '../enums/navigation';
import { tealBlue, lightgray } from '../styles/colors';
import { StatusBar } from 'expo-status-bar';
import FlipCard from 'react-native-flip-card';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
const Quiz = ({ navigation, questions, deckId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numOfCorrect, setNumOfCorrect] = useState(0);
  const [shouldShowResult, setShouldShowResult] = useState(false);
  // isFlipped: is currently filpped
  const [isFlipped, setIsFlipped] = useState(false);
  // hasFlipped: the flipcard has been flipped before
  const [hasFlipped, setHasFlipped] = useState(false);
  const handleSubmit = useCallback(
    ({ correct }) => {
      if (correct) {
        setNumOfCorrect((val) => val + 1);
      }
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((val) => val + 1);
        setHasFlipped(false);
        setIsFlipped(false);
      } else {
        setShouldShowResult(true);
      }
    },
    [currentIndex]
  );
  // Set state is asynchronous.
  // If we navigate to result page right after setting numOfCorrect,
  // numOfCorrect may be 1 less than it should be
  useEffect(() => {
    if (shouldShowResult) {
      navigation.replace(Routes.Result, {
        deckId,
        percentage: (numOfCorrect / questions.length) * 100,
        numOfCorrect,
        numOfQuestions: questions.length,
      });
    }
  }, [shouldShowResult]);
  const handlePress = useCallback(() => {
    setHasFlipped(true);
    setIsFlipped((val) => !val);
  }, []);
  return (
    <SafeAreaView style={[styles.screen, styles.container]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.smallText}>
          {numOfCorrect} correct, {questions.length - currentIndex - 1} upcoming
        </Text>
        <Progress.Bar
          progress={numOfCorrect / questions.length}
          width={null}
          height={10}
          style={styles.progressBar}
          color={tealBlue}
          unfilledColor={lightgray}
          borderWidth={0}
        />
        <TouchableWithoutFeedback onPress={handlePress}>
          <FlipCard
            flip={isFlipped}
            flipHorizontal={true}
            flipVertical={false}
            clickable={false}
          >
            <QuizCard question={questions[currentIndex]} hideAnswer />

            <QuizCard question={questions[currentIndex]} />
          </FlipCard>
        </TouchableWithoutFeedback>

        {hasFlipped && (
          <View style={styles.bottomButtonContainerWithoutPadding}>
            <Button
              title="Correct"
              buttonStyle={styles.tealBlueButton}
              containerStyle={styles.buttomButton}
              onPress={() => {
                handleSubmit({ correct: true });
              }}
            />
            <Button
              title="Incorrect"
              buttonStyle={styles.redButton}
              containerStyle={styles.buttomButton}
              onPress={() => {
                handleSubmit({ correct: false });
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const mapState = (state, { route }) => {
  const { deckId } = route.params;
  return {
    deckId,
    questions: shuffle(state.decks[deckId].questions),
  };
};
const connector = connect(mapState);
export default connector(Quiz);
