import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, SweetText } from './common';
import { switchLandingTab } from '../actions';
import IMAGOTYPE from '../assets/img/imagotype/imagotype.png';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 0.27 * height,
  },
  name: {
    width: 0.7586 * width,
    height: 0.065 * height,
    overflow: 'visible',
  },
  textStyle: {
    color: '#4a4a4a',
    marginTop: 0.0186 * height,
    fontFamily: 'Avenir-Light',
  },
  buttonsContainer: {
    top: 0.35 * height,
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
        <Image style={styles.name} source={IMAGOTYPE} />
        <SweetText style={styles.textStyle}>real time leisure</SweetText>
        <View style={styles.buttonsContainer}>
          <Button blue onPress={this.onPressLogin}>LOGIN</Button>
          <Button white onPress={this.onPressRegister}>REGISTER</Button>
        </View>
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
