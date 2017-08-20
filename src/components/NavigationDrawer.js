import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

class NavigationDrawer extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type="displace"
        content={<SideMenu onLogOut={state.onLogOut} />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = {
  navigationState: React.PropTypes.shape({
    children: React.PropTypes.arrayOf(React.PropTypes.object),
    key: React.PropTypes.string,
    open: React.PropTypes.bool,
    onLogOut: React.PropTypes.func,
  }),
  onNavigate: React.PropTypes.func,
};

NavigationDrawer.defaultProps = {
  navigationState: {},
  onNavigate: () => {},
};

export default NavigationDrawer;
