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

  defaultValue: [];

  direction?: 'horizontal' | 'vertical';

  confirmBtnText?: string;

  cancelBtnText?: string;

  onChange: (value) => void;

  onConfirm: (value) => void;

  onCancel: (value) => void;
}

class Picker extends React.Component<PropsType> {
  show = () => {
    this.pickerRef.show();
  };

  hide = () => {
    this.pickerRef.hide();
  };

  handleConfirm = (value) => {
    const { onConfirm } = this.props;
    typeof onConfirm === 'function' && onConfirm(value);
  };

  handleChange = (item, index) => {
    console.log(item, index);
  };

  render() {
    const { title, columns } = this.props;
    return (
      <BottomSheet
        title={title}
        height="50%"
        disableTouchClose
        ref={(elem) => {
          this.pickerRef = elem;
        }}
        onConfirm={this.handleConfirm}
      >
        <div className="picker-list">
          {columns.map((column, index) => (
            <PickerItem
              key={index}
              list={column}
              defaultIndex={0}
              onChange={(item) => this.handleChange(item, index)}
              direction="vertical"
            />
          ))}
        </div>
      </BottomSheet>
    );
  }
}

export default Picker;
