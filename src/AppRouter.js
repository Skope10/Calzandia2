import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

});

class AppRouter extends React.Component {

	render() {

		//if (!accessToken) {
		//return ( <LoginForm />) ;
		//}

		return (
			<View style={styles.container}>
				<Text>
					APP Router
        </Text>
			</View>
		);
	}
}

export default connect(null, {})(AppRouter);