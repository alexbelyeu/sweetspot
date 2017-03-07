import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { switchLandingTab } from '../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


class Initial extends Component {

  onPressLogin = () => {
    this.props.switchLandingTab(0);  // TODO remove hardcoded values
    Actions.register_login();
  };

  onPressRegister = () => {
    this.props.switchLandingTab(1);  // TODO remove hardcoded values
    Actions.register_login();
  };

  render() {
    return (
      <View style={styles.container}>
        <CardSection>
          <Button onPress={this.onPressLogin}>Sign In</Button>
          <Button onPress={this.onPressRegister}>Register</Button>
        </CardSection>
      </View>
    );
  }
}

export default connect(null, { switchLandingTab })(Initial);
