import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import SignInForm from '../forms/SignInForm';
import SplashScreen from '../Screens/SplashScreen';
import { NavigationActions, StackActions } from 'react-navigation';
import { onSignIn, signInFunction } from '../actions';
import { baseUrl } from '../config/BaseUrl';

class SignInScreen extends Component {

  state = { newUser: undefined }

  componentWillMount() {
    try {
      AsyncStorage.getItem('novice', (err, result) => {
        if (result !== null && result === "true") {
          this.setState({ "newUser": true });
        } else {
          this.setState({ "newUser": false });
        }
      });
    }
    catch (error) {
    };
  }

  componentWillReceiveProps(nextProps) {
    const actionToDispatch = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "SignedIn" })]
    })
    if (nextProps.SignInStates.response) {
      if (nextProps.SignInStates.response.data.success) {
        let user = nextProps.SignInStates.response.data.data.user;
        user['user_token'] = nextProps.SignInStates.response.data.data.user_token
        AsyncStorage.setItem(
          'user',
          JSON.stringify(user),
          () =>
            onSignIn().then(() => {
              this.props.navigation.dispatch(actionToDispatch)
            })
        );
      } else if (nextProps.SignInStates.response.data.status === 500) {
        Alert.alert(
          "Error",
          nextProps.SignInStates.response.data.error,
          [
            {
              text: 'OK', onPress: () => {
              }
            }
          ]
        )
      }
      else if (nextProps.SignInStates.response.data.error) {
        Alert.alert(
          "Error",
          nextProps.SignInStates.response.data.error,
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

  render() {
    if (this.state.newUser === true) {
      return (
        <ScrollView style={{ backgroundColor: '#4a4a4a' }}>
          <View style={{ padding: 30, }}>
            <SignInForm
              onSubmit={(values) => {
                let users = {
                  "user_name": values.email,
                  "password": values.password
                }
                this.props.signInFunction(`${baseUrl}sign_in`, JSON.stringify({
                  "users": {
                    "user_name": values.email,
                    "password": values.password,
                    "list_name": values.list,
                    "server_url": values.url
                  }
                }));

              }}
            />
          </View>
        </ScrollView>
      );
    }
    else if (this.state.newUser === false) {
      return (
        <SplashScreen
          onPress={() => {
            try {
              AsyncStorage.setItem('novice', "true");
              this.setState({ "newUser": true });
            } catch (error) { }
          }}
        />
      )
    } else {
      return null;
    }
  }

}

const mapStateToProps = ({ SignInStates }) => {
  return { SignInStates };
};

export default connect(mapStateToProps, { onSignIn, signInFunction })(SignInScreen);
