import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import HomeStyle from '../Styles/HomeStyle';

// const INVALID_APP_VERSION_CODE = 'invalid_version';
//const FIGO_ID = 'com.figoinsurance.petcloud';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }


  render() {
    return (
      <View style={HomeStyle.flex}>
        <View style={HomeStyle.container}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <TouchableOpacity style={HomeStyle.buttonSocioNumber} >
              <Text style={HomeStyle.textButton}>
                HOME PAGE
                </Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, {})(HomePage);
