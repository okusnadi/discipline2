import Easing from 'Easing';

import { Animated } from 'react-native';

import Animation from './Animation';

const FLIP_TIME = 500;

export default class FlipAnimation {
  rotY = new Animated.Value(0);
  move1 = new Animated.Value(0);
  move2 = new Animated.Value(1);
  opacity1 = new Animated.Value(1);
  opacity2 = new Animated.Value(0);

  get style1() {
    return {
      opacity: this.opacity1,
      transform: [
        {
          rotateY: this.rotY.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-180deg'],
          }),
        },
        {
          translateY: this.move1.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000],
          }),
        },
      ],
    };
  }

  get style2() {
    return {
      opacity: this.opacity2,
      transform: [
        {
          rotateY: this.rotY.interpolate({
            inputRange: [0, 1],
            outputRange: ['-180deg', '0deg'],
          }),
        },
        {
          translateY: this.move2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000],
          }),
        },
      ],
    };
  }

  animateIn(callback: Function) {
    Animation.setValue(this.move2, 0);

    this.animateFlip(1, 0, 1,
      (value) => value > 0.5,
      () => Animation.setValue(this.move1, 1, callback)
    );
  }

  animateOut(callback: Function) {
    Animation.setValue(this.move1, 0);

    this.animateFlip(0, 1, 0,
      (value) => value <= 0.5,
      () => Animation.setValue(this.move2, 1, callback)
    );
  }

  animateFlip(stopVal, op1, op2, opCondition, callback) {
    this.rotY.removeAllListeners();

    const id = this.rotY.addListener(({ value }) => {
      if (opCondition(value)) {
        this.rotY.removeListener(id);
        Animation.setValue(this.opacity1, op1);
        Animation.setValue(this.opacity2, op2);
      }
    });

    const flip = Animation.timing(
      this.rotY,
      FLIP_TIME,
      stopVal,
      Easing.inOut(Easing.sin),
    );
    Animation.animate([flip], callback);
  }
}
