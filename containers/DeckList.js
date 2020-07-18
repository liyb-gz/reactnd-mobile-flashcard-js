import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Alert,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DeckCard from '../components/DeckCard';
import styles from '../styles/styles';
import { Routes } from '../enums/navigation';
import { Button, Icon } from 'react-native-elements';
import { handleFetchDecks, handleDeleteDeck } from '../redux/actions/decks';
import {
  PermissionStatus,
  askAsync as askPermissionsAsync,
  USER_FACING_NOTIFICATIONS,
  getAsync as getPermissionsAsync,
} from 'expo-permissions';
import {
  getAllScheduledNotificationsAsync,
  cancelAllScheduledNotificationsAsync,
  scheduleNotificationAsync,
} from 'expo-notifications';
import useAppState from 'react-native-appstate-hook';
import { showMessage } from 'react-native-flash-message';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  getNotificationIconString,
  notificationFlashMessages,
  notification,
} from '../utils/notification';
const DeckList = ({ navigation, fetchDecks, decks, deleteDeck }) => {
  const { appState } = useAppState();
  const { showActionSheetWithOptions } = useActionSheet();
  const [notificationStatus, setNotificationStatus] = useState(
    PermissionStatus.UNDETERMINED
  );
  const [hasScheduledNotifications, setHasScheduledNotifications] = useState(
    false
  );
  const [notifIconString, setNotifIconString] = useState('notifications');
  const [shouldUpdateStatus, setShouldUpdateStatus] = useState(false);
  // Update the states based on notification status
  const getNotificationStatus = useCallback(async () => {
    const { status } = await getPermissionsAsync(USER_FACING_NOTIFICATIONS);
    setNotificationStatus(status);
    if (status === PermissionStatus.GRANTED) {
      const scheduledNotifications = await getAllScheduledNotificationsAsync();
      setHasScheduledNotifications(scheduledNotifications.length > 0);
    }
  }, []);
  const cancelAllNotifications = useCallback(async () => {
    await cancelAllScheduledNotificationsAsync();
    showMessage(notificationFlashMessages.off);
    setShouldUpdateStatus(true);
  }, []);
  const scheduleNotification = useCallback(async () => {
    await scheduleNotificationAsync(notification);
    showMessage(notificationFlashMessages.on);
    setShouldUpdateStatus(true);
  }, []);
  const handleNotificationPress = useCallback(async () => {
    switch (notificationStatus) {
      case PermissionStatus.DENIED:
        Alert.alert(
          'Permission required',
          'We need your permission to set notifications for you.',
          [
            { text: 'Go to settings', onPress: Linking.openSettings },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case PermissionStatus.UNDETERMINED:
        const { status } = await askPermissionsAsync(USER_FACING_NOTIFICATIONS);
        if (status === PermissionStatus.GRANTED) {
          scheduleNotification();
        } else {
          showMessage(notificationFlashMessages.denied);
        }
        break;
      case PermissionStatus.GRANTED:
        if (hasScheduledNotifications) {
          cancelAllNotifications();
        } else {
          scheduleNotification();
        }
    }
  }, [notificationStatus, hasScheduledNotifications]);
  // ComponentDidLoad
  useEffect(() => {
    fetchDecks();
  }, []);
  // Whenever user comes back to the app, get new notification status
  useEffect(() => {
    if (appState === 'active') {
      getNotificationStatus().then(() => {
        setShouldUpdateStatus(false);
      });
    }
  }, [appState, shouldUpdateStatus]);
  // Whenever notification status changes, update the icon string
  useEffect(() => {
    const notificationString = getNotificationIconString(
      notificationStatus,
      hasScheduledNotifications
    );
    setNotifIconString(notificationString);
  }, [notificationStatus, hasScheduledNotifications]);
  // Whenever icon string updates, update the icon
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={notifIconString}
          iconStyle={styles.whiteText}
          containerStyle={styles.headerRightIconSpacing}
          onPress={handleNotificationPress}
        />
      ),
    });
  }, [notifIconString]);
  return (
    decks && (
      <SafeAreaView style={[styles.container, styles.screen]}>
        <StatusBar style="light" />
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={(deckId) => deckId}
          renderItem={({ item: deckId }) => (
            <DeckCard
              deck={decks[deckId]}
              onPress={() =>
                navigation.navigate(Routes.DeckView, {
                  deckId,
                })
              }
              onLongPress={() => {
                showActionSheetWithOptions(
                  {
                    title: 'Choose an action',
                    options: ['Delete Deck', 'Edit Deck', 'Cancel'],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 2,
                  },
                  (index) => {
                    switch (index) {
                      case 0:
                        deleteDeck(deckId);
                        break;
                      case 1:
                        navigation.navigate(Routes.AddDeck, {
                          isEdit: true,
                          deckId,
                        });
                        break;
                    }
                  }
                );
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.listEmpty}>
              <Text style={styles.listEmptyText}>
                Add a deck to get started
              </Text>
            </View>
          )}
        />
        <View style={styles.bottomButtonContainer}>
          <Button
            title="Add Deck"
            buttonStyle={styles.tealBlueButton}
            containerStyle={styles.buttomButton}
            onPress={() => {
              navigation.navigate(Routes.AddDeck);
            }}
          />
        </View>
      </SafeAreaView>
    )
  );
};
const mapState = (state) => ({
  decks: state.decks,
});
const mapDispatch = (dispatch) => {
  return {
    fetchDecks: () => dispatch(handleFetchDecks()),
    deleteDeck: (deckId) => dispatch(handleDeleteDeck(deckId)),
  };
};
const connector = connect(mapState, mapDispatch);
export default connector(DeckList);
