'use strict';

import React from 'react';

import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Vibration
} from 'react-native';

import {trackerStyles} from '../styles/trackerStyles';

import TrackerSlide from './TrackerSlide';

export default class CounterSlide extends TrackerSlide {
  onChange() {
    let { tracker } = this.props;
    this.setState({
      iconId: tracker.iconId,
      title: tracker.title,
      count: tracker.count
    });
  }

  onTick() {
    Vibration.vibrate();

    let { tracker } = this.props;
    this.setState({
      count: tracker.count
    });
  }

  onUndo() {
    let { tracker } = this.props;
    this.setState({
      count: tracker.count
    });
  }

  get controls() {
    let { editable } = this.props;

    return (
      <View style={trackerStyles.controls}>
        <View style={styles.controls}>
          <TouchableOpacity
            disabled={!editable}
            onPress={::this._onMinus}>
            <Image
              source={getIcon('minus')}
              style={trackerStyles.circleBtn}
            />
          </TouchableOpacity>
          <Text style={styles.countText} numberOfLines={1}>
            {this.state.count}
          </Text>
          <TouchableOpacity
            disabled={!editable}
            onPress={::this._onPlus}>
            <Image
              source={getIcon('plus')}
              style={trackerStyles.circleBtn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  get footer() {
    return (
      <Text style={trackerStyles.footerText}>
        Tap to count the thing you've done
      </Text>
    );
  }

  _onPlus() {
    let { tracker } = this.props;
    tracker.tick();
  }

  _onMinus() {
    let { tracker } = this.props;
    tracker.undo();
  }
};

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countText: {
    fontSize: 56,
    fontWeight: '200',
    color: '#4A4A4A'
  }
});
