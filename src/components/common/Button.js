import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SweetText } from './SweetText';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    width: 0.8 * width,
    borderWidth: 1,
    borderColor: '#007aff',
    margin: 5,
  },
  blueButtonText: {
    color: 'white',
  },
  blueButtonBackground: {
    backgroundColor: '#007aff',
  },
});

const { blueButtonText, blueButtonBackground, buttonStyle, textStyle } = styles;

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[buttonStyle, props.style, props.blue && blueButtonBackground]}
    >
      <SweetText style={[textStyle, props.style, props.blue && blueButtonText]}>
        {props.children}
      </SweetText>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  blue: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  style: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

Button.getDefaultProps = {
  children: null,
  blue: false,
  onPress: () => {},
  style: null,
};

export { Button };
