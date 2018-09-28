import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

class OverviewCard extends Component {
  render() {
    const { smallCardView, textStyle, cirleView } = styles
    return (
      <View style={smallCardView}>
        <Text style={[textStyle, { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', marginBottom: 3 }]}>{this.props.title}</Text>
        <Text style={[textStyle, { fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', marginBottom: 8 }]}>{this.props.company}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View >
            <Text style={[textStyle, { fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium', marginBottom: 3 }]}>By: <Text style={{ fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold' }}>{this.props.sender}</Text></Text>
            <Text style={[textStyle, { fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium', fontWeight: '400' }]}>{this.props.date}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={[cirleView, { backgroundColor: this.props.color }]}>
            </View>
            <Text style={{ fontSize: 16, color: this.props.color, fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium' }}>{this.props.status}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  smallCardView: {
    flex:1,
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