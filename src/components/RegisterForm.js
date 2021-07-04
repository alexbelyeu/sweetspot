import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  usernameCreated,
  emailCreated,
  passwordCreated,
  registerUser,
} from '../actions';
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
    fontSize: height < 600 ? 20 : 24,
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

class RegisterForm extends Component {
  constructor() {
    super();
    this.onUsernameCreation = this.onUsernameCreation.bind(this);
    this.onEmailCreation = this.onEmailCreation.bind(this);
    this.onPasswordCreation = this.onPasswordCreation.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onUsernameCreation(text) {
    this.props.usernameCreated(text);
  }

  onEmailCreation(text) {
    this.props.emailCreated(text);
  }

  onPasswordCreation(text) {
    this.props.passwordCreated(text);
  }

  onButtonPress() {
    const { username, email, password } = this.props;
    this.props.registerUser({ username, email, password });
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
        REGISTER
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          autoCapitalize="none"
          label="ios-at-outline"
          onChangeText={this.onUsernameCreation}
          placeholder="USERNAME"
          style={styles.usernameStyle}
          value={this.props.username}
        />
        <SweetText style={styles.errorTextStyle}>
          {this.props.usernameError}
        </SweetText>
        <Input
          autoCapitalize="none"
          label="ios-mail-outline"
          placeholder="EMAIL"
          onChangeText={this.onEmailCreation}
          style={styles.emailStyle}
          value={this.props.email}
        />
        <SweetText style={styles.errorTextStyle}>
          {this.props.emailError}
        </SweetText>
        <Input
          label="ios-lock"
          onChangeText={this.onPasswordCreation}
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.passwordStyle}
          value={this.props.password}
        />
        <SweetText style={styles.errorTextStyle}>
          {this.props.passwordError}
        </SweetText>
        <SweetText style={styles.errorTextStyle}>{this.props.error}</SweetText>
        <View style={styles.buttonContainer}>{this.renderButton()}</View>
      </View>
    );
  }
}

RegisterForm.propTypes = {
  usernameCreated: React.PropTypes.func,
  emailCreated: React.PropTypes.func,
  passwordCreated: React.PropTypes.func,
  username: React.PropTypes.string.isRequired,
  usernameError: React.PropTypes.string,
  email: React.PropTypes.string.isRequired,
  emailError: React.PropTypes.string,
  password: React.PropTypes.string.isRequired,
  passwordError: React.PropTypes.string,
  error: React.PropTypes.string,
  registerUser: React.PropTypes.func,
  loading: React.PropTypes.bool.isRequired,
};

RegisterForm.defaultProps = {
  usernameCreated: () => {},
  usernameError: '',
  emailCreated: () => {},
  emailError: '',
  passwordCreated: () => {},
  passwordError: '',
  error: '',
  registerUser: () => {},
};

const mapStateToProps = ({ registerReducer }) => {
  const {
    username,
    usernameError,
    email,
    emailError,
    password,
    passwordError,
    error,
    loading,
  } = registerReducer;

  return {
    username,
    usernameError,
    email,
    emailError,
    password,
    passwordError,
    error,
    loading,
  };
};

export default connect(mapStateToProps, {
  usernameCreated,
  emailCreated,
  passwordCreated,
  registerUser,
})(RegisterForm);
