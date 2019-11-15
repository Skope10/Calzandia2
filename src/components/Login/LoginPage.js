import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import LoginStyle from '../Styles/LoginStyle';

// const INVALID_APP_VERSION_CODE = 'invalid_version';
//const FIGO_ID = 'com.figoinsurance.petcloud';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  goHome = () => {
    this.props.screenProps.isLoggedIn();
  };

  render() {
    return (
      <View style={LoginStyle.flex}>
        <View style={LoginStyle.container}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image
              style={{ width: 200, height: 85, marginBottom: 5 }}
              source={require('../../../assets/Table_logo.png')}
            />
            <Image
              style={{ width: 350, height: 350 }}
              source={require('../../../assets/logoApp1.png')}
            />
            <TouchableOpacity style={LoginStyle.buttonSocioNumber} onPress={this.goHome}>
              <Text style={LoginStyle.textButton}>
                Número de Socio
                </Text>
            </TouchableOpacity>
          </View>

          <View style={LoginStyle.form}>
            <View style={LoginStyle.rowMargin}>
              <Text style={LoginStyle.text}>
                {this.props.i18n.login.newCustomer}
              </Text>

              <Text style={LoginStyle.textBold}>
                {this.props.i18n.login.buy}
              </Text>
            </View>

            <View style={LoginStyle.rowMargin}>
              <Text style={LoginStyle.text}>
                {this.props.i18n.login.newSeller}
              </Text>

              <Text style={LoginStyle.textBold}>
                {this.props.i18n.login.sell}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ common }) {
  const { i18n } = common;

  return {
    i18n,
  };
}

export default connect(mapStateToProps, {})(LoginPage);
