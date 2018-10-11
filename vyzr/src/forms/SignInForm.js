import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Input, Spinner } from '../Components';
import { SignInFunction, resetForm, onSignOut, initializeForm } from '../actions';

class SignInForm extends Component {
  renderLoginButton() {
    const { textView, textStyle } = styles;
    const { handleSubmit } = this.props;
    console.log(this.props.userLogedIn)
    if (this.props.userLogedIn) {
      return (
        <View>
          {
            this.props.SignInStates.loading ?
              <Spinner />
              :
              <Button
                textCustomStyle={{ fontWeight: '600' }}
                style2={{ borderColor: '#fff', borderRadius: 8 }}
                backgroundColor={"#fff"}
                onPress={() => {
                  onSignOut().then(() => {
                    this.props.initializeForm('SignInForm', null)
                    this.props.logedOut();
                  })
                }}
              >
                Logout
            </Button>
          }

        </View>
      );
    }
    else {
      return (
        <View>
          {
            this.props.SignInStates.loading ?
              <Spinner />
              :
              <Button
                textCustomStyle={{ fontWeight: '600' }}
                style2={{ borderColor: '#fff', borderRadius: 8 }}
                backgroundColor={"#fff"}
                onPress={handleSubmit}
              >
                Log in
            </Button>
          }
          <View style={textView}>
            <Text style={textStyle}>Forgot password? </Text>
          </View>
        </View>
      );
    }
  }

  renderSocialMediaButtons() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ padding: 20, marginVertical: 30 }}>
        <View>
          <Button
            textCustomStyle={{ fontWeight: '600' }}
            style2={{ borderColor: '#fff', borderRadius: 8, marginBottom: 20 }}
            backgroundColor={"#fff"}
            onPress={handleSubmit}
          >
            LOG IN WITH FACEBOOK
            </Button>
        </View>
        <View>
          <Button
            textCustomStyle={{ fontWeight: '600' }}
            style2={{ borderColor: '#fff', borderRadius: 8 }}
            backgroundColor={"#fff"}
            onPress={handleSubmit}
          >
            LOG IN WITH LINKEDIN
            </Button>
        </View>
      </View>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { textView, textStyle, container, signUpTextStyle, fieldsContainer } = styles;
    return (
      <View style={container} >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode='contain'
            style={{ width: 150, height: 150 }}
            source={require('../assets/images/logo.png')}
            width={150}
            height={150}
          >
          </Image>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={fieldsContainer}>
            <Field
              name='email'
              placeholder="USERNAME OR EMAIL"
              component={Input}
              showImage={true}
              editable={!this.props.userLogedIn}
              imageName={require('../assets/images/user.png')}
              keyboardType='email-address'
              imageSize={15}
              customContainerStyle={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                width: '100%',
                height: 40,
                marginTop: 10,
                marginBottom: 10
              }}

              customImageStyle={{
                top: 12,
                marginRight: 5,
                marginLeft: 5,
              }}

            />
            <Field
              placeholder={'PASSWORD'}
              showImage={true}
              editable={!this.props.userLogedIn}
              imageName={require('../assets/images/password.png')}
              name='password'
              component={Input}
              keyboardType='default'
              imageSize={15}
              customContainerStyle={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                width: '100%',
                height: 40,
                marginTop: 10,
                marginBottom: 10
              }}

              customImageStyle={{
                top: 12,
                marginRight: 5,
                marginLeft: 5
              }}

              secureTextEntry
            />

            <Field
              name='list_name'
              placeholder="CASE LIST"
              component={Input}
              editable={!this.props.userLogedIn}
              showImage={true}
              imageName={null}
              keyboardType='default'
              imageSize={15}
              customContainerStyle={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                width: '100%',
                height: 40,
                marginTop: 10,
                marginBottom: 10
              }}

              customImageStyle={{
                top: 12,
                marginRight: 5,
                marginLeft: 5,
              }}

            />

            <Field
              name='server_url'
              placeholder="SERVER URL"
              component={Input}
              editable={!this.props.userLogedIn}
              showImage={true}
              imageName={null}
              keyboardType='default'
              imageSize={15}
              customContainerStyle={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                width: '100%',
                height: 40,
                marginTop: 10,
                marginBottom: 10
              }}

              customImageStyle={{
                top: 12,
                marginRight: 5,
                marginLeft: 5,
              }}

            />
          </View>

          <View style={{ flex: 1, justifyContent: 'space-around', paddingHorizontal: 50 }} >
            {this.renderLoginButton()}

          </View>
        </View>
        {/* {this.renderSocialMediaButtons()} */}

        {/* <View style={{ bottom: 0 }}>
          <Text style={textStyle}>Don't have an account? </Text>
        </View> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    marginVertical: 10
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: "600"
  },
  signUpTextStyle: {
    color: '#fff',
    fontWeight: "800"
  },
  fieldsContainer: {
    flex: 1,
    marginBottom: 20
  }
});

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be atleast 6 digits'
  } else if (!/^[0-9a-zA-Z.,'[@*{};'!?$&]+(([a-zA-Z])?[a-zA-Z]*)*$/g.test(values.password)) {
    errors.password = 'White spaces not allowed'
  }

  if (!values.list_name) {
    errors.list_name = 'Required';
  }

  if (!values.server_url) {
    errors.server_url = 'Required';
  }

  return errors;
};



const mapStateToProps = ({ SignInStates }) => {
  return { SignInStates };
};

SignInForm = connect(
  mapStateToProps, {
    SignInFunction,
    resetForm,
    onSignOut,
    initializeForm
  }
)(SignInForm);


SignInForm = reduxForm({ form: 'SignInForm', validate })(SignInForm);

export default SignInForm;