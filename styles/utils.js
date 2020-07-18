import { StatusBar } from 'react-native';
import { white, lightgray } from './colors';
export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
};
export const shadowLg = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
};
export const screen = {
    flex: 1,
    paddingTop: StatusBar.currentHeight /* for Android only */,
};
export const listContainer = {
    flex: 1,
    backgroundColor: white,
};
export const inputContainer = {
    flex: 1,
    paddingTop: 20,
};
export const flex = {
    flex: 1,
};
export const container = {
    flex: 1,
    padding: 10,
    backgroundColor: white,
};
export const keyboardAvoidingView = {
    flex: 1,
};
export const headerLeftIconSpacing = {
    marginLeft: 15,
};
export const headerRightIconSpacing = {
    marginRight: 15,
};
export const bottom = {
    position: 'absolute',
    bottom: 20,
};
export const mutedText = {
    color: lightgray,
};
export const whiteText = {
    color: white,
};
export const smallText = {
    fontSize: 14,
};
