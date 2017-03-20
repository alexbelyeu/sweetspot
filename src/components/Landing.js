import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { switchLandingTab } from '../actions';

const { height, width } = Dimensions.get('window');
const numberOfTabs = 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    marginHorizontal: Platform.OS === 'ios' ? (0.1 * width) : 0,
    marginTop: Platform.OS === 'ios' ? (0.25 * width) : 0,
    backgroundColor: 'white',
  },
  tabStyle: {
    width: Platform.OS === 'ios' ? 0.8 * (width / numberOfTabs) : (width / numberOfTabs),
  },
  labelTabbar: {
    color: '#007aff',
  },
});

class Landing extends Component {
  constructor() {
    super();
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(index) {
    this.props.switchLandingTab(index);
  }


  render() {
    const renderHeader = (props) => {
      return (<TabBar
        {...props}
        labelStyle={styles.labelTabbar}
        indicatorStyle={{ backgroundColor: '#007aff' }}
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
      />);
    };
    const renderScene = ({ route }) => {
      switch (route.key) {
        case '1':
          return <LoginForm />;
        case '2':
          return <RegisterForm />;
        default:
          return null;
      }
    };

    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.props.state}
        onRequestChangeTab={this.handleChangeTab}
        renderScene={renderScene}
        renderHeader={renderHeader}
      />
    );
  }
}

Landing.propTypes = {
  switchLandingTab: React.PropTypes.func,
  state: React.PropTypes.shape({
    index: React.PropTypes.number,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
  }),
};

Landing.defaultProps = {
  switchLandingTab: () => {},
  state: null,
};

const mapStateToProps = ({ landingReducer }) => {
  return { state: landingReducer };
};

export default connect(mapStateToProps, { switchLandingTab })(Landing);
