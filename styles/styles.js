import { StyleSheet } from 'react-native';
import * as deckCard from './deckCard';
import * as utils from './utils';
import * as floatingButton from './floatingButton';
import * as textInput from './textInput';
import * as buttons from './buttons';
import * as deckHeader from './deckHeader';
import * as questionItem from './questionItem';
import * as progressBar from './progressBar';
import * as quizCard from './quizCard';
import * as result from './result';
import * as list from './list';
const styles = StyleSheet.create({
    ...deckCard,
    ...deckHeader,
    ...utils,
    ...floatingButton,
    ...textInput,
    ...buttons,
    ...questionItem,
    ...progressBar,
    ...quizCard,
    ...result,
    ...list,
});
export default styles;
