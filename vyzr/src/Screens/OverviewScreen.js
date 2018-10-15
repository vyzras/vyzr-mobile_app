import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Platform, Keyboard, AsyncStorage, Alert, RefreshControl } from 'react-native';
import { Header, OverviewCard, Footer, Spinner } from '../Components';
import { baseUrl } from '../config/BaseUrl';
import { getOverviewFunction, getOverviewResetStates } from '../actions';
import { connect } from 'react-redux';

var refreshing = false;

class OverviewScreen extends Component {
  state = {
    user: null,
    ascOrderChecked: true,
    descOrderChecked: false,
    inCompleteChecked: false,
    completeChecked: false,
    ownCases: true,
  }

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

  fetchData(filter = "desc", ownCases = true) {
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        let user = JSON.parse(result);
        this.setState({ user: user });
        this.props.getOverviewFunction(`${baseUrl}items?order=${filter}&own=${ownCases}`, user.user_token)
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

  renderInCompleteCard() {
    if (this.props.GetOverviewStates.loading) {
      return null
    } else {
      if (this.props.GetOverviewStates.response) {
        if (this.props.GetOverviewStates.response.data.success) {
          return (
            this.props.GetOverviewStates.response.data.data.map((data, i) => {
              if (data.complete_percentage * 100 === 0) {
                return (
                  <OverviewCard
                    onPress={() => this.props.navigation.navigate('OverViewDetailScreen', data)}
                    key={i}
                    title={data.title}
                    company={data.description}
                    sender={data.user_name ? date.user_name : "Anonymous"}
                    date={this.dateFormat(data.created_time)}
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
              }
            })
          )
        }
      }
    }
  }

  renderCompletedCard() {

    if (this.props.GetOverviewStates.loading) {
      return <Spinner color="#4a4a4a" />
    } else {
      if (this.props.GetOverviewStates.response) {
        if (this.props.GetOverviewStates.response.data.success) {
          return (
            this.props.GetOverviewStates.response.data.data.map((data, i) => {
               if (data.complete_percentage * 100 === 1) {
                return (
                  <OverviewCard
                    onPress={() => this.props.navigation.navigate('OverViewDetailScreen', data)}
                    key={i}
                    title={data.title}
                    company={data.description}
                    sender={data.user_name ? date.user_name : "Anonymous"}
                    date={this.dateFormat(data.created_time)}
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
              }
            })
          )
        }
      }
    }
  }



  render() {
    const { cirleView, tagsViewStyle, textStyle, checkBoxStyle, checkBoxTextStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Header
          imageName={require('../assets/images/BackwardArrow.png')}
          backgroundColor="#4a4a4a"
          title="OVERVIEW"
          onPress={() => { this.props.navigation.navigate('HomeScreen') }}
        />
        {this.refreshState()}
        <ScrollView style={{}}
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
          <View style={{ padding: 15, paddingBottom: 70 }}>
            {/* <View style={{ paddingVertical: 15, paddingHorizontal: 40 }}>
              <Text>Order by date:</Text>
              <View style={tagsViewStyle}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={checkBoxStyle}
                      onPress={() => {
                        let filter = this.state.ascOrderChecked ? "asc" : undefined
                        this.fetchData(filter);
                        if (this.state.descOrderChecked) {
                          this.setState({ descOrderChecked: false });
                        }
                        this.setState({ ascOrderChecked: !this.state.ascOrderChecked });
                      }}
                    >
                      {this.state.ascOrderChecked ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                    </TouchableOpacity>
                    <Text style={checkBoxTextStyle}>Accending</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={checkBoxStyle}
                      onPress={() => {
                        let filter = !this.state.descOrderChecked ? "desc" : undefined
                        this.fetchData(filter);
                        if (this.state.ascOrderChecked) {
                          this.setState({ ascOrderChecked: false });
                        }
                        this.setState({ descOrderChecked: !this.state.descOrderChecked });
                      }}
                    >
                      {this.state.descOrderChecked ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                    </TouchableOpacity>
                    <Text style={checkBoxTextStyle}>Decending</Text>
                  </View>
                </View>
              </View>

              <Text>Filter:</Text>
              <View style={tagsViewStyle}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={checkBoxStyle}
                      onPress={() => {
                        if (this.state.inCompleteChecked) {
                          this.setState({ inCompleteChecked: false })
                        }
                        this.setState({ completeChecked: !this.state.completeChecked })
                      }}
                    >
                      {this.state.completeChecked ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                    </TouchableOpacity>
                    <Text style={checkBoxTextStyle}>Completed</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={checkBoxStyle}
                      onPress={() => {
                        if (this.state.completeChecked) {
                          this.setState({ completeChecked: false })
                        }
                        this.setState({ inCompleteChecked: !this.state.inCompleteChecked })
                      }}
                    >
                      {this.state.inCompleteChecked ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                    </TouchableOpacity>
                    <Text style={checkBoxTextStyle}>In Complete</Text>
                  </View>
                </View>
              </View>

              <Text>Filter:</Text>
              <View style={tagsViewStyle}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={checkBoxStyle}
                      onPress={() => {
                        this.fetchData(undefined, !this.state.ownCases);
                        this.setState({ ownCases: !this.state.ownCases });
                      }}
                    >
                      {this.state.ownCases ? <Image source={require('../assets/images/tick.png')} style={{ height: 18, width: 18 }} /> : null}
                    </TouchableOpacity>
                    <Text style={checkBoxTextStyle}>Own Cases</Text>
                  </View>
                </View>

              </View>
            </View> */}
            <View style={{ marginLeft: 0 }}>
              {this.renderInCompleteCard()}
              {this.renderCompletedCard()}
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
  checkBoxTextStyle: {
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold',
    fontSize: 16,
    color: '#000'
  },
  textStyle: {
    color: '#4a4a4a',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'AvenirLT-Black' : 'Avenir-Bold'
  },
  checkBoxStyle: {
    height: 22,
    width: 22,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4
  }
});

const mapStateToProps = ({ GetOverviewStates }) => {
  return { GetOverviewStates }
}

export default connect(mapStateToProps, {
  getOverviewFunction, getOverviewResetStates
})(OverviewScreen)