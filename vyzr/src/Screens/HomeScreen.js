import React from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { onSignOut, initializeForm } from '../actions';
import { connect } from 'react-redux';
import { Header, Footer } from '../Components'
class HomeScreen extends React.Component {
  state = { user: null }
  componentWillMount() {
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        let user = JSON.parse(result);
        this.setState({ user: user });
      }
    });
  }
  render() {
    const { smallCardView, cardView, cardTextStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Header
          backgroundColor="#4a4a4a"
          title="VYZR FEEDBACK"
        />
        <ScrollView>
          <View style={{ padding: 10, paddingBottom: 50 }}>
            <TouchableOpacity style={smallCardView}
              onPress={() => {
                this.props.navigation.navigate('SignedOut');
                this.props.initializeForm('SignInForm', this.state.user);
              }}>
              {this.state.user ? <Text style={{ textAlign: 'center', color: '#fff', fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold', fontSize: 18 }}>{this.state.user.email}</Text> : null}
            </TouchableOpacity>

            <TouchableOpacity style={cardView}
              onPress={() => {
                this.props.navigation.navigate('Registration')
              }}>
              <Image source={require('../assets/images/feedback.png')} style={{ marginBottom: 15, height: 50, width: 50 }} height={50} width={50} />
              <Text style={cardTextStyle}>GIVE FEEDBACK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={cardView}
              onPress={() => {
                this.props.navigation.navigate('OverviewScreen')
              }}>
              <Image source={require('../assets/images/overview.png')} style={{ marginBottom: 15, height: 50, width: 50 }} height={50} width={50} />
              <Text style={cardTextStyle}>OVERVIEW</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer
          screen={'home'}
          home={() => { }}
          overview={() => { this.props.navigation.navigate('OverviewScreen') }}
          registration={() => { this.props.navigation.navigate('Registration') }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallCardView: {
    backgroundColor: '#4a4a4a',
    padding: 30,
    borderRadius: 8,
    marginVertical: 7

  },
  cardView: {
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderRadius: 8,
    marginVertical: 7
  },
  cardTextStyle: {
    fontSize: 22,
    color: '#4a4a4a',
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold'
  }
});

export default connect('', { onSignOut, initializeForm })(HomeScreen)