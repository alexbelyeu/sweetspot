import React, { Component } from 'react';
import { View, Image, ListView, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line
import { Spinner, SweetText } from '../common';
import { tapOnSpot } from '../../actions';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'crimson',
  },
  row: {
    height: 0.2 * height,
    backgroundColor: 'transparent',
  },
  linearGradientStyle: {
    width,
    height: 0.167 * height,
  },
  image: {
    width,
    height: 0.167 * height,
    opacity: 0.8,
  },
  promo: {
    position: 'absolute',
    fontSize: 18,
    left: 10,
    top: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    position: 'absolute',
    left: 10,
    top: 30,
    color: 'white',
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width,
    height: 0.05 * height,
    bottom: 0.05 * height,
    backgroundColor: 'white',
  },
  bottomBarElements: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    marginRight: 5,
    fontSize: 12,
    // color: '#007aff',
  },
  distance: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
  priceContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
  },
  price: {
    fontSize: 22,
    color: '#514949',
  },
});

class SpotsList extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataLoaded: false,
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items && nextProps.items.length !== 0) {
      this.setState({
        items: nextProps.items,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
      });
    }
  }

  rowPressed(spot) {
    this.props.tapOnSpot(spot);
    Actions.spotdetail();
  }

  render() {
    const { dataLoaded, error } = this.props;
    if (!dataLoaded && error === '') {
      return (
        <Spinner size="large" />
      );
    } else if (error !== '') {
      return (
        <SweetText style={styles.errorTextStyle}>
          {error}
        </SweetText>
      );
    }
    // TODO rescribe Row as a separate component
    // {name, promo, image, description, image, behind, behind_image} = spot
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={spot => (
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => this.rowPressed(spot)}
            >
              <View>
                <LinearGradient
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  locations={[0, 0.5]}
                  colors={['transparent', 'black']}
                  style={styles.linearGradientStyle}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: spot.image }}
                  />
                  <SweetText style={styles.promo}>
                    {spot.promo}
                  </SweetText>
                  <SweetText style={styles.name}>
                    {spot.name}
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
          </View>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} />}
      />
    );
  }
}

SpotsList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  dataLoaded: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string.isRequired,
  tapOnSpot: React.PropTypes.func,
};

SpotsList.defaultProps = {
  items: [],
  tapOnSpot: () => {},
};

const mapStateToProps = ({ spotsReducer }) => {
  const { items, dataLoaded, error } = spotsReducer;
  return { items, dataLoaded, error };
};

export default connect(mapStateToProps, { tapOnSpot })(SpotsList);
