import React from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  alert: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 34,
    position: 'absolute',
    width: vw,
  },

  alertText: {
    color: '#fff',
    fontFamily: 'proximanova-regular',
    textAlign: 'center',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  backToLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: vh / 15,
  },

  backToLoginText: {
    color: '#fff',
    fontFamily: 'proximanova-semi-bold',
    fontSize: 20,
  },

  buttonContainer: {
    alignSelf: 'center',
    bottom: vh / 2.78,
    position: 'absolute',
  },

  buttonTitle: {
    fontFamily: 'sfui-text-bold',
    fontSize: 16,
    letterSpacing: 1.5,
  },

  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },

  disabledButton: {
    backgroundColor: '#aab5bc',
  },

  flex: {
    flex: 1,
  },

  forgotPasswordInstructions: {
    color: '#fff',
    fontFamily: 'proximanova-semi-bold',
    fontSize: 24,
    paddingHorizontal: 20,
    textAlign: 'center',
  },

  forgotPasswordInstructionsContainer: {
    position: 'absolute',
    top: vh / 5,
  },

  forgotPasswordLink: {
    color: '#fff',
    fontFamily: 'proximanova-semi-bold',
    fontSize: 17,
    paddingTop: 15,
  },

  form: {
    flex: 1,
    paddingTop: vh / 9.14,
  },

  input: {
    color: '#fff',
    fontFamily: 'proximanova-regular',
    fontSize: 20,
    paddingBottom: 6,
    paddingHorizontal: 12,
  },

  inputWrapper: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginHorizontal: 25,
    paddingTop: 10,
  },

  label: {
    color: '#fff',
    fontFamily: 'proximanova-regular',
    left: 12,
    position: 'absolute',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  passwordContainer: {
    flexDirection: 'row',
  },

  passwordInput: {
    flex: 1,
  },

  title: {
    alignSelf: 'center',
    marginBottom: vh / 16.68,
  },

  version: {
    bottom: 12,
    color: '#fff',
    position: 'absolute',
    right: 12,
  },

  video: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: vw,
  },
});

const INVALID_APP_VERSION_CODE = 'invalid_version';
const FIGO_ID = 'com.figoinsurance.petcloud';

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
    this.props.loadVideoBackground();
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

  renderAlert = () => {
    const { alert, i18n } = this.props;

    if (alert) {
      if (alert.error && alert.error === INVALID_APP_VERSION_CODE) {
        this.props.showAlert({
          ...i18n.login.updateAppModal,
          primaryAction: this.openFigoAppOnPlayStore,
        });

        return null;
      }

      return (
        <Animated.View
          style={[
            styles.alert,
            {
              backgroundColor: this.props.alert.backgroundColor,
              top: this.alertTop,
            },
          ]}
        >
          <Text style={styles.alertText}>
            {this.props.alert.text}
          </Text>
        </Animated.View>
      );
    }

    return null;
  };

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.background}>
            {this.videoPlayer}
          </View>

          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.forgotPasswordInstructionsContainer,
                { opacity: this.forgotPasswordInstructionsOpacity },
              ]}
            >
              <Text style={styles.forgotPasswordInstructions}>
                {this.props.i18n.login.forgotPasswordTitle}
              </Text>

              <Text
                style={[
                  styles.forgotPasswordInstructions,
                  {
                    fontFamily: 'proximanova-regular',
                    fontSize: 18,
                    marginTop: 7,
                  },
                ]}
              >
                {this.props.i18n.login.forgotPasswordInstructions}
              </Text>
            </Animated.View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.form}
            >
              <Image source={titleImageSource} style={styles.title} />

              <Animated.View
                style={[
                  styles.inputWrapper,
                  { marginTop: this.usernameInputMarginTop },
                ]}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      fontSize: this.usernameLabelRised.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 14],
                      }),
                      top: this.usernameLabelRised.interpolate({
                        inputRange: [0, 1],
                        outputRange: [22, 0],
                      }),
                    },
                  ]}
                >
                  {this.props.i18n.login.usernameLabel}
                </Animated.Text>

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
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={this.props.username}
                />
              </Animated.View>

              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    marginTop: this.passwordInputMarginTop,
                    opacity: this.passwordInputOpacity,
                  },
                ]}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      fontSize: this.passwordLabelRised.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 14],
                      }),
                      top: this.passwordLabelRised.interpolate({
                        inputRange: [0, 1],
                        outputRange: [22, 0],
                      }),
                    },
                  ]}
                >
                  {this.props.i18n.login.passwordLabel}
                </Animated.Text>

                <View style={styles.passwordContainer}>
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
                    style={[styles.input, styles.passwordInput]}
                    underlineColorAndroid="transparent"
                    value={this.props.password}
                  />

                  <TouchableWithoutFeedback onPress={this.onForgotPress}>
                    <View>
                      <Text style={styles.forgotPasswordLink}>
                        {this.props.i18n.login.forgotPassword}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Animated.View>
            </ScrollView>

            {this.renderAlert()}

            <Alert />

            <SpinnerButton
              disabled={!this.canSubmit()}
              onPress={this.submitForm}
              spinning={this.props.submitting}
              text={this.getButtonText()}
            />

            <TouchableWithoutFeedback
              onPress={this.props.switchToLoginMode}
            >
              <Animated.View
                style={[
                  styles.backToLoginContainer,
                  { opacity: this.backToLoginOpacity },
                ]}
              >
                <Entypo color="white" name="chevron-thin-left" size={24} />

                <Text style={styles.backToLoginText}>
                  {this.props.i18n.login.backToLogin}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>

            <Text style={styles.version}>
              {APP_VERSION}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {})(LoginPage);
