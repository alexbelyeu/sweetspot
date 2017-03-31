import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { usernameCreated, emailCreated, passwordCreated, registerUser } from '../actions';
import { SweetText, Input, Button, Spinner } from './common';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0.1 * height,
    marginHorizontal: 0.1 * width,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'crimson',
  },
  usernameStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  passwordStyle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 0.1 * height,
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
      return <Spinner size="large" />;
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
          {this.props.error}
        </SweetText>
        {this.renderButton()}
      </View>
    );
  }
}

RegisterForm.propTypes = {
  usernameCreated: React.PropTypes.func,
  emailCreated: React.PropTypes.func,
  passwordCreated: React.PropTypes.func,
  username: React.PropTypes.string.isRequired,
  usernameError: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  emailError: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  registerUser: React.PropTypes.func,
  loading: React.PropTypes.bool.isRequired,
};

RegisterForm.defaultProps = {
  usernameCreated: () => {},
  emailCreated: () => {},
  error: '',
  passwordCreated: () => {},
  registerUser: () => {},
};

const mapStateToProps = ({ registerReducer }) => {
  const { username, usernameError, email, emailError, password, error, loading } = registerReducer;

  return { username, usernameError, email, emailError, password, error, loading };
};

export default connect(mapStateToProps, {
  usernameCreated, emailCreated, passwordCreated, registerUser,
})(RegisterForm);
