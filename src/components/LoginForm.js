import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../actions';
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
    marginBottom: 0.2 * height,
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
      return <Spinner size="large" />;
    }

    return (
      <Button blue style={styles.button} onPress={this.onButtonPress}>
        Login
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
        {this.renderButton()}
      </View>
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
