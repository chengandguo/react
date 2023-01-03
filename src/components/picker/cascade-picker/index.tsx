import React from 'react';
import BottomSheet from '@/components/bottom-sheet';
import PickerItem from '../picker-item';
import './index.scss';

interface ColumnItemType {
  label: string;
  value: string;
}

interface Column {
  [index: number]: ColumnItemType[];
}

interface PropsType {
  columns: Column[];

  title: string;

  // defaultValue: Number[]; // todo

  // direction?: 'horizontal' | 'vertical';

  // confirmBtnText?: string;

  // cancelBtnText?: string;

  onChange: (value) => void;

  onConfirm: (value) => void;

  // onCancel: (value) => void;
}

class Picker extends React.Component {
  props: PropsType;
  pickItemMapRef: { [index: number]: any };
  constructor(props) {
    super(props);
    this.state = {
      activeIndexList: [],
    };
    this.pickItemMapRef = {};
  }

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  getSelectedValues(selectedIndexList = []) {
    if (selectedIndexList.length === 0) {
      selectedIndexList.push(0);
    }
    const { columns } = this.props;
    let currentItem = columns[selectedIndexList[0]];
    const result = [];
    let count = 1;
    while (currentItem) {
      result.push(currentItem.value);
      currentItem = currentItem.children && currentItem.children[selectedIndexList[count] || 0];
      count += 1;
    }
    return result;
  }

  handleConfirm = (value) => {
    const { onConfirm } = this.props;
    typeof onConfirm === 'function' && onConfirm(value);
  };

  handleChange = (item, currentIndex, columnNo) => {
    const { onChange } = this.props;
    const { activeIndexList } = this.state;
    activeIndexList[columnNo] = currentIndex;
    const selectedIndexList = activeIndexList.map((item, index) => {
      let result = item;
      if (index === columnNo) {
        result = currentIndex;
      } else if (index > columnNo) {
        result = 0;
        this.pickItemMapRef[index] && this.pickItemMapRef[index].swipeTo(result, true);
      }
      return result;
    });
    this.setState({
      activeIndexList: selectedIndexList,
    });
    if (typeof onChange === 'function') {
      onChange();
    }
  };

  renderPickerList() {
    const { columns } = this.props;
    const { activeIndexList } = this.state;
    const list = [];
    list.push(
      <PickerItem
        key={0}
        ref={(elem) => (this.pickItemMapRef[0] = elem)}
        list={columns}
        defaultIndex={0}
        onChange={(item, index) => this.handleChange(item, index, 0)}
        direction="vertical"
      />,
    );
    let currentList = columns[activeIndexList[0] || 0];
    let count = 1;
    while (currentList.children) {
      const columnNo = count;
      list.push(
        <PickerItem
          key={columnNo}
          ref={(elem) => (this.pickItemMapRef[columnNo] = elem)}
          list={currentList.children}
          defaultIndex={0}
          onChange={(item, index) => this.handleChange(item, index, columnNo)}
          direction="vertical"
        />,
      );

      currentList = currentList.children[activeIndexList[columnNo] || 0];
      count += 1;
    }
    return list;
  }

  render() {
    const { title } = this.props;
    return (
      <BottomSheet
        title={title}
        height="50%"
        disableTouchClose
        ref={(elem) => (this.pickerRef = elem)}
        onConfirm={this.handleConfirm}
      >
        <div className="picker-list">{this.renderPickerList()}</div>
      </BottomSheet>
    );
  }
}

export default Picker;
