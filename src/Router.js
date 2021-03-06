import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import NavigationDrawer from './components/NavigationDrawer';
import Initial from './components/Initial';
import { Spinner } from './components/common';
import { logOut, resolveUser, userLoggedIn } from './actions';
import Main from './components/Main';
import Landing from './components/Landing';
import SpotDetail from './components/spots/SpotDetail';
import SpotDetailAndroid from './components/spots/SpotDetailAndroid';
import IMAGOTYPE_BW from './assets/img/imagotype_bw/imagotype_bw.png';
import USER_OUTLINE from './assets/img/user_outline/user_outline.png';

const styles = StyleSheet.create({
  navigationBarStyle: {
    flex: 1,
    height: Platform.OS === 'ios' ? 55 : 40,
    backgroundColor: 'white',
  },
  leftButtonStyle: {
    paddingBottom: 15,
  },
  navigationBarTitleImageStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 15,
  },
});

class RouterComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isUserResolved) {
      if (nextProps.tokenRouter !== 'noToken' && !this.props.tokenRouter) {
        this.props.userLoggedIn();
      }
      this.props.resolveUser();
    }
  }

  shouldComponentUpdate() {
    if (!this.props.isUserResolved) {
      return true;
    }
    return false;
  }

  render() {
    const onLogOut = () => {
      Actions.initial({ type: 'reset' });
      this.props.logOut();
    };
    if (!this.props.isUserResolved) {
      return (
        // Eventually will show the landing page with an image
        <Spinner size="large" />
      );
    }
    return (
      <Router>
        <Scene key="drawer" component={NavigationDrawer} open={false} onLogOut={onLogOut}>
          <Scene key="main" initial>
            <Scene
              component={Main}
              initial
              key="map"
              leftButtonImage={USER_OUTLINE}
              leftButtonStyle={styles.leftButtonStyle}
              navigationBarTitleImage={IMAGOTYPE_BW}
              navigationBarStyle={styles.navigationBarStyle}
              navigationBarTitleImageStyle={styles.navigationBarTitleImageStyle}
              onLeft={() => Actions.refresh({ key: 'drawer', open: value => !value })}
              panHandlers={null}
              sceneStyle={{ paddingTop: 40 }}
            />
            <Scene
              component={Platform.OS === 'ios' ? SpotDetail : SpotDetailAndroid}
              direction="vertical"
              hideNavBar
              key="spotdetail"
              panHandlers={Platform.OS === 'android' ? undefined : null}
            />
          </Scene>
        </Scene>
        <Scene
          component={Initial}
          hideNavBar
          initial={!this.props.isUserLoggedIn}
          key="initial"
          title="SweetSpot"
        />
        <Scene
          component={Landing}
          hideNavBar
          key="register_login"
          title="SweetSpot"
        />
      </Router>
    );
  }
}

RouterComponent.propTypes = {
  isUserLoggedIn: React.PropTypes.bool,
  isUserResolved: React.PropTypes.bool,
  logOut: React.PropTypes.func,
  resolveUser: React.PropTypes.func,
  tokenRouter: React.PropTypes.string,
  userLoggedIn: React.PropTypes.func,
};

RouterComponent.defaultProps = {
  isUserLoggedIn: false,
  isUserResolved: false,
  logOut: () => {},
  resolveUser: () => {},
  tokenRouter: '',
  userLoggedIn: () => {},
};

const mapStateToProps = ({ routerReducer }) => {
  const { isUserResolved, isUserLoggedIn, tokenRouter } = routerReducer;
  return { isUserResolved, isUserLoggedIn, tokenRouter };
};

export default connect(mapStateToProps, { logOut, resolveUser, userLoggedIn })(RouterComponent);
