/*
  @description: this is a new version of input component. created in 2022.11.25
  <input type=number/> can't trigger change event,
  you may use type=tel for pure number.
  For IOS Auto Complete, there is a bug which will auto fill the code twice.

*/
import React from 'react';
import cx from 'classnames';
import CloseIcon from './icons/close-icon';
import PasswordInvisibleIcon from './icons/password-invisible-icon';
import PasswordVisibleIcon from './icons/password-visible-icon';
import './index.scss';

interface PropsType {
  label?: string;

  value: string; // This is a controlled component

  prefix?: string; // number prefix before the input, eg: +86

  hasClear?: boolean;

  password?: boolean; // if the input is password type

  isPassword?: boolean;

  isPureNumber?: boolean; // // if the input is pure number, we should filter. characters

  type?: string;

  placeholder?: string;

  isIOSAutoComplete?: boolean;

  maxLength?: number;

  index?: number;

  error?: string;

  className?: string;

  disabled?: boolean;

  onFocus?: (e: Event) => void;

  onBlur?: (e: Event) => void;

  onKeyUp?: (e: Event, index: number ) => void;
  
  onKeyDown?: (e: Event, index: number ) => void;

  onChange?: (value: string) => void;

  onClick?: () => void;

  onClearError?: () => void;

  onIOSAutoComplete?: (value) => void;
}

interface StateType {
  inputWrapperClassName: string;
  isPassword: boolean;
}

class Input extends React.Component<PropsType> {
  state: StateType;
  inputRef: any;
  constructor(props) {
    super(props);
    this.state = {
      inputWrapperClassName: '',
      isPassword: props.isPassword,
    };
    this.inputRef = React.createRef();
  }

  handleFocus = (event?) => {
    window.setTimeout(() => {
      this.inputRef.current.focus();
    }, 0);
    const { onFocus, error } = this.props;
    if(!error) {
      this.setState({
        inputWrapperClassName: 'input-wrapper-active',
      });
    }
    
    typeof onFocus === 'function' && onFocus(event);
  };

  handleBlur = (event?) => {
    const { onBlur } = this.props;
    const { error } = this.props;
    if (!error) {
      this.setState({
        inputWrapperClassName: '',
      });
    }
    typeof onBlur === 'function' && onBlur(event);
  };

  handleClear = () => {
    this.handleFocus();
    const { onChange, onClearError } = this.props;
    typeof onChange === 'function' && onChange('');
    typeof onClearError === 'function' && onClearError();
  };

  handleKeyUp = (e) => {
    const { onKeyUp, index } = this.props;
    typeof onKeyUp === 'function' && onKeyUp(e, index);
  };

  handleKeyDown = (e) => {
    const { onKeyDown, index } = this.props;
    typeof onKeyDown === 'function' && onKeyDown(e, index);
  };

  handleTogglePasswordVisible = async () => {
    const { isPassword } = this.state;
    const { onChange, value } = this.props;
    // to solver ios password bugs
    typeof onChange === 'function' && onChange(value.slice(0, value.length - 1));
    this.setState(
      {
        isPassword: !isPassword,
      },
      () => {
        typeof onChange === 'function' && onChange(value);
      },
    );
    this.handleFocus();
  };

  handleChange = (e) => {
    let { value } = e.target;
    const { onChange, maxLength, isPureNumber, onClearError, isIOSAutoComplete, index, onIOSAutoComplete } = this.props;
    if (maxLength || isIOSAutoComplete) {
      value = value.slice(0, maxLength || isIOSAutoComplete);
    }
    // if the input is pure number, we should filter. characters
    if (isPureNumber) {
      value = value.replace(/[^0-9]/g, '');
    }
    typeof onChange === 'function' && onChange(value, index);
    typeof onClearError === 'function' && onClearError();

    // For ios verification auto complete
    if (index === 0 && isIOSAutoComplete) {
      typeof onIOSAutoComplete === 'function' && onIOSAutoComplete(e.target.value);
    }
  };

  handleClick = () => {
    const { onClick } = this.props;
    typeof onClick === 'function' && onClick();
  };

  renderPassword() {
    const { password } = this.props;
    const { isPassword } = this.state;
    if (!password) return null;
    return isPassword ? (
      <PasswordInvisibleIcon className="input-wrapper-password" onClick={this.handleTogglePasswordVisible} />
    ) : (
      <PasswordVisibleIcon className="input-wrapper-password" onClick={this.handleTogglePasswordVisible} />
    );
  }

  render() {
    const {
      label,
      prefix,
      hasClear = true,
      type = 'text',
      placeholder,
      className,
      maxLength,
      error,
      disabled,
      value,
      index
    } = this.props;
    const { inputWrapperClassName, isPassword } = this.state;
    const passwordClassName = isPassword ? 'input-text-security' : 'input-text-security-none';
    return (
      <div className={cx('input-with-border', className)} onClick={this.handleClick}>
        {label && <h1 className="input-label">{label}</h1>}
        <div className={cx('input-wrapper', {[inputWrapperClassName]: !error}, {"input-wrapper-error": !!error})}>
          <div className="input-wrapper-left">
            {prefix && <p className="input-prefix">{prefix}</p>}
            <input
              className={cx('input-text', passwordClassName)}
              data-index={index}
              ref={this.inputRef}
              placeholder={placeholder}
              value={value}
              type={type}
              disabled={disabled}
              maxLength={maxLength}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />
          </div>

          {hasClear && value && <CloseIcon className="input-wrapper-clear" onClick={this.handleClear} />}
          {this.renderPassword()}
        </div>
        {error && <p className="input-error">{error}</p>}
      </div>
    );
  }
}

export default Input;
