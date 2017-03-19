import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { tapOnSpot, switchMainTab } from '../../actions';

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
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
  switchMainTab: React.PropTypes.func,
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
  switchMainTab: () => {},
};

const mapStateToProps = ({ mapReducer }) => {
  const { tappedSpot, region } = mapReducer;
  return { tappedSpot, region };
};

export default connect(mapStateToProps, { tapOnSpot, switchMainTab })(SpotPreview);
