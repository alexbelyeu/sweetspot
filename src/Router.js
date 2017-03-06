import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Initial from './components/Initial';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainMap from './components/map/MainMap';
import SpotsList from './components/spots/SpotsList';
import SpotDetail from './components/spots/SpotDetail';
import { Spinner } from './components/common';
import { logOut } from './actions';


class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserResolved: false,
      isUserLoggedIn: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokenRouter !== 'noToken' && !this.props.tokenRouter) {
      this.setState({ isUserLoggedIn: true });
    }
    this.setState({ isUserResolved: true });
  }


  render() {
    const onLogOut = () => {
      Actions.initial({ type: 'reset' });
      this.props.logOut();
    };
    if (!this.state.isUserResolved) {
      return (
        // Eventually will show the landing page with an image
        <Spinner size="large" />
      );
    }
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="main" initial>
          <Scene
            onRight={() => Actions.spotsList()}
            rightTitle="Spots"
            onLeft={onLogOut}
            leftTitle="Logout"
            key="mainMap"
            component={MainMap}
            title="SweetSpot"
            panHandlers={null}
            initial
          />
        </Scene>
        <Scene
          key="initial"
          component={Initial}
          title="SweetSpot"
          initial={!this.state.isUserLoggedIn}
        />
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene key="register" component={RegisterForm} title="Registration" />
        <Scene key="spotsList" component={SpotsList} title="Cerca de ti" />
        <Scene key="spotDetail" component={SpotDetail} title="Sweet Spot" />
      </Router>
    );
  }
}

RouterComponent.propTypes = {
  tokenRouter: React.PropTypes.string,
  logOut: React.PropTypes.func,
};

RouterComponent.defaultProps = {
  tokenRouter: '',
  logOut: () => {},
};

const mapStateToProps = ({ routerReducer }) => {
  const { tokenRouter } = routerReducer;
  return { tokenRouter };
};

export default connect(mapStateToProps, { logOut })(RouterComponent);
