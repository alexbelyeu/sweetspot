import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

class SpotDetail extends Component {

  componentWillMount() {
    Actions.refresh({ title: this.props.tappedSpot.name });
  }

  render() {
    return (
      <View>
        <Image
          style={{ width: 200, height: 100 }}
          source={{ uri: this.props.tappedSpot.image }}
        />
        <Text> {this.props.tappedSpot.name} </Text>
        <Text> {this.props.tappedSpot.promo} </Text>
        <Text> {this.props.tappedSpot.description} </Text>
        <Text> {this.props.tappedSpot.position} </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: this.props.tappedSpot.behind_image }}
        />
        <Text> {this.props.tappedSpot.behind} </Text>
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
