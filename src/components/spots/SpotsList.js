import React, { Component } from 'react';
import { View, Text, Image, ListView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common';
import { tapOnSpot, switchTab } from '../../actions';

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
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

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items),
    });
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
    this.props.switchTab(2);  // TODO remove hardcoded index
  }

  render() {
    const { dataLoaded, error } = this.props;
    if (!dataLoaded && error === '') {
      return (
        <Spinner size="large" />
      );
    } else if (error !== '') {
      return (
        <Text style={styles.errorTextStyle}>
          {error}
        </Text>
      );
    }
    // TODO rescribe Row as a separate component
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={spot => (
          <TouchableWithoutFeedback
            onPress={() => this.rowPressed(spot)}
          >
            <View key={spot.name}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: spot.image }}
              />
              <Text>
                {spot.name} - {spot.promo}
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
  switchTab: React.PropTypes.func,
};

SpotsList.defaultProps = {
  items: [],
  tapOnSpot: () => {},
  switchTab: () => {},
};

const mapStateToProps = ({ spotsReducer }) => {
  const { items, dataLoaded, error } = spotsReducer;
  return { items, dataLoaded, error };
};

export default connect(mapStateToProps, { tapOnSpot, switchTab })(SpotsList);
