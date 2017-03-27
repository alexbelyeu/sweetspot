import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, SweetText } from './common';
import { switchLandingTab } from '../actions';
import LOGO from '../assets/img/logo-sweetspot.png';
import NAME from '../assets/img/name.png';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  name: {
    width: 148,
    height: 20,
    marginTop: 20,
  },
  textStyle: {
    color: 'darkgray',
    marginBottom: 0.1 * height,
  },
  login: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  register: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});


class Initial extends Component {
  constructor() {
    super();
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressLogin() {
    this.props.switchLandingTab(0);  // TODO remove hardcoded values
    Actions.register_login();
  }

  onPressRegister() {
    this.props.switchLandingTab(1);  // TODO remove hardcoded values
    Actions.register_login();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={LOGO} />
        <Image style={styles.name} source={NAME} />
        <SweetText style={styles.textStyle}>real time leisure</SweetText>
        <Button blue style={styles.login} onPress={this.onPressLogin}>LOGIN</Button>
        <Button style={styles.register} onPress={this.onPressRegister}>REGISTER</Button>
      </View>
    );
  }
}

Initial.propTypes = {
  switchLandingTab: React.PropTypes.func,
};

Initial.defaultProps = {
  switchLandingTab: () => {},
};

export default connect(null, { switchLandingTab })(Initial);
