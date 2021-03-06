import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { View, Animated } from 'react-native';

import { trackerStyles } from '../styles/trackerStyles';

import Keyboard from '../../../utils/keyboard';

import { commonStyles } from '../../styles/common';

import TrackerView from './common/TrackerView';

import TrackerEditView from './common/TrackerEditView';

import Tracker from '../../../model/Tracker';

import FlipAnimation from '../../animation/FlipAnimation';

import ScaleAnimation from '../../animation/ScaleAnimation';

import { caller } from '../../../utils/lang';

const absFilled = commonStyles.absoluteFilled;

export default class TrackerSlide extends PureComponent {
  static defaultProps = {
    scale: 1,
    editable: true,
  };

  static propTypes = {
    editable: PropTypes.bool,
    scale: PropTypes.number,
    style: View.propTypes.style,
    tracker: PropTypes.instanceOf(Tracker),
    onTap: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onTrackerEdit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { scale } = props;
    this.flip = new FlipAnimation();
    this.scale = new ScaleAnimation(scale);
    this.state = { editTracker: null };
    this.onTap = ::this.onTap;
    this.onEdit = ::this.onEdit;
    this.onRemove = ::this.onRemove;
  }

  get bodyControls() {
    throw new Error('Controls is not implemented');
  }

  get footerControls() {
    throw new Error('Footer controls is not implemented');
  }

  get bodyStyle() {
    return null;
  }

  get footerStyle() {
    return null;
  }

  showEdit(callback) {
    const { tracker } = this.props;
    Keyboard.dismiss();
    this.setState({ editTracker: tracker },
      () => this.flip.animateIn(callback));
  }

  cancelEdit(callback) {
    Keyboard.dismiss();
    this.flip.animateOut(callback);
  }

  collapse(callback) {
    this.scale.animateOut(callback);
  }

  shake() {}

  onTap() {
    caller(this.props.onTap);
  }

  onEdit() {
    if (this.props.editable) {
      caller(this.props.onEdit);
    }
  }

  onRemove() {
    if (this.props.editable) {
      caller(this.props.onRemove);
    }
  }

  renderBackView() {
    const { editable, onTrackerEdit } = this.props;
    const { editTracker } = this.state;
    return editable && editTracker ? (
      <TrackerEditView
        style={[absFilled, this.flip.style2]}
        showType={false}
        allowDelete
        initialValues={editTracker}
        onRemove={this.onRemove}
        onSubmitSuccess={onTrackerEdit}
      />
    ) : null;
  }

  renderFrontView() {
    const { tracker } = this.props;
    return (
      <TrackerView
        style={this.flip.style1}
        tracker={tracker}
        backImg={this.backImg}
        bodyControls={this.bodyControls}
        footerControls={this.footerControls}
        onTap={this.onTap}
        onEdit={this.onEdit}
        bodyStyle={this.bodyStyle}
        footerStyle={this.footerStyle}
      />
    );
  }

  render() {
    const { style } = this.props;
    const slideStyle = [trackerStyles.slide, style];
    return (
      <Animated.View style={[slideStyle, this.scale.style]}>
        {this.renderFrontView()}
        {this.renderBackView()}
      </Animated.View>
    );
  }
}
