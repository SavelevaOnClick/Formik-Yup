import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    padding: 10,
  },
  error: {
    color: 'red',
    textTransform: 'lowercase',
    fontSize: 12,
    position: 'absolute',
    left: 10,
  },
  errorContainer: {
    alignItems: 'center',
    height: 20,
  },
});
