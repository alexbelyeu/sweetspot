import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { usernameCreated, emailCreated, passwordCreated, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
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
      <Button onPress={this.onButtonPress}>
        Register
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            autoCapitalize="none"
            label="Username"
            placeholder="johndoe"
            onChangeText={this.onUsernameCreation}
            value={this.props.username}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.usernameError}
        </Text>

        <CardSection>
          <Input
            autoCapitalize="none"
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailCreation}
            value={this.props.email}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.emailError}
        </Text>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordCreation}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
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
