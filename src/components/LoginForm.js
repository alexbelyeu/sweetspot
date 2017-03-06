import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
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
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress}>
        Login
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
            placeholder="alex"
            onChangeText={this.onUsernameChange}
            value={this.props.username}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.usernameError}
        </Text>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange}
            value={this.props.password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.passwordError}
        </Text>

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

LoginForm.propTypes = {
  usernameChanged: React.PropTypes.func,
  passwordChanged: React.PropTypes.func,
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  usernameError: React.PropTypes.string.isRequired,
  passwordError: React.PropTypes.string.isRequired,
  error: React.PropTypes.string.isRequired,
  loginUser: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
  usernameChanged: () => {},
  passwordChanged: () => {},
};

const mapStateToProps = ({ loginReducer }) => {
  const { username, password, usernameError, passwordError, error, loading } = loginReducer;

  return { username, password, usernameError, passwordError, error, loading };
};

export default connect(mapStateToProps, {
  usernameChanged, passwordChanged, loginUser,
})(LoginForm);
