/**
 * @description: password visible icon, eyes open
 */

import React from 'react';
import cx from 'classnames';
import './index.scss';

interface PropsType {
  className?: string;
  onClick?: () => void;
}

class PasswordVisibleIcon extends React.Component {
  props: PropsType;
  handleClick = () => {
    const { onClick } = this.props;
    typeof onClick === 'function' && onClick();
  };

  render() {
    const { className } = this.props;
    return (
      <svg
        className={cx('visible-icon', className)}
        onClick={this.handleClick}
        width="41"
        height="41"
        viewBox="0 0 41 41"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
      >
        <title>icon/hide</title>
        <g id="icon/hide" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M21.1633634,9 C27.4528529,9 33.0888889,12.3537118 37.7447447,18.9772925 C37.9663257,19.2957134 38.0436448,19.6634938 37.9767022,20.0002941 C38.0434902,20.337241 37.9661043,20.7046047 37.7447447,21.0227075 C33.0888889,27.6462882 27.4528529,31 21.1633634,31 C14.8738739,31 9.15615615,27.6462882 4.25525526,21.0227075 C4.03389569,20.7046047 3.95650982,20.337241 4.02309765,20.0007154 C3.95635519,19.6634938 4.03367433,19.2957134 4.25525526,18.9772925 C9.05613777,12.4888869 14.6408378,9.13824807 20.7790091,9.00418968 L21.1633634,9 Z M21.1633634,11.5152838 C15.8419359,11.5152838 10.9066549,14.3690973 6.58280513,19.9996426 C10.9072418,25.631242 15.8422523,28.4847162 21.1633634,28.4847162 C26.5659559,28.4847162 31.2730368,25.7083864 35.4349411,20.001414 C31.2735889,14.2919393 26.5662728,11.5152838 21.1633634,11.5152838 Z"
            id="Shape"
            fill="#858B9C"
            fillRule="nonzero"
          />
          <path
            d="M21,9 C15.7532949,9 11.5,13.2532949 11.5,18.5 C11.5,23.7467051 15.7532949,28 21,28 C26.2467051,28 30.5,23.7467051 30.5,18.5 C30.5,13.2532949 26.2467051,9 21,9 Z M21,11.5 C24.8659932,11.5 28,14.6340068 28,18.5 C28,22.3659932 24.8659932,25.5 21,25.5 C17.1340068,25.5 14,22.3659932 14,18.5 C14,14.6340068 17.1340068,11.5 21,11.5 Z"
            id="Path"
            fill="#858B9C"
            fillRule="nonzero"
          />
        </g>
      </svg>
    );
  }
}

export default PasswordVisibleIcon;
