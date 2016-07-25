 /* @flow */

'use strict';

import trackers from './realm/trackers';

import ticks from './realm/ticks';

import {TrackerType} from './consts';

class Depot {
  trackers: ITrackersDepot = trackers;
  ticks: ITicksDepot = ticks;

  initTestData() {
    this.trackers.add({
      title: 'Morning Run',
      typeId: TrackerType.COUNTER.valueOf(),
      iconId: 'trainers'
    });
    this.trackers.add({
      title: 'Cup of Coffee',
      typeId: TrackerType.GOAL_TRACKER.valueOf(),
      iconId: 'coffee'
    });
    this.trackers.add({
      title: 'Spent on Food',
      typeId: TrackerType.GOAL_TRACKER.valueOf(),
      iconId: 'pizza'
    });
    this.trackers.add({
      title: 'Books read',
      typeId: TrackerType.COUNTER.valueOf(), 
      iconId: 'book_shelf'
    });
    this.trackers.add({
      title: 'Spent on Lunch',
      typeId: TrackerType.SUM.valueOf(), 
      iconId: 'pizza'
    });
    this.trackers.add({
      title: 'Reading time',
      typeId: TrackerType.STOP_WATCH.valueOf(), 
      iconId: 'reading'
    });
  }

  hasTestData() {
    return this.trackers.count();
  }
};

let depot = new Depot();
module.exports = depot;
