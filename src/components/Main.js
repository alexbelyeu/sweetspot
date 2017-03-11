import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import MainMap from './map/MainMap';
import SpotDetail from './spots/SpotDetail';
import SpotsList from './spots/SpotsList';
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
  constructor() {
    super();
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  handleChangeTab(index) {
    this.props.switchMainTab(index);
  }

  render() {
    const renderFooter = (props) => {
      return <TabBar {...props} />;
    };

    const renderScene = ({ route }) => {
      switch (route.key) {
        case '1':
          return <SpotsList />;
        case '2':
          return <MainMap />;
        case '3':
          return <SpotDetail />;
        default:
          return null;
      }
    };
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.props.state}
        renderScene={renderScene}
        renderFooter={renderFooter}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

Main.propTypes = {
  switchMainTab: React.PropTypes.func,
  state: React.PropTypes.shape({
    index: React.PropTypes.number,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
  }),
};

Main.defaultProps = {
  switchMainTab: () => {},
  state: null,
};


const mapStateToProps = ({ mainReducer }) => {
  return { state: mainReducer };
};

export default connect(mapStateToProps, { switchMainTab })(Main);
