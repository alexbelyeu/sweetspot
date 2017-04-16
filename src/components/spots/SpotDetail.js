import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxView from 'react-native-parallax-view';
import { SweetText } from '../common';
import IMAGOTYPE_W from '../../assets/img/imagotype_w/imagotype_w.png';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxViewStyle: {
    alignItems: 'center',
  },
  mainImage: {
    height: 0.3 * height,
    alignSelf: 'stretch',
  },
  offer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.2 * height,
    width: 0.85 * width,
    top: -0.1 * height,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  promo: {
    fontSize: (height < 600) ? 20 : 24,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  name: {
    color: 'gray',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 0.85 * width,
    height: 0.05 * height,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  distanceContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    marginRight: 5,
    fontSize: (height < 600) ? 14 : 18,
    color: '#007aff',
  },
  distance: {
    fontSize: (height < 600) ? 12 : 16,
  },
  time: {
    fontSize: (height < 600) ? 12 : 16,
  },
  priceContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    borderBottomRightRadius: 5,
  },
  price: {
    fontSize: (height < 600) ? 22 : 26,
    color: 'white',
  },
  imageSlide: {
    flexDirection: 'row',
    top: -0.1 * height,
  },
  imagesBar: {
    height: width / 5,
    width: width / 5,
    marginRight: 5,
    borderRadius: 3,
  },
  offerTextContainer: {
    top: -0.05 * height,
    width: 0.9 * width,
  },
  offerTextStyle: {
    fontSize: (height < 600) ? 14 : 18,
  },
  closeButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 30,
    width: 30,
    top: 0.04 * height,
    right: 0.04 * width,
    borderRadius: 100,
    backgroundColor: 'rgba(211,211,211,0.8)',
    zIndex: 100,
  },
  closeButtonIcon: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: (height < 600) ? 30 : 34,
  },
  imagotypeContainer: {
    position: 'absolute',
    height: 0.072 * height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagotype: {
    width: 0.3 * width,
    height: 0.024 * height,
    top: 0.04 * height,
  },
});

class SpotDetail extends Component {
  render() {
    // TODO move Actions.pop to x button.
    return (
      <View style={styles.container}>
        <ParallaxView
          backgroundSource={{ uri: this.props.tappedSpot.image }}
          windowHeight={0.3 * height}
        >
          <View style={styles.parallaxViewStyle}>
            <View style={styles.offer}>
              <SweetText style={styles.promo}> {this.props.tappedSpot.promo} </SweetText>
              <SweetText style={styles.name}>
                {this.props.tappedSpot.name}
              </SweetText>
              <View style={styles.bottomBar}>
                <View style={styles.distanceContainer}>
                  <Icon name="ios-navigate-outline" style={styles.icons} />
                  <SweetText style={styles.distance}>
                    1,3 km
                  </SweetText>
                </View>
                <View style={styles.timeContainer}>
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
            <View style={styles.imageSlide}>
              {
                [this.props.tappedSpot.behind_image,
                  this.props.tappedSpot.behind_image,
                  this.props.tappedSpot.behind_image,
                  this.props.tappedSpot.behind_image,
                ].map(image => (
                  <Image
                    style={styles.imagesBar}
                    source={{ uri: image }}
                    key={Math.random()}
                  />
              ))}
            </View>
            <View style={styles.offerTextContainer}>
              <SweetText style={styles.offerTextStyle}>
                {this.props.tappedSpot.description}
              </SweetText>
            </View>
          </View>
        </ParallaxView>
        <TouchableWithoutFeedback onPress={Actions.pop}>
          <View style={styles.closeButtonContainer}>
            <Icon
              name="ios-close-outline"
              style={styles.closeButtonIcon}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.imagotypeContainer}>
          <Image source={IMAGOTYPE_W} style={styles.imagotype} />
        </View>
      </View>
    );
  }
}

SpotDetail.propTypes = {
  tappedSpot: React.PropTypes.shape({
    name: React.PropTypes.string,
    promo: React.PropTypes.string,
    description: React.PropTypes.string,
    position: React.PropTypes.string,
    behind: React.PropTypes.string,
    behind_image: React.PropTypes.string,
    image: React.PropTypes.string,
  }),
};

SpotDetail.defaultProps = {
  tappedSpot: {
    name: '',
    promo: '',
    description: '',
    position: '',
    behind: '',
    behind_image: '',
    image: '',
  },
};

const mapStateToProps = ({ mapReducer }) => {
  const { tappedSpot } = mapReducer;
  return { tappedSpot };
};

export default connect(mapStateToProps)(SpotDetail);
