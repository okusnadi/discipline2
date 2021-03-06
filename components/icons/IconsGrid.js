import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ListView,
  Image,
} from 'react-native';

import Dimensions from 'Dimensions';

import UserIconsStore from '../../icons/UserIconsStore';

import { caller } from '../../utils/lang';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  grid: {
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  icon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

export default class IconsGrid extends PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = { ds };
    this.renderRow = this.renderRow.bind(this);
  }

  onIconChosen(icon) {
    caller(this.props.onIconChosen, icon.id);
  }

  getIcons(): Array<Array<UserIcon>> {
    const icons = UserIconsStore.getAll();

    let iconRow = [];
    const iconRows = [];
    const { count } = this.getColSize();
    icons.forEach((icon, index) => {
      iconRow.push(icon);
      if ((index + 1) % count === 0) {
        iconRows.push(iconRow);
        iconRow = [];
      }
    });

    if (iconRow.length) {
      iconRows.push(iconRow);
    }

    return iconRows;
  }

  getColSize() {
    let count = 5;

    // For iPhone 5.
    if (window.width <= 320) {
      count = 4;
    }

    const pad = count * 0;
    const width = Math.floor((window.width - pad) / count);

    return { width, count };
  }

  renderIcon(icon: UserIcon) {
    const { width } = this.getColSize();

    return (
      <TouchableOpacity
        key={icon.id}
        style={styles.col}
        onPress={this.onIconChosen.bind(this, icon)}
      >
        <Image source={icon.png} style={[styles.icon, { width }]} />
      </TouchableOpacity>
    );
  }

  renderRow(icons) {
    const items = icons.map((icon) => {
      return this.renderIcon(icon);
    });

    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  }

  render() {
    const icons = this.getIcons();
    return (
      <ListView
        dataSource={this.state.ds.cloneWithRows(icons)}
        renderRow={this.renderRow}
        style={[styles.grid, this.props.style]}
      />
    );
  }
}
