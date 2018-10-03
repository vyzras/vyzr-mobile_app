import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, Keyboard, AsyncStorage, Alert, RefreshControl } from 'react-native';
import { Header, OverviewCard, Footer, Spinner } from '../Components';
import { baseUrl } from '../config/BaseUrl';
import { getOverviewFunction, getOverviewResetStates } from '../actions';
import { connect } from 'react-redux';

var refreshing = false;

class OverviewScreen extends Component {
  componentWillMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GetOverviewStates.response) {
      if (nextProps.GetOverviewStates.response.data.error) {
        Alert.alert(
          "Error",
          nextProps.GetOverviewStates.response.data.error,
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

  fetchData() {
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        let user = JSON.parse(result);
        this.setState({ user: user });
        this.props.getOverviewFunction(`${baseUrl}items`, user.user_token)
      }
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
    refreshing = true;
  }

  refreshState() {
    if (!this.props.GetOverviewStates.loading) {
      refreshing = false
    }
  }

  componentDidMount() {
    Keyboard.dismiss()
  }

  dateFormat(value) {
    let date = new Date(value)
    let month = date.getMonth() + 1
    return date.getDate() + "-" + month + "-" + date.getFullYear()
  }

  renderCard() {
    if (this.props.GetOverviewStates.loading) {
      return <Spinner color="#4a4a4a" />
    } else {
      if (this.props.GetOverviewStates.response) {
        if (this.props.GetOverviewStates.response.data.success) {
          return (
            this.props.GetOverviewStates.response.data.data.map((data, i) => {
              return (
                <OverviewCard
                  key={i}
                  title={data.title}
                  company={data.description}
                  sender={data.user_name ? date.user_name : "Anonymous"}
                  date={this.dateFormat(data.created_at)}
                  color={
                    data.complete_percentage * 100 === 1
                      ?
                      "#7fb787"
                      :
                      data.complete_percentage * 100 === 0 ?
                        '#c65d5d'
                        : "#fff"
                  }
                  status={data.status}
                />
              )
            })
          )
        }
      }
    }
  }



  render() {
    const { cirleView, tagsViewStyle, textStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Header
          imageName={require('../assets/images/BackwardArrow.png')}
          backgroundColor="#4a4a4a"
          title="OVERVIEW"
          onPress={() => { this.props.navigation.navigate('HomeScreen') }}
        />
        {this.refreshState()}
        <ScrollView style={{  }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
              progressBackgroundColor='#fff'
              tintColor="#4a4a4a"
              colors={["#4a4a4a"]}
            />
          }
        >
          <View style={{padding: 15, paddingBottom: 70 }}>
            {/* <View style={{ paddingVertical: 15, paddingHorizontal: 40 }}>
              <View style={tagsViewStyle}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={cirleView}>
                  </View>
                  <Text style={textStyle}>All</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={[cirleView, { backgroundColor: '#7fb787' }]}>
                  </View>
                  <Text style={textStyle}>Resolved</Text>
                </View>


              </View>

              <View style={tagsViewStyle}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={[cirleView, { backgroundColor: '#c65d5d' }]}>
                  </View>
                  <Text style={textStyle}>Registered</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={[cirleView, { backgroundColor: '#eadc79' }]}>
                  </View>
                  <Text style={textStyle}>Under review</Text>
                </View>


              </View> */}
            {/* </View> */}
            <View style={{ marginLeft: 0 }}>
              {this.renderCard()}
            </View>
          </View>
        </ScrollView>

        <Footer
          screen = {'overview'}
          home={() => { this.props.navigation.navigate('HomeScreen') }}
          overview={() => { }}
          registration={() => { this.props.navigation.navigate('Registration') }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagsViewStyle: {
    flexDirection: 'row',
    marginBottom: 10
  },
  cirleView: {
    height: 18,
    width: 18,
    borderRadius: 25,
    backgroundColor: '#4a4a4a',
    marginRight: 10
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
    fontSize: 18,
    color: '#4a4a4a',
    fontWeight: '700'
  },
  textStyle: {
    color: '#4a4a4a',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold'
  }
});

const mapStateToProps = ({ GetOverviewStates }) => {
  return { GetOverviewStates }
}

export default connect(mapStateToProps, {
  getOverviewFunction, getOverviewResetStates
})(OverviewScreen)