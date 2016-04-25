'use strict';

const React = require('react-native');
const {
  StyleSheet
} = React;

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const { slideDef } = require('./slideStyles');

const trackerDef = {
  ...slideDef,
  innerView: {
    ...slideDef.innerView,
    ...slideDef.borderRadius
  },
  headerContainer: {
    ...slideDef.headerContainer,
    ...slideDef.borderRadius,
    ...slideDef.borderTopRadius,
    flex: 0.45,
    backgroundColor: '#F5F5F5'
  },
  bodyContainer: {
    ...slideDef.bodyContainer,
    flex: 0.4
  },
  footerContainer: {
    ...slideDef.footerContainer,
    ...slideDef.borderRadius,
    ...slideDef.borderBottomRadius,
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  barContainer: {
    flex: 0.20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 0
  },
  iconContainer: {
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  controlsContainer: {
    flex: 1
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20
  },
  titleText: {
    fontSize: 25,
    fontWeight: '300',
    textAlign: 'center'
  },
  mainIcon: {
    resizeMode: 'contain',
    height: 60
  },
  infoIcon: {
    resizeMode: 'contain',
    height: 25,
    width: 25
  },
  circleBtn: {
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50
  },
  circleBtnSm: {
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 18,
    width: 35,
    height: 35
  },
  checkBtn: {
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 40,
    height: 80,
    width: 80
  },
  filledBtn: {
    backgroundColor: '#3DCF43'
  },
  footerText: {
    color: '#C4C4C4',
    fontSize: 15,
    textAlign: 'center',
    width: 150,
    fontWeight: '200'
  },
  hintText: {
    color: '#DFDFDF'
  }
};

const trackerStyles = StyleSheet.create(trackerDef);

const editDef = {
  innerView: {
    ...trackerDef.innerView,
    opacity: 0,
    transform: [{rotateY: '-180deg'}]
  },
  headerContainer: {
    ...trackerDef.headerContainer,
    flex: 0.45
  },
  bodyContainer: {
    ...trackerDef.bodyContainer,
    flex: 0.55,
    backgroundColor: '#F5F5F5',
    ...trackerDef.borderBottomRadius
  },
  barContainer: {
    ...trackerDef.barContainer,
    alignItems: 'center',
    flex: 0.25
  },
  iconContainer: {
    ...trackerDef.iconContainer,
    alignItems: 'flex-end',
    flex: 0.4
  },
  titleContainer: {
    ...trackerDef.titleContainer,
    alignItems: 'center',
    flex: 0.35
  },
  inputTitle: {
    width: 200,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '100'
  },
  group: {
    marginTop: 20
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: slideDef.container.width - 1,
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  colLeft: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15
  },
  colRight: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15
  },
  colText: {
    fontSize: 16
  },
  nextIcon: {
    resizeMode: 'contain',
    height: 13,
    marginLeft: 10
  }
};

const propsStyles = StyleSheet.create({
  ...editDef,
  colLeftWide: {
    ...editDef.colLeft,
    flex: 0.7
  },
  firstGroupRow: {
    ...editDef.row,
    borderBottomWidth: 0
  }
});

module.exports = {
  trackerDef,
  trackerStyles,
  propsStyles
};