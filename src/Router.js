import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Initial from './components/Initial';
import { Spinner } from './components/common';
import { logOut } from './actions';
import Main from './components/Main';
import Landing from './components/Landing';


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
            onLeft={onLogOut}
            leftTitle="Logout"
            key="map"
            component={Main}
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
        <Scene
          key="register_login"
          component={Landing}
          title="SweetSpot"
        />
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
