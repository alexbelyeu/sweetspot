import React from 'react';
import MapView, { MAP_TYPES, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { loadSpots, /* updateMyPosition, updateRegion,*/ tapOnSpot } from '../../actions';
import SpotPreview from './SpotPreview';
import mapStyle from './mapStyle.json';
import LOGO from '../../assets/img/pin.png';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class Map extends React.Component {

  componentDidMount() {
    this.props.loadSpots(this.props.tokenRouter);
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const newLocation = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     };
    //     this.onPositionChange(newLocation);
    //     this.onRegionChange(newLocation);
    //   },
    //   error => console.log(error),  // TODO handle error
    //   { timeout: 20000, maximumAge: 1000 },
    // );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   const newLocation = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //   };
    //   this.onPositionChange(newLocation);
    // });
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }
  //
  // onPositionChange(myLocation) {
  //   this.props.updateMyPosition(myLocation);
  // }
  //
  // onRegionChange(region) {
  //   this.props.updateRegion(region);
  // }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          customMapStyle={mapStyle}
          initialRegion={this.props.region}
          mapType={MAP_TYPES.standard}
          onPress={() => null}
          provider={MapView.PROVIDER_GOOGLE}
          ref={(ref) => { this.map = ref; }}
          showsUserLocation
          style={styles.map}
        >
          {this.props.items.map(marker => (
            <Marker
              coordinate={marker.latlng}
              image={LOGO}
              onPress={() => this.props.tapOnSpot(marker)}
              key={marker.id}
            />
          ))}
        </MapView>
        {this.props.tappedSpot.isSelected && <SpotPreview /> }
      </View>
    );
  }
}

Map.propTypes = {
  loadSpots: React.PropTypes.func,
  tokenRouter: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  region: React.PropTypes.shape({
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
  }),
  // myLocation: React.PropTypes.shape({
  //   latitude: React.PropTypes.number,
  //   longitude: React.PropTypes.number,
  //   longitudeDelta: React.PropTypes.number,
  //   latitudeDelta: React.PropTypes.number,
  // }),
  // updateMyPosition: React.PropTypes.func,
  // updateRegion: React.PropTypes.func,
  tapOnSpot: React.PropTypes.func,
  tappedSpot: React.PropTypes.shape({
    name: React.PropTypes.string,
    promo: React.PropTypes.string,
    description: React.PropTypes.string,
    position: React.PropTypes.string,
    behind: React.PropTypes.string,
    behind_image: React.PropTypes.string,
    image: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
  }),
};

Map.defaultProps = {
  items: [],
  loadSpots: () => {},
  // myLocation: {},
  region: {},
  tokenRouter: '',
  tapOnSpot: () => {},
  tappedSpot: {
    name: '',
    promo: '',
    description: '',
    position: '',
    behind: '',
    behind_image: '',
    image: '',
    isSelected: false,
  },
  // updateMyPosition: () => {},
  // updateRegion: () => {},
};

const mapStateToProps = ({ spotsReducer, mapReducer, routerReducer }) => {
  const { items } = spotsReducer;
  const { region, tappedSpot } = mapReducer;
  const { tokenRouter } = routerReducer;
  return { items, region, tokenRouter, tappedSpot };
};

export default connect(mapStateToProps, { loadSpots, tapOnSpot })(Map);
