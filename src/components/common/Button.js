import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line
import { SweetText } from './SweetText';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: height < 600 ? 16 : 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    width: 0.85 * width,
    marginVertical: 5,
  },
  whiteButtonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#007aff',
  },
  blueButtonText: {
    color: 'white',
  },
  linearGradientStyle: {
    borderRadius: 5,
  },
});

const {
  blueButtonText,
  whiteButtonStyle,
  buttonStyle,
  linearGradientStyle,
  textStyle,
} = styles;

const Button = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[buttonStyle, props.style, props.white && whiteButtonStyle]}
  >
    <LinearGradient
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.9]}
      colors={props.blue ? ['#005bea', '#00c6fb'] : ['#fff', '#fff']}
      style={[props.style, linearGradientStyle]}
    >
      <SweetText style={[textStyle, props.style, props.blue && blueButtonText]}>
        {props.children}
      </SweetText>
    </LinearGradient>
  </TouchableOpacity>
);

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
  white: React.PropTypes.bool,
};

Button.getDefaultProps = {
  children: null,
  blue: false,
  onPress: () => {},
  style: null,
  white: false,
};

export { Button };
