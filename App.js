import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ModalStack from './navigations/ModalStack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducers';
import middleware from './redux/middleware';
import FlashMessage from 'react-native-flash-message';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
const store = createStore(reducer, middleware);
const App = () => {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <>
          <StatusBar style="auto" />
          <NavigationContainer>
            <ModalStack />
          </NavigationContainer>
          <FlashMessage position="top" />
        </>
      </ActionSheetProvider>
    </Provider>
  );
};
export default App;
