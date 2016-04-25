'use strict'

const React = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated
} = require('react-native');

const TimerMixin = require('react-timer-mixin');

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenWidth = window.width;

const { commonStyles } = require('../styles/common');

const BaseScroll = require('./BaseScroll');

const stylesDef = {
  slide: {
    flex: 1,
    width: screenWidth
  },
  dots: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },
  basicDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 5
  },
  activeDot: {
    backgroundColor: 'rgb(255, 255, 255)'
  }
};

const styles = StyleSheet.create(stylesDef);

const Swiper = React.createClass({
  propTypes: {
    slides: React.PropTypes.array.isRequired,
    style: View.propTypes.style,
    scrollEnabled: React.PropTypes.bool,
    index: React.PropTypes.number
  },

  mixins: [TimerMixin],

  getDefaultProps() {
    return {
      index: 0,
      slides: [],
      scrollEnabled: true
    }
  },

  getInitialState() {
    return {
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1)
    }
  },

  getSize() {
    return this.props.slides.length;
  },

  isEnabled() {
    return this.getSize() >= 2 &&
      this.props.scrollEnabled;
  },

  getIndex() {
    return this.refs.scroll.getIndex();
  },

  getNextIndex() {
    let index = this.getIndex();
    return index ? index + 1 : 0;
  },

  getPrevIndex() {
    let index = this.getIndex();
    let diff = index > 0 ? -1 : 1;
    return index + diff;
  },

  scrollTo(index, callback, animated) {
    this.refs.scroll.scrollTo(index, callback, animated);
  },

  _renderDots(size) {
    if (size <= 1) return null;

    let dots = [];
    let basicDot = [styles.basicDot, this._scaleDot(size)];
    for(let i = 0; i < size; i++) {
      let dotStyle = i === this.getIndex() ? 
        [basicDot, styles.activeDot] : basicDot;
      dots.push(<View ref={'page' + i} key={i} style={dotStyle} />);
    }

    let opacity = new Animated.Value(0);
    this.setTimeout(() => {
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1
      }).start();
    });

    return (
      <Animated.View
        pointerEvents='none'
        style={[styles.dots, { opacity }]}>
        {dots}
      </Animated.View>
    );
  },

  _setActiveDot(curInd, prevInd) {
    if (this.refs['page' + prevInd]) {
      this.refs['page' + prevInd].setNativeProps({
        style: {
          backgroundColor: stylesDef.basicDot.backgroundColor
        }
      });
    }

    if (this.refs['page' + curInd]) {
      this.refs['page' + curInd].setNativeProps({
        style: {
          backgroundColor: stylesDef.activeDot.backgroundColor
        }
      });
    }
  },

  /**
   * Scales dot radius.
   * Basic radius 7px, with scaling
   * propor. to the number of slides.
   */
  _scaleDot(size) {
    let radius = 7, margin = 7;
    if (size >= 18) {
      let ratio = 18 / size;
      radius = (7 * ratio) << 0;
      margin = (7 * ratio) << 0;
    }

    return {
      width: radius,
      height: radius,
      borderRadius: radius / 2,
      marginRight: margin
    };
  },

  _renderSlide(slide, key) {
    return (
      <View style={styles.slide} key={key}>
        {slide}
      </View>
    )
  },

  _onSlideChange(index, previ, dir) {
    this._setActiveDot(index, previ);
    if (this.props.onSlideChange) {
      this.props.onSlideChange(index, dir);
    }
  },

  render() {
    let state = this.state;
    let props = this.props;
    let slides = props.slides;

    slides = slides.map((slide, i) =>
      this._renderSlide(slide, i)
    );

    let dots = this.isEnabled() ?
      this._renderDots(slides.length) : null;

    return (
      <View
        style={commonStyles.flexFilled}>
        <BaseScroll
          ref='scroll'
          slides={slides}
          slideWidth={screenWidth}
          contentStyle={commonStyles.flexFilled}
          onTouchMove={this.props.onScroll}
          scrollEnabled={this.props.scrollEnabled}
          onSlideChange={this._onSlideChange}
          onSlideNoChange={this.props.onSlideNoChange}>
        </BaseScroll>
        {dots}
      </View>
    );
  }
});

module.exports = Swiper;