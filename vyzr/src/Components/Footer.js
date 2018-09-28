import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

class Footer extends Component {
  render() {
    const { container, imageStyle, imageViewStyle } = styles;
    return (
      <View
        style={
          [
            container,
            {
              backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#f5f5f5',
              borderTopColor: this.props.borderColor ? this.props.borderColor : "#d3d3d3"
            }
          ]
        }
      >

        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity onPress={this.props.home} style={[imageViewStyle, { marginRight: 20 }]}>
            {this.props.backgroundColor ?
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/home.png')} />
              :
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/home-b.png')} />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.overview} style={[imageViewStyle, { marginRight: 20 }]}>
            {this.props.backgroundColor ?
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/list.png')} />
              :
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/list-b.png')} />
            }

          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.registration} style={[imageViewStyle, { marginRight: 20 }]}>
            {this.props.backgroundColor ?
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/add.png')} />
              :
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/add-b.png')} />
            }

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity onPress={() => {}} style={imageViewStyle}>
            {this.props.backgroundColor ?
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/footeruser.png')} height={25} width={25} />
              :
              <Image style={imageStyle} resizeMode='contain' source={require('../assets/images/user-b.png')} height={25} width={25} />
            }

          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'space-between',
    borderTopWidth: 1
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  imageViewStyle: {
    padding: 10
  }
})

export { Footer };
