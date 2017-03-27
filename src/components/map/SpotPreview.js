import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SweetText } from '../common';
import { tapOnSpot, switchMainTab } from '../../actions';
import BEACHBAR from '../../assets/img/beachbar_400.jpeg';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'transparent',
    height: 0.25 * height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 0.2 * height,
    width: 0.9 * width,
    top: 0.025 * height,
    borderRadius: 20,
  },
  promo: {
    position: 'absolute',
    color: 'white',
    left: 0.06 * width,
    top: 0.15 * width,
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    position: 'absolute',
    color: 'white',
    left: 0.06 * width,
    top: 0.2 * width,
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'aliceblue',
    width: 0.9 * width,
    height: 0.07 * height,
    bottom: 0.025 * height,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomBarElements: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    marginRight: 5,
    fontSize: 14,
  },
  distance: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
  },
  price: {
    fontSize: 22,
    color: 'gray',
  },
});

class SpotPreview extends Component {

  previewPressed(spot) {
    this.props.tapOnSpot(spot);
    Actions.spotdetail();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.previewPressed(this.props.tappedSpot)}
      >
        <View style={styles.bubble}>
          <Image
            style={styles.image}
            source={BEACHBAR}
          />
          <SweetText style={styles.name}>
            {this.props.tappedSpot.name}
          </SweetText>
          <SweetText style={styles.promo}>
            {this.props.tappedSpot.promo}
          </SweetText>
          <View style={styles.bottomBar}>
            <View style={styles.bottomBarElements}>
              <Icon name="ios-navigate-outline" style={styles.icons} />
              <SweetText style={styles.distance}>
                1,3 km
              </SweetText>
            </View>
            <View style={styles.bottomBarElements}>
              <Icon name="ios-clock-outline" style={styles.icons} />
              <SweetText style={styles.time}>
                18:00 - 20:00
              </SweetText>
            </View>
            <View style={{}}>
              <SweetText style={styles.price}>
                6 €
              </SweetText>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

SpotPreview.propTypes = {
  region: React.PropTypes.shape({
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
  }),
  tappedSpot: React.PropTypes.shape({
    name: React.PropTypes.string,
    promo: React.PropTypes.string,
    description: React.PropTypes.string,
    position: React.PropTypes.string,
    behind: React.PropTypes.string,
    behind_image: React.PropTypes.string,
    image: React.PropTypes.string,
  }),
  tapOnSpot: React.PropTypes.func,
};

SpotPreview.defaultProps = {
  region: {},
  tappedSpot: {
    name: '',
    promo: '',
    description: '',
    position: '',
    behind: '',
    behind_image: '',
    image: '',
  },
  tapOnSpot: () => {},
};

const mapStateToProps = ({ mapReducer }) => {
  const { tappedSpot, region } = mapReducer;
  return { tappedSpot, region };
};

export default connect(mapStateToProps, { tapOnSpot, switchMainTab })(SpotPreview);
