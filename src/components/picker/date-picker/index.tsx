import React from 'react';
import BottomSheet from '@/components/bottom-sheet';
import PickerItem from '../picker-item';
import { getDayList, getMonthList, getYearList } from './utils';
import './index.scss';

// interface ColumnItemType {
//   label: string;
//   value: string;
// }

// interface Column {
//   [index: number]: ColumnItemType[];
// }

interface PropsType {
  min: Date;

  max: Date;

  title: string;

  defaultValue: Date | '';

  value: Date | '';

  direction?: 'vertical';

  confirmBtnText?: string;

  cancelBtnText?: string;

  onChange?: (value) => void;

  onConfirm?: (value) => void;

  onCancel?: (value) => void;
}

const currentDate = new Date();

class DatePicker extends React.Component {
  props: PropsType;
  pickerRef: any;
  pickerItemRef: {
    [index: number]: any;
  };

  constructor(props) {
    super(props);
    const { defaultValue, value } = props;
    const date = value || defaultValue || currentDate;
    this.state = {
      columns: this.initColumns(props),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    this.pickerItemRef = {};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const newDate = nextProps.value;
    if (newDate !== this.props.value) {
      this.setState({
        columns: this.initColumns(nextProps),
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      });
    }
  }


  initColumns(props) {
    const { min, max } = props;
    let { defaultValue } = props;
    defaultValue = defaultValue || currentDate;
    const year = defaultValue.getFullYear();
    const month = defaultValue.getMonth() + 1;
    const years = getYearList(min, max);
    const months = getMonthList();
    const days = getDayList(year, month);
    return [years, months, days];
  }

  show = () => {
    this.pickerRef.show();
  };

  hide = () => {
    this.pickerRef.hide();
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    const { year, month, day } = this.state;
    const date = new Date(`${year}/${month}/${day}`); // don't use - to concat 2021-11-10
    typeof onConfirm === 'function' && onConfirm(date);
  };

  // todo: whether reset days
  handleChange = (item, index) => {
    const { year, month, day, columns } = this.state;
    let currentDay = 1;
    switch (index) {
      case 0: // year
        columns[2] = getDayList(item.value, month);
        currentDay = day;
        if (day > columns[2].length) {
          currentDay = columns[2].length;
          this.pickerItemRef[2].swipeTo(currentDay - 1, false);
        }
        this.setState({
          year: item.value,
          day: currentDay,
          columns,
        });
        break;
      case 1: // month
        columns[2] = getDayList(year, item.value);
        currentDay = day;
        if (day > columns[2].length) {
          currentDay = columns[2].length;
          this.pickerItemRef[2].swipeTo(currentDay - 1, false);
        }
        this.setState({
          month: item.value,
          day: currentDay,
          columns,
        });
        break;
      default:
        // day
        this.setState({
          day: item.value,
        });
    }
  };

  render() {
    const { title, confirmBtnText } = this.props;
    const { columns, year, month, day } = this.state;

    const dateMap = {
      0: columns[0].findIndex((item) => item.value === year),
      1: columns[1].findIndex((item) => item.value === month),
      2: columns[2].findIndex((item) => item.value === day),
    };
    return (
      <BottomSheet
        title={title}
        confirmBtnText={confirmBtnText}
        height="100vw"
        disableTouchClose
        ref={(elem) => {
          this.pickerRef = elem;
        }}
        onConfirm={this.handleConfirm}
      >
        <div className="picker-list">
          {columns.map((column, index) => (
            <PickerItem
              ref={(elem) => {
                this.pickerItemRef[index] = elem;
              }}
              key={index}
              list={column}
              defaultIndex={dateMap[index]}
              onChange={(item) => this.handleChange(item, index)}
              direction="vertical"
            />
          ))}
        </div>
      </BottomSheet>
    );
  }
}

export default DatePicker;
