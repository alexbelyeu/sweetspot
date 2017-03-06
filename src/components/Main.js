import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import MainMap from './map/MainMap';
import SpotsList from './spots/SpotsList';
import SpotDetail from './spots/SpotDetail';

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

  state = {  // TODO Store in Redux
    index: 0,
    routes: [
      { key: '1', title: 'MapIcon' },
      { key: '2', title: 'ListIcon' },
      { key: '3', title: 'SpotIcon' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
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
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

export default Main;
