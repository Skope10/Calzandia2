import { Dimensions, StyleSheet } from 'react-native';

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;
const loginStyle = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonSocioNumber: {
    alignItems: 'flex-end',
    backgroundColor: '#52D1DC',
    borderColor: '#52D1DC',
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: vh / 8,
    padding: 20,
    width: vw / 1.2,
  },

  backToLoginText: {
    color: '#fff',
    fontSize: 20,
  },

  buttonContainer: {
    alignSelf: 'center',
    bottom: vh / 2.78,
    position: 'absolute',
  },

  buttonTitle: {
    fontSize: 16,
    letterSpacing: 1.5,
  },

  container: {
    backgroundColor: '#FFFBFA',
    flex: 1,
  },

  disabledButton: {
    backgroundColor: '#aab5bc',
  },

  flex: {
    backgroundColor: '#fff',
    flex: 1,
  },

  forgotPasswordInstructions: {
    color: '#fff',
    fontSize: 24,
    paddingHorizontal: 20,
    textAlign: 'center',
  },

  forgotPasswordInstructionsContainer: {
    position: 'absolute',
    top: vh / 5,
  },

  form: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  input: {
    color: '#000',
    fontSize: 20,
    paddingBottom: 6,
    paddingHorizontal: 12,
  },

  inputWrapper: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginHorizontal: 25,
    paddingTop: 10,
  },

  label: {
    color: '#fff',
    left: 12,
    position: 'absolute',
  },

  passwordContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  passwordInput: {
    flex: 1,
  },

  rowMargin: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },

  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '100',
    textDecorationLine: 'underline',
  },

  textButton: {
    color: 'white',
    fontSize: 18,
  },

  textBold: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
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

export default loginStyle;
