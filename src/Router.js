import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Initial from './components/Initial';
import { Spinner } from './components/common';
import { logOut, resolveUser, userLoggedIn } from './actions';
import Main from './components/Main';
import Landing from './components/Landing';
import SpotDetail from './components/spots/SpotDetail';


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
        <Scene key="main" initial>
          <Scene
            onLeft={onLogOut}
            leftTitle="Logout"
            key="map"
            component={Main}
            sceneStyle={{ paddingTop: 65 }}
            title="SweetSpot"
            panHandlers={null}
            initial
          />
          <Scene
            key="spotdetail"
            component={SpotDetail}
            hideNavBar
            direction="vertical"
          />
        </Scene>
        <Scene
          hideNavBar
          key="initial"
          component={Initial}
          title="SweetSpot"
          initial={!this.props.isUserLoggedIn}
        />
        <Scene
          hideNavBar
          key="register_login"
          component={Landing}
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
