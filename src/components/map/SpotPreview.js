import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { tapOnSpot } from '../../actions';

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {  // TODO delete
    width: 200,
    alignItems: 'stretch',
  },
});

class SpotPreview extends Component {

  spotPressed(spot) {
    this.props.tapOnSpot(spot);
    Actions.spotDetail();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.spotPressed(this.props.tappedSpot)}
      >
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center' }}>
            {this.props.tappedSpot.name}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {this.props.tappedSpot.promo}
          </Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: this.props.tappedSpot.image }}
          />
          <Text style={{ textAlign: 'center' }}>
            {this.props.region.latitude.toPrecision(7)},
            {this.props.region.longitude.toPrecision(7)}
          </Text>
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

export default connect(mapStateToProps, { tapOnSpot })(SpotPreview);
