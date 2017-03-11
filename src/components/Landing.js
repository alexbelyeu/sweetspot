import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
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
  constructor() {
    super();
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(index) {
    this.props.switchLandingTab(index);
  }


  render() {
    const renderHeader = (props) => {
      return <TabBar {...props} />;
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
        renderScene={renderScene}
        renderFooter={renderHeader}
        onRequestChangeTab={this.handleChangeTab}
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
