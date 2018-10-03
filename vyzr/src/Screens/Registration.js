import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, TouchableOpacity, Alert, Platform, AsyncStorage,Dimensions } from 'react-native';
import { Header, Footer, Input, Spinner } from '../Components';
import PhotoUpload from 'react-native-photo-upload';
import { connect } from 'react-redux';
import { createFeedbackFunction, createFeedbackResetStates, getOverviewFunction } from '../actions';
import { baseUrl } from '../config/BaseUrl';
const { width, height } = Dimensions.get('window');
var d = new Date()
var showDate = d.toString().split(' ')[0] + " " + d.getHours() + ":" + d.getMinutes();
class Registration extends Component {
  state = {
    user: null,
    checked: false,
    title: null,
    description: null,
    avatar: null,
    res: null,

  }

  componentWillMount() {
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        let user = JSON.parse(result);
        this.setState({ user: user });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.CreateFeedbackStates.response) {
      if (nextProps.CreateFeedbackStates.response.data.success) {
        this.setState({ title: null, description: null, avatar: null })
        this.props.getOverviewFunction(`${baseUrl}items`, this.state.user.user_token)
        this.props.navigation.navigate('OverviewScreen')
      }
      if (nextProps.CreateFeedbackStates.response.data.error) {
        Alert.alert(
          "Error",
          nextProps.CreateFeedbackStates.response.data.error,
          [
            {
              text: 'OK', onPress: () => {
              }
            }
          ]
        )
      }
    }
  }

  imageSource() {
    if (!this.state.avatar) {
      return require('../assets/images/UploadImage.png');
    }
    return { uri: this.state.avatar }
  }

  photoUpload() {
    return (
      <PhotoUpload
        onPhotoSelect={(avatar) => {
          if (avatar) {
            this.setState({ avatar: 'data:image/png;base64,' + avatar });
          }
        }}
      >
        {
          <Image source={this.imageSource()} resizeMode='contain' style={{ width: width, height: 145 }} />
        }
      </PhotoUpload>
    )
  }

  render() {
    const { paddingContainer, checkBoxStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#4a4a4a' }}>
        <Header
          imageName={require('../assets/images/BlackBackwardArrow.png')}
          title="GIVE FEEDBACK"
          textColor="#4a4a4a"
          onPress={() => { this.props.navigation.navigate('HomeScreen') }}
        />
        <ScrollView>
          <View style={paddingContainer}>
            <Input
              value={this.state.title}
              meta=''
              name="title"
              placeholder="Title..."
              keyboardType='default'
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
              onChangeText={(value) => {
                this.setState({ title: value })
              }}
            />
            {this.state.title === '' ?
              <Text style={{ color: "#fff", textAlign: 'right' }}>Required</Text>
              :
              null
            }
            <Input
              value={this.state.description}
              meta=''
              name="text"
              placeholder="Text..."
              keyboardType='default'
              multiline={true}
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
              onChangeText={(value) => {
                this.setState({ description: value })
              }}
            />
            {this.state.description === '' ?
              <Text style={{ color: "#fff", textAlign: 'right' }}>Required</Text>
              :
              null
            }
            <View style={{ marginTop: 30 }} >
              {/* <Text style={{ color: '#fff', right: 120, top: -2, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold' }}>{showDate}</Text> */}
              {this.photoUpload()}
            </View>
            {this.props.CreateFeedbackStates.loading ?
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Spinner />
              </View>
              :

              <View style={{ marginTop: 30 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={checkBoxStyle}
                    onPress={() => {
                      this.setState({ checked: !this.state.checked })
                    }}
                  >
                    {this.state.checked ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 10, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', fontSize: 16, color: '#fff' }}>Anonymous</Text>
                </View> */}
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff', padding: 10, borderRadius: 8 }}
                    onPress={() => {
                      if (this.state.title === null) {
                        this.setState({ title: '' })
                      }
                      if (this.state.description === null) {
                        this.setState({ description: '' })
                      }

                      if (this.state.title && this.state.description) {
                        let items = {};
                        items['title'] = this.state.title;
                        items['description'] = this.state.description;
                        items['anonymous'] = this.state.checked ? "YES" : "NO"
                        this.state.avatar ? items['image'] = this.state.avatar : null
                        items = { items }
                        this.props.createFeedbackFunction(`${baseUrl}items`, items, this.state.user.user_token)
                      }
                    }}
                  >
                    <Text style={{ marginRight: 10, fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', fontSize: 16, color: '#fff' }}>Send feedback</Text>
                    <Image source={require('../assets/images/sent.png')} style={{ height: 20, width: 20 }} />
                  </TouchableOpacity>

              </View>
            }
          </View>
        </ScrollView>
        <Footer
          backgroundColor="#4a4a4a"
          borderTopColor="#f5f5f5"
          screen={'Register'}
          home={() => { this.props.navigation.navigate('HomeScreen') }}
          overview={() => {
            this.setState({ title: null, description: null, avatar: null })
            this.props.navigation.navigate('OverviewScreen')
          }}
          registration={() => { }}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  paddingContainer: {
    padding: 35,
    paddingBottom: 70
  },
  checkBoxStyle: {
    height: 22,
    width: 22,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4
  }

});

const mapStateToProps = ({ CreateFeedbackStates }) => {
  return { CreateFeedbackStates }
}

export default connect(mapStateToProps, { createFeedbackFunction, getOverviewFunction, createFeedbackResetStates })(Registration)