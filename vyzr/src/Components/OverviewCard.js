import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class OverviewCard extends Component {
  render() {
    const { smallCardView, textStyle, cirleView } = styles
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={smallCardView}>
        <View style={{ flex: 0.8 }}>
          <Text style={[textStyle, { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', marginBottom: 3 }]}>{this.props.title}</Text>
          <Text style={[textStyle, { fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium', fontWeight: '400' }]}>{this.props.date}</Text>
        </View>
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' }}>
          <View style={[cirleView, { backgroundColor: this.props.color }]}></View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  smallCardView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4a4a4a',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 7
  },
  textStyle: {
    color: '#fff'
  },
  cirleView: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: 'yellow',
    marginRight: 5
  },
})

export { OverviewCard }