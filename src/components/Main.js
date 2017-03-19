import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Map from './map/Map';
import SpotDetail from './spots/SpotDetail';
import SpotsList from './spots/SpotsList';
import { switchMainTab } from '../actions';
import config from '../assets/fonts/fontello/config.json';

const Logo = createIconSetFromFontello(config, 'fontello');
const AnimatedLogo = Animated.createAnimatedComponent(Logo);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    backgroundColor: '#f7f7f7',
    height: 50,
    shadowOpacity: 0.9,
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
    const renderIcon = props => ({ route, index }) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      const outputRange = inputRange.map((inputIndex) => { return inputIndex === index ? '#0093f3' : 'black'; });
      const color = props.position.interpolate({
        inputRange,
        outputRange,
      });
      switch (route.key) {
        case '0':
          return <AnimatedIcon name={'ios-list'} size={32} style={{ color }} />;
        case '1':
          return <AnimatedLogo src={'logo'} name={'logo'} size={32} style={{ color }} />;
        case '2':
          return <AnimatedIcon name={'ios-bookmark'} size={26} style={{ color }} />;
        default:
          return null;
      }
    };

    const renderFooter = (props) => {
      return (
        <TabBar
          {...props}
          renderIcon={renderIcon(props)}
          style={styles.tabStyle}
          renderIndicator={() => null}
        />
      );
    };

    const renderScene = ({ route }) => {
      switch (route.key) {
        case '0':
          return <SpotsList />;
        case '1':
          return <Map />;
        case '2':
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
