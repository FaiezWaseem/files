import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import Route from './Route';
import colors from './src/utils/colors';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.dark} />
      <Route />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
