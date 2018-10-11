import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { Header, OverviewCard, Footer, Spinner, Input } from '../Components';
import { connect } from 'react-redux';
import { baseUrl } from '../config/BaseUrl';

var refreshing = false;
const { width, height } = Dimensions.get('window');

class OverViewDetailScreen extends Component {
  componentWillMount() {
    console.log(this.props.navigation.state.params);
  }

  getStatus() {
    if (this.props.navigation.state.params.complete_percentage * 100 === 1) {
      return 'Finished';
    }
    else if (this.props.navigation.state.params.complete_percentage * 100 === 0) {
      return 'Not Finished';
    }
  }

  getImage() {
    console.log("http://vyzrbackend.mashup.li/" + this.props.navigation.state.params.image_url.url)
    return "http://vyzrbackend.mashup.li" + this.props.navigation.state.params.image_url.url
  }


  render() {
    const { paddingContainer, TextStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#4a4a4a' }}>
        <Header
          imageName={require('../assets/images/BackwardArrow.png')}
          backgroundColor="#4a4a4a"
          title={this.props.navigation.state.params.title}
          onPress={() => { this.props.navigation.navigate('OverviewScreen') }}
        />

        <ScrollView>
          <View style={paddingContainer}>

            <Input
              meta=''
              placeholder={this.props.navigation.state.params.title}
              keyboardType='default'
              editable={false}
              customContainerStyle={{
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 8,
                height: 50,
                marginTop: 10,
                marginBottom: 10
              }}
              customInputStyle={{
                fontSize: 18,
              }}
            />

            <Input
              meta=''
              placeholder={this.props.navigation.state.params.description}
              keyboardType='default'
              multiline={true}
              editable={false}
              numberOfLines={5}
              customContainerStyle={{
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 8,
                marginTop: 10,
                marginBottom: 10,
                height: 150,
                paddingTop: Platform.Os === 'ios' ? 15 : 0,
                textAlignVertical: 'top',
              }}
              customInputStyle={{
                fontSize: 18,
              }}
            />
            <View style={{ marginTop: 30 }} >
              {this.props.navigation.state.params.attachment_url ?
                <Image source={{ uri: this.getImage() }} resizeMode='contain' style={{ width: '100%', height: 145 }} />
                : null}
            </View>

          </View>
        </ScrollView>

        <Footer
          screen={'overview'}
          home={() => { this.props.navigation.navigate('HomeScreen') }}
          overview={() => { }}
          registration={() => { this.props.navigation.navigate('Registration') }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 14,
    paddingHorizontal: 15,
    flex: 1,
    position: 'relative',
    top: 0,
    textAlign: "left",
    color: "#fff",
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium'
  },
  paddingContainer: {
    padding: 35
  },
  smallCardView: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 7
  },
  cirleView: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: 'yellow',
    marginRight: 5
  },
  textStyle1: {
    flex: 0.6,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold',
    fontSize: 18
  },
  textStyle: {
    flex: 0.4,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold',
    fontSize: 18
  }
});

const mapStateToProps = ({ GetOverviewStates }) => {
  return { GetOverviewStates }
}

export default connect(mapStateToProps, {
})(OverViewDetailScreen)