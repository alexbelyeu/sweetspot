import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/Ionicons';
import { SweetText } from './common';
import USER_PROFILE from '../assets/img/user_profile/user_profile.png';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 0.196 * height,
  },
  image: {
    width: 0.076 * height,
    height: 0.076 * height,
    marginRight: 0.05 * width,
  },
  name: {
    color: 'black',
    fontSize: 20,
  },
  logOutButton: {
    position: 'absolute',
    top: 0.21 * height,
    left: 0.1 * width,
  },
  logOutView: {
    flexDirection: 'row',
  },
  logOutText: {
    color: 'black',
    marginRight: 5,
  },
  icons: {
    fontSize: 16,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
});

const SideMenu = (props) => {
  return (
    <View style={styles.menu}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={USER_PROFILE}
        />
        <SweetText style={styles.name}>
          Alex Belyeu
        </SweetText>
      </View>
      <Hr lineColor="#007aff" />
      <TouchableOpacity style={styles.logOutButton} onPress={() => props.onLogOut()}>
        <View style={styles.logOutView}>
          <SweetText style={styles.logOutText}>
            Log out
          </SweetText>
          <Icon name="ios-log-out-outline" style={styles.icons} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

SideMenu.propTypes = {
  onLogOut: React.PropTypes.func,
};

SideMenu.defaultProps = {
  onLogOut: () => {},
};

export default SideMenu;
