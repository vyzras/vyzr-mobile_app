import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AppIntro from 'react-native-app-intro';
const { width, height } = Dimensions.get('window');

class SplashScreen extends Component {

  render() {

    const { container, outerSplash, innerSplash, skipTextStyle } = styles;
    return (
      <View style={container}>
        <View style={outerSplash}>
          <Text
            style={skipTextStyle}
            onPress={this.props.onPress}
          >
            Skip
          </Text>

          <AppIntro
            showDots={true}
            showDoneButton={false}
            showSkipButton={false}
            nextBtnLabel=''
            dotColor='transparent'
            customStyles={{
              activeDotStyle: {
                backgroundColor: '#f5f5f5',
              },
              dotStyle: {
                borderWidth: 1,
                borderColor: '#f5f5f5',
                width: 8,
                height: 8,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              },
              paginationContainer: {
                bottom: 10,
              }
            }}
          >
            <View style={[innerSplash, { flex: 1, position: 'relative' }]}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assets/images/screen1.png')}
              >
              </Image>

            </View>

            <View style={innerSplash}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assets/images/screen2.png')}
              >
              </Image>
            </View>

            <View style={innerSplash}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assets/images/screen3.png')}
              >
              </Image>
            </View>

          </AppIntro>


        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  outerSplash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },

  innerSplash: {
    alignItems: 'center',
  },
  skipTextStyle: {
    position: 'absolute',
    color: '#fff',
    zIndex: 5555,
    right: 40,
    top: 50,
    fontSize: 18,
    fontWeight: '600'
  }
});

export default SplashScreen;