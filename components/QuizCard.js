import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
const quizCard = ({ question, hideAnswer }) => {
  return (
    <View style={[styles.quizCard, styles.shadow]}>
      <Text style={styles.quizCardQuestion}>{question.questionText}</Text>
      {!hideAnswer && (
        <Text style={styles.quizCardAnswer}>{question.answer}</Text>
      )}
    </View>
  );
};
export default quizCard;
