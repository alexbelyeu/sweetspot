import React from 'react';
import { TextInput, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#007aff',
    borderWidth: 1,
  },
  inputStyle: {
    flex: 4,
    color: '#000',
    paddingHorizontal: 10,
    fontSize: 18,
    width: 0.8 * width,
    height: 60,
  },
  labelStyle: {
    flex: 1,
    fontSize: 22,
    color: 'lightgray',
    paddingLeft: 20,
  },
});

const Input = (props) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, props.style]}>
      <TextInput
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      <Icon name={props.label} style={labelStyle} />
    </View>
  );
};

Input.propTypes = {
  autoCapitalize: React.PropTypes.oneOf(['none', 'sentences']),
  label: React.PropTypes.string.isRequired,
  onChangeText: React.PropTypes.func,
  placeholder: React.PropTypes.string.isRequired,
  secureTextEntry: React.PropTypes.bool,
  value: React.PropTypes.string.isRequired,
  style: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

Input.getDefaultProps = {
  autoCapitalize: 'sentences',
  onChangeText: () => {},
  secureTextEntry: false,
  style: null,
};

export { Input };
