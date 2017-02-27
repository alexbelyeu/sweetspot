import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  const styles = {
    containerStyle: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
    },
  };

  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

Card.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

Card.getDefaultProps = {
  children: null,
};

export { Card };
