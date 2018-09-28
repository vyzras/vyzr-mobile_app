import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';

class Header extends Component {
  render() {
    const { iconsViewStyle } = styles;
    return (
      <View style={{ backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#fff' }}>
        <View style={iconsViewStyle}>
          <TouchableOpacity
            style={{ flex: 0.2 }}
            onPress={this.props.onPress}
          >
            <Image source={this.props.imageName} />
          </TouchableOpacity>

          <Text style={{ textAlign: "center", flex: 0.6, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', fontSize: 18, color: this.props.textColor ? this.props.textColor : "#fff" }}>{this.props.title}</Text>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  iconsViewStyle: {
    padding: 10,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5,
    paddingVertical: 15
  },
})

export { Header };
