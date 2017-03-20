import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Gujarati Sangam MN' : 'Roboto',
  },
});

const SweetText = (props) => {
  return (
    <Text style={[styles.textStyle, props.style]}>{props.children}</Text>
  );
};

SweetText.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  style: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

SweetText.getDefaultProps = {
  children: null,
  style: null,
};

export { SweetText };
