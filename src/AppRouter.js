import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  loadLocale,
} from './actions';
import LoginPage from './components/Login/LoginPage';

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
  }
	render() {

		//if (!accessToken) {
		//return ( <LoginForm />) ;
		//}

		return (
			<View style={styles.container}>
				<LoginPage/>
			</View>
		);
	}
}

export default connect(null, {
	loadLocale,
})(AppRouter);