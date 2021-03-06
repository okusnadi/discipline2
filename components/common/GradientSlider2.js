import React, { PureComponent } from 'react';

import flatten from 'lodash/flatten';

import times from 'lodash/times';

import { Animated } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { commonDef, screenWidth } from '../styles';

const COLORS = [
  '#60C2E3',
  '#E97490',
  '#FBDDB7',
  '#FFA878',
  '#9FC1E7',
  '#B454A6',
  '#E68C7D',
];

export default class GradientSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.move = new Animated.Value(-props.index * screenWidth);
  }

  getGrad(slides) {
    const len = COLORS.length;
    const int = Math.floor(slides / len);
    const res = slides % len;
    return flatten(times(int, () => COLORS))
      .concat(COLORS.slice(0, res));
  }

  slide() {}

  finishSlide(index, previ, animated) {
    if (!animated) {
      this.move.setValue(-index * screenWidth);
      return;
    }

    const diff = Math.max(Math.abs(index - previ), 1);
    Animated.timing(this.move, {
      duration: diff * 350,
      toValue: -index * screenWidth,
      useNativeDriver: true,
    }).start();
  }

  finishNoSlide() {}

  render() {
    const { slides } = this.props;
    const width = slides * screenWidth;
    const grads = this.getGrad(slides);
    return (
      <Animated.View
        style={[
          commonDef.absFilled, {
            width,
            transform: [{ translateX: this.move }],
          },
        ]}
      >
        <LinearGradient
          startPoint={{ x: 0.0, y: 0.5 }}
          endPoint={{ x: 1.0, y: 0.5 }}
          colors={grads}
          style={commonDef.absFilled}
        />
      </Animated.View>
    );
  }
}
