import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  textStyle: {
    fontSize: height < 600 ? 16 : 20,
    fontFamily: 'Avenir',
    backgroundColor: 'transparent',
    color: 'darkgray',
  },
});

const SweetText = props => {
  return (
    <Text onPress={props.onPress} style={[styles.textStyle, props.style]}>
      {props.children}
    </Text>
  );
};

SweetText.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  onPress: React.PropTypes.func,
  style: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

SweetText.getDefaultProps = {
  children: null,
  onPress: () => {},
  style: null,
};

export { SweetText };
