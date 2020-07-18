import React from 'react';
import { Text, View, Dimensions, SafeAreaView } from 'react-native';
import styles from '../styles/styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { tealBlue, lightgray } from '../styles/colors';
import { Button } from 'react-native-elements';
import { Routes } from '../enums/navigation';
const Result = ({ navigation, route }) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const { percentage, numOfCorrect, numOfQuestions, deckId } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedCircularProgress
        size={screenWidth * 0.6667}
        width={20}
        fill={percentage}
        rotation={0}
        tintColor={tealBlue}
        duration={1000}
        backgroundColor={lightgray}
        style={styles.circularProgress}
      >
        {(fill) => (
          <View style={styles.circularProgressTextContainer}>
            <Text style={styles.circularProgressText}>{Math.round(fill)}%</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultText}>Your score is</Text>
        <Text>
          <Text style={styles.resultScore}>{numOfCorrect}</Text>
          <Text style={styles.resultText}> / {numOfQuestions}</Text>
        </Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button
          title="Redo"
          buttonStyle={styles.tealBlueButton}
          containerStyle={styles.buttomButton}
          onPress={() => navigation.replace(Routes.Quiz, { deckId })}
        />
        <Button
          title="Back to deck"
          buttonStyle={styles.tealBlueButton}
          containerStyle={styles.buttomButton}
          onPress={navigation.goBack}
        />
      </View>
    </SafeAreaView>
  );
};
export default Result;
