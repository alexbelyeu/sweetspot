import React from 'react';
import { Actions } from 'react-native-router-flux';
import MapView, { MAP_TYPES, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { loadSpots, updateMyPosition, updateRegion, tapOnSpot } from '../actions';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

class MainMap extends React.Component {

  componentDidMount() {
    this.props.loadSpots(this.props.tokenRouter);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.onPositionChange(newLocation);
        this.onRegionChange(newLocation);
      },
      error => console.log(error),  // TODO handle error
      { timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.onPositionChange(newLocation);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onPositionChange(myLocation) {
    this.props.updateMyPosition(myLocation);
  }

  onRegionChange(region) {
    this.props.updateRegion(region);
  }

  spotPressed(spot) {
    this.props.tapOnSpot(spot);
    Actions.spotDetail();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          ref={(ref) => { this.map = ref; }}
          mapType={MAP_TYPES.standard}
          style={styles.map}
          initialRegion={this.props.region}
          onRegionChange={region => this.onRegionChange(region)}
          onPress={() => this.props.tapOnSpot(null)}
        >
          <Marker
            coordinate={{ latitude: this.props.myLocation.latitude,
              longitude: this.props.myLocation.longitude }}
            pinColor="blue"
          />
          {this.props.items.map(marker => (
            <Marker
              coordinate={marker.latlng}
              pinColor="pink"
              onPress={() => this.props.tapOnSpot(marker)}
              key={marker.id}
            />
          ))}
        </MapView>
        {this.props.tappedSpot &&
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
        }
      </View>
    );
  }
}

MainMap.propTypes = {
  loadSpots: React.PropTypes.func,
  tokenRouter: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  region: React.PropTypes.shape({ }),  // TODO proper defintion
  myLocation: React.PropTypes.shape({ }),  // TODO proper defintion
  updateMyPosition: React.PropTypes.func,
  updateRegion: React.PropTypes.func,
  tapOnSpot: React.PropTypes.func,
};

MainMap.defaultProps = {
  items: [],
  tokenRouter: '',
  region: {},
  myLocation: {},
  loadSpots: () => {},
  updateMyPosition: () => {},
  updateRegion: () => {},
  tapOnSpot: () => {},
};

const mapStateToProps = ({ spotsReducer, mapReducer, routerReducer }) => {
  const { items } = spotsReducer;
  const { myLocation, region, tappedSpot } = mapReducer;
  const { tokenRouter } = routerReducer;
  return { items, myLocation, region, tokenRouter, tappedSpot };
};

export default connect(mapStateToProps, {
  loadSpots, updateMyPosition, updateRegion, tapOnSpot,
})(MainMap);
