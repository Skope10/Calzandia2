import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { loadLocale } from './actions';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';

const statusHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

});

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.props.loadLocale();
    this.state = { isLoggedIn: false };
  }

  choosePage = () => {
    if (this.state.loggedInStatus) {
      return (
        <HomePage/>
      )
    } else {
      return (
        <LoginPage screenProps={{ isLoggedIn: () => this.setState({ loggedInStatus: true }) }} />
      )
    }
  }

  render() {

    //if (!accessToken) {
    //return ( <LoginForm />) ;
    //}

    return (
      <View style={{ marginTop: statusHeight, flex: 1, }}>
        {this.choosePage()}
      </View>
    )
  }
}

export default connect(null, {
  loadLocale,
})(AppRouter);