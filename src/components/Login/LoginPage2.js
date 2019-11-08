import React from 'react';
import {
  Animated,
  BackHandler,
  Image,
  Keyboard,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import LoginStyle from '../Styles/LoginStyle';

// const INVALID_APP_VERSION_CODE = 'invalid_version';
//const FIGO_ID = 'com.figoinsurance.petcloud';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { videoReady: false };
    this.alertTop = new Animated.Value(-80);
    this.backgroundOpacity = new Animated.Value(0);
    this.backToLoginOpacity = new Animated.Value(0);
    this.forgotPasswordInstructionsOpacity = new Animated.Value(0);
    this.passwordInputMarginTop = new Animated.Value(0);
    this.passwordInputOpacity = new Animated.Value(1);
    this.passwordLabelRised = new Animated.Value(0);
    this.usernameInputMarginTop = new Animated.Value(0);
    this.usernameLabelRised = new Animated.Value(0);

    this.passwordInput = React.createRef();
  }

  componentDidMount() {
    this.backButtonListener = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    this.backButtonListener.remove();
  }

  onEmailBlur = () => {
    if (!this.props.username) {
      Animated.timing(this.usernameLabelRised, {
        duration: 200,
        toValue: 0,
      }).start();
    }
  };

  onEmailFocus = () => {
    if (!this.props.username) {
      Animated.timing(this.usernameLabelRised, {
        duration: 200,
        toValue: 1,
      }).start();
    }
  };

  onForgotPress = () => {
    Keyboard.dismiss();
    this.props.switchToForgotPasswordMode();
  };

  onPasswordBlur = () => {
    if (!this.props.password) {
      Animated.timing(this.passwordLabelRised, {
        duration: 200,
        toValue: 0,
      }).start();
    }
  };

  onPasswordFocus = () => {
    if (!this.props.password) {
      Animated.timing(this.passwordLabelRised, {
        duration: 200,
        toValue: 1,
      }).start();
    }
  };

  onUsernameSubmit = () => {
    if (this.props.forgotPasswordMode) {
      this.submitForm();
    } else {
      this.passwordInput.current.focus();
    }
  };


  getButtonText = () => {
    if (this.props.forgotPasswordMode) {
      return this.props.i18n.login.forgotPasswordSubmitButton;
    }

    return this.props.i18n.login.buttonText;
  };

  handleBackPress = () => {
    if (this.props.forgotPasswordMode) {
      this.props.switchToLoginMode();
    }

    // Returning true disables the default back button behavior.
    return true;
  };

  submitForm = () => {
    Keyboard.dismiss();

    if (this.canSubmit()) {
      const { i18n, password, username } = this.props;

      if (this.props.forgotPasswordMode) {
        this.props.sendResetPasswordLink(username, i18n);
      } else {
        this.props.loginUser(username, password, i18n);
      }
    }
  };

  canSubmit = () => {
    const { password, username } = this.props;
    return (!this.props.forgotPasswordMode && password && username)
      || (this.props.forgotPasswordMode && username);
  };

  slideAlertDown = () => {
    Animated.timing(this.alertTop, {
      duration: 300,
      toValue: 0,
    }).start();
  };

  render() {
    return (
      <View style={LoginStyle.flex}>
        <View style={LoginStyle.container}>
          <View style={LoginStyle.overlay}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={LoginStyle.form}
            >
              <Animated.View
                style={[
                  LoginStyle.inputWrapper,
                  { marginTop: this.usernameInputMarginTop },
                ]}
              >
                <Text>
                  {this.props.i18n.login.usernameLabel}
                </Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  maxLength={254}
                  onBlur={this.onEmailBlur}
                  onChangeText={this.props.usernameChanged}
                  onFocus={this.onEmailFocus}
                  onSubmitEditing={this.onUsernameSubmit}
                  returnKeyType={this.props.forgotPasswordMode ? 'go' : 'next'}
                  style={LoginStyle.input}
                  value={this.props.username}
                />
              </Animated.View>

              <Animated.View
                style={[
                  LoginStyle.inputWrapper,
                  {
                    marginTop: this.passwordInputMarginTop,
                    opacity: this.passwordInputOpacity,
                  },
                ]}
              >
                <Text>
                  {this.props.i18n.login.passwordLabel}
                </Text>

                <View style={LoginStyle.passwordContainer}>
                  <TextInput
                    ref={this.passwordInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={this.onPasswordBlur}
                    onChangeText={this.props.passwordChanged}
                    onFocus={this.onPasswordFocus}
                    onSubmitEditing={this.submitForm}
                    returnKeyType="go"
                    secureTextEntry
                    style={[LoginStyle.input, LoginStyle.passwordInput]}
                    value={this.props.password}
                  />
                </View>
              </Animated.View>
            </ScrollView>
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
