import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MainMap from './map/MainMap';
import SpotsList from './spots/SpotsList';
import SpotDetail from './spots/SpotDetail';
import { switchMainTab } from '../actions';

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

class Main extends Component {

  _handleChangeTab = (index) => {
    this.props.switchMainTab(index);
  };

  _renderFooter = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <MainMap />;
    case '2':
      return <SpotsList />;
    case '3':
      return <SpotDetail />;
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
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const mapStateToProps = ({ mainReducer }) => {
  return {state: mainReducer}
};

export default connect(mapStateToProps, { switchMainTab })(Main);
