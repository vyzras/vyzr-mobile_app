import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';


const Button = ({ onPress, textCustomStyle, color, rightIconStyle, children, backIconStyle, backgroundColor, leftIconName, iconColor, rightIconName, disabled, style2, iconLeftSize, iconRightSize, textColor }) => {

  renderLeftIcon = () => {
    if (leftIconName) {
      return (
        <Image style={[styles.iconRight, backIconStyle]} source={leftIconName} width={iconLeftSize} height={iconLeftSize}></Image>
      )
    }
  }

  renderRightIcon = () => {
    if (rightIconName) {
      return (
        <Image source={rightIconName} style={rightIconStyle} width={iconRightSize} height={iconRightSize}></Image>
      )
    }
  }

  renderButton = () => {
    if (disabled) {
      return (
        <View style={[styles.buttonStyle, style2, { backgroundColor: backgroundColor, opacity: 0.4 }]}>
          {this.renderLeftIcon()}
          <Text style={[styles.textStyle, textCustomStyle]}>
            {children}
          </Text>
          {this.renderRightIcon()}
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style2, { backgroundColor: backgroundColor }]}>
          {this.renderLeftIcon()}
          <Text style={[styles.textStyle, textCustomStyle]}>
            {children}
          </Text>
          {this.renderRightIcon()}
        </TouchableOpacity>
      )
    }
  }


  return (
    <View>
      {this.renderButton()}
    </View>
  );
};

const styles = {
  textStyle: {
    color: '#4a4a4a',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold'
  },
  buttonStyle: {
    flexDirection: "row",
    backgroundColor: '#91dfd0',
    borderRadius: 3,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  },
  iconRight: {
    marginRight: 20
  }
};

export { Button };
