import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { switchLandingTab } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Landing extends Component {

  _handleChangeTab = (index) => {
    this.props.switchLandingTab(index);
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <LoginForm />;
    case '2':
      return <RegisterForm />;
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.props.state}
        renderScene={this._renderScene}
        renderFooter={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const mapStateToProps = ({ landingReducer }) => {
  return {state: landingReducer}
};

export default connect(mapStateToProps, { switchLandingTab })(Landing);
