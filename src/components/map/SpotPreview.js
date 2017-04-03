import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line
import { SweetText } from '../common';
import { tapOnSpot, switchMainTab } from '../../actions';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'white',
    height: 0.25 * height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientStyle: {
    height: 0.2 * height,
    width: 0.9 * width,
    top: 0.025 * height,
    borderRadius: 20,
  },
  image: {
    height: 0.2 * height,
    width: 0.9 * width,
    opacity: 0.7,
    borderRadius: 20,
  },
  promo: {
    position: 'absolute',
    color: 'white',
    left: 0.05 * width,
    top: 0.06 * height,
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    position: 'absolute',
    color: 'white',
    left: 0.05 * width,
    top: 0.1 * height,
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 0.9 * width,
    height: 0.05 * height,
    bottom: 0.025 * height,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'aliceblue',
  },
  bottomBarElements: {
    flex: 3,
    height: 0.05 * height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    marginRight: 5,
    fontSize: 12,
  },
  distance: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
  priceContainer: {
    flex: 2,
    height: 0.05 * height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 90, 234, 0.1)',
    borderBottomRightRadius: 20,
  },
  price: {
    fontSize: 22,
    color: '#514949',
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
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 0.5]}
            colors={['transparent', 'black']}
            style={styles.linearGradientStyle}
          >
            <Image
              style={styles.image}
              source={{ uri: this.props.tappedSpot.image }}
            />
            <SweetText style={styles.name}>
              {this.props.tappedSpot.name}
            </SweetText>
            <SweetText style={styles.promo}>
              {this.props.tappedSpot.promo}
            </SweetText>
          </LinearGradient>
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
            <View style={styles.priceContainer}>
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
