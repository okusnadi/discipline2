import React from 'react';

import {
  View,
  Animated,
} from 'react-native';

import RNShakeEvent from 'react-native-shake-event';

import isNumber from 'lodash/isNumber';

import Swiper from '../scrolls/Swiper';

import Animation from '../animation/Animation';

import { minScale, MoveUpScaleResponderAnim }
  from '../animation/MoveUpScaleResponderAnim';

import ScreenSlideUpDownAnim from '../animation/ScreenSlideUpDownAnim';

import { MoveUpDownResponder } from '../animation/responders';

import { commonStyles, screenWidth } from '../styles/common';

import { slideHeight } from './styles/slideStyles';

import TrackerRenderer from './TrackerRenderer';

import { caller } from '../../utils/lang';

export default class TrackerSwiper extends TrackerRenderer {
  upDown = new ScreenSlideUpDownAnim(minScale);

  moveScale = new MoveUpScaleResponderAnim(slideHeight);

  responder = new MoveUpDownResponder();

  updateIndex = null;

  addIndex = null;

  removeIndex = null;

  get current() {
    return this.state.trackers[this.index];
  }

  get index() {
    return this.swiper.index;
  }

  get shown() {
    return this.upDown.value === 0;
  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', ::this.shakeCurrent);
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
    this.moveScale.dispose();
    this.responder.dispose();
  }

  componentDidMount() {
    const { onScaleMove, onScaleDone, onScaleStart } = this.props;
    this.moveScale.subscribe(
      this.responder,
      onScaleMove,
      onScaleStart,
      onScaleDone,
    );
  }

  componentDidUpdate() {
    const updateIndex = this.updateIndex;
    if (updateIndex !== null) {
      this.updateIndex = null;
      this.cancelEdit();
      caller(this.props.onSaveCompleted, updateIndex);
    }

    const addIndex = this.addIndex;
    if (addIndex !== null) {
      this.addIndex = null;
      this.scrollTo(addIndex);
      caller(this.props.onAddCompleted, addIndex);
    }
  }

  componentWillReceiveProps(props, state) {
    super.componentWillReceiveProps(props, state);

    const { trackers, removeIndex, addIndex, updateIndex } = props;

    if (isNumber(removeIndex)) {
      const prevTrackers = this.props.trackers;
      this.setState({ trackers: prevTrackers });
      this.animateRemove(prevTrackers, removeIndex,
        () => this.setState({ trackers, enabled: true })
      );
      caller(this.props.onRemoveCompleted, removeIndex);
    }

    if (isNumber(addIndex)) {
      this.addIndex = addIndex;
      this.setState({ trackers, enabled: true });
    }

    if (isNumber(updateIndex)) {
      this.updateIndex = updateIndex;
    }
  }

  shakeCurrent() {
    const trackerId = this.current.id;
    this.refs[trackerId].shake();
  }

  showEdit(callback) {
    this.setState({ enabled: false }, () => {
      const trackerId = this.current.id;
      this.refs[trackerId].showEdit(callback);
    });
  }

  cancelEdit(callback) {
    const trackerId = this.current.id;
    return this.refs[trackerId].cancelEdit(
      () => this.onCancelEdit(callback));
  }

  hide(callback) {
    this.upDown.setOut();
    caller(callback);
  }

  show(index, callback) {
    this.upDown.setIn();
    this.moveScale.animateIn(callback);
  }

  scrollTo(index, callback, animated) {
    this.swiper.scrollTo(index, callback, animated);
  }

  // When animating the removal we always scroll to the prev index.
  animateRemove(trackers, index, callback) {
    const tracker = trackers[index];
    const trackerId = tracker.id;
    const prevInd = index + (index >= 1 ? -1 : 1);

    this.refs[trackerId].collapse(() =>
      this.scrollTo(prevInd, () => {
        // In case of removing the first tracker,
        // we move to the next, so adjust the index accordingly.
        this.scrollTo(index ? prevInd : 0, null, false);
        caller(callback);
      })
    );
  }

  onCancelEdit(callback) {
    this.setState({ enabled: true }, callback);
  }

  render() {
    const { trackers } = this.state;

    const slideStyle = {
      width: screenWidth,
      height: slideHeight,
    };
    const slides = trackers.map((tracker) => (
      <View
        key={tracker.id}
        style={[commonStyles.centered, slideStyle]}
      >
        {this.renderTracker(tracker)}
      </View>
    ));

    const { style, onScroll } = this.props;
    const { enabled } = this.state;
    const transform = Animation.combineStyles(this.moveScale, this.upDown);
    const swiperStyle = [style, transform];
    return (
      <Animated.View style={swiperStyle} {...this.responder.panHandlers}>
        <Swiper
          ref={(el) => (this.swiper = el)}
          {...this.props}
          style={commonStyles.flexFilled}
          slides={slides}
          scrollEnabled={enabled}
          onTouchMove={onScroll}
        />
      </Animated.View>
    );
  }
}
