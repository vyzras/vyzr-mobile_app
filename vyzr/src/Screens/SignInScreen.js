import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import SignInForm from '../forms/SignInForm';
import SplashScreen from '../Screens/SplashScreen';
import { NavigationActions, StackActions } from 'react-navigation';
import { Footer } from '../Components'
import { onSignIn, signInFunction } from '../actions';
import { baseUrl } from '../config/BaseUrl';

class SignInScreen extends Component {

  state = { newUser: undefined, user: null }

  componentWillMount() {
    AsyncStorage.getItem('user-exist', (err, result) => {
      if (result !== null) {
        let user = JSON.parse(result);
        console.log(user);
        this.setState({ user: user });
      }
    });
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
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <ScrollView style={{ backgroundColor: '#4a4a4a' }}>
            <View style={{ padding: 30, }}>
              {this.state.user ?
                <SignInForm
                  userLogedIn={true}
                  logedOut={() => {
                    this.setState({ user: null })
                  }}
                />
                :
                <SignInForm
                  onSubmit={(values) => {
                    this.props.signInFunction(`${baseUrl}sign_in`, JSON.stringify({
                      "users": {
                        "user_name": values.email,
                        "password": values.password,
                        "list_name": values.list_name,
                        "server_url": values.server_url
                      }
                    }));

                  }}
                />
              }

            </View>

          </ScrollView>
          {this.state.user ?
            <Footer
              backgroundColor="#4a4a4a"
              borderTopColor="#f5f5f5"
              screen={'home'}
              home={() => { this.props.navigation.navigate('HomeScreen') }}
              overview={() => { this.props.navigation.navigate('OverviewScreen') }}
              registration={() => { this.props.navigation.navigate('Registration') }}
            /> : null}
        </View>
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
