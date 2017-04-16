import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../actions';
import { SweetText, Input, Button, Spinner } from './common';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 0.05 * height,
    marginHorizontal: 0.075 * width,
  },
  errorTextStyle: {
    fontSize: (height < 600) ? 20 : 24,
    alignSelf: 'center',
    color: 'crimson',
    top: 0,
  },
  usernameStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  passwordStyle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 0.081 * height,
  },
  spinnerContainer: {
    flex: 1,
    width: 0.85 * width,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
  },
});

class LoginForm extends Component {
  constructor() {
    super();
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password } = this.props;
    this.props.loginUser({ username, password });
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size="large" />
        </View>
      );
    }

    return (
      <Button blue style={styles.button} onPress={this.onButtonPress}>
        LOGIN
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          autoCapitalize="none"
          label="ios-at-outline"
          onChangeText={this.onUsernameChange}
          placeholder="USERNAME"
          style={styles.usernameStyle}
          value={this.props.username}
        />
        <SweetText style={styles.errorTextStyle}>
          {this.props.usernameError}
        </SweetText>
        <Input
          label="ios-lock"
          onChangeText={this.onPasswordChange}
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.passwordStyle}
          value={this.props.password}
        />
        <SweetText style={styles.errorTextStyle}>
          {this.props.passwordError}
        </SweetText>
        <SweetText style={styles.errorTextStyle}>
          {this.props.error}
        </SweetText>
        <View style={styles.buttonContainer}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

LoginForm.propTypes = {
  usernameChanged: React.PropTypes.func,
  passwordChanged: React.PropTypes.func,
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  usernameError: React.PropTypes.string,
  passwordError: React.PropTypes.string,
  error: React.PropTypes.string.isRequired,
  loginUser: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
  usernameChanged: () => {},
  usernameError: '',
  passwordChanged: () => {},
  passwordError: '',
};

const mapStateToProps = ({ loginReducer }) => {
  const { username, password, usernameError, passwordError, error, loading } = loginReducer;

  return { username, password, usernameError, passwordError, error, loading };
};

export default connect(mapStateToProps, {
  usernameChanged, passwordChanged, loginUser,
})(LoginForm);
