import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Initial extends Component {

  render() {
    return (
      <View style={styles.container}>
        <CardSection>
          <Button onPress={Actions.register}>Register</Button>
          <Button onPress={Actions.login}>Sign In</Button>
        </CardSection>
      </View>
    );
  }
}

export default Initial;
