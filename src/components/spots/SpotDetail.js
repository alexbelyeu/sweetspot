import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ParallaxView from 'react-native-parallax-view';
import { SweetText } from '../common';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
    fontSize: 20,
    color: 'gray',
  },
  name: {
    color: 'gray',
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
            </View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: this.props.tappedSpot.behind_image }}
            />
            <SweetText onPress={Actions.pop}> {this.props.tappedSpot.description} </SweetText>
          </View>
        </ParallaxView>
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
