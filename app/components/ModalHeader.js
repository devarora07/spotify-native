import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, gStyle } from '../constants';

// components
import TouchIcon from './TouchIcon';

const ModalHeader = ({ left, leftPress, right, rightPress, style, text }) => (
  <View style={[styles.container, style]}>
    {left && <TouchIcon icon={left} onPress={leftPress} style={styles.left} />}
    {!left && <View style={styles.left} />}

    {text && (
      <View style={styles.containerText}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )}

    {right && (
      <TouchIcon icon={right} onPress={rightPress} style={styles.right} />
    )}
    {!right && <View style={styles.right} />}
  </View>
);

ModalHeader.defaultProps = {
  left: null,
  leftPress: () => null,
  right: null,
  rightPress: () => null,
  style: {},
  text: null
};

ModalHeader.propTypes = {
  // optional
  left: PropTypes.element,
  leftPress: PropTypes.func,
  right: PropTypes.element,
  rightPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: device.iPhoneNotch ? 48 : 24
  },
  containerText: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center'
  },
  text: {
    ...gStyle.textSpotifyBold16,
    color: colors.white,
    textAlign: 'center'
  },
  left: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center'
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  }
});

export default ModalHeader;
