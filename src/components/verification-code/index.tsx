import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import CountDown from "@/utils/count-down";
import WindVane from '@/utils/windvane';
import { sleep } from "@/utils";
import Input from "../input-with-border";
import Button from "../button";
import L from "./language";
import "./index.scss";

interface ErrorType {
  errorCode: {
    key: string;

    displayMessage: string;
  }
}
interface PropsType {
  receiver: string;

  receiverPrefix?: string;

  countDownTime?: number;  // default is 60 seconds

  errorNotice?: string;   // invalid verification code or other notice

  codeCount?: number;

  onSendVerificationCode: (receiver: string, isResend: boolean) => void;   // isResend means resend code

  onVerifyCode: (receiver: string, code: string) => void;

  onSetError?: (error: ErrorType) => void;

  onSwitchOtherWays?: () => void;  // for second verify scene
}


function VerificationCode(props: PropsType, ref) {
  const { 
    receiver,
    receiverPrefix,
    countDownTime=60, 
    errorNotice,
    codeCount,
    onSetError,
    onSwitchOtherWays
  } = props;
  const [ codeList, setCodeList ] = useState(new Array(codeCount).fill(""));
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ countDown, setCountDown ] = useState(countDownTime);
  const [ isCountDownComplete, setIsCountDownComplete ] = useState(false);
  const [ isShowConfirmBtn, setIsShowConfirmBtn ] = useState(true);
  const { current: codeInputRefList } = useRef([]);
  const { current: countDownRef } = useRef(new CountDown(countDownTime));
  const { current: initialBodyClientHeight } = useRef(document.documentElement.clientHeight);
  
  useImperativeHandle(ref, () => ({
    clearVerificationCode() {
      setCodeList(new Array(codeCount).fill(""));
    },

    startCountDown (isDelay: boolean) {
      startCountDown(isDelay);
    },

    getCountDownStatus () {
      return isCountDownComplete;
    }
  }));

  const startCountDown = async (isDelay=false) => {
    setCodeList(new Array(codeCount).fill(""));
    setIsCountDownComplete(false);
    countDownRef.restart();
    countDownRef.onUpdate((value) => {
      setCountDown(value);
    }).onComplete(() => {
      setIsCountDownComplete(true);
    });
    if(isDelay) {
      await sleep(300);
    }
    codeInputRefList[0]?.handleFocus();
    codeInputRefList[codeCount-1]?.handleBlur();
  }

  const addPasteListener = () => {
    document.addEventListener("paste", e => {
      const item = e?.clipboardData?.items[0];
      const pattern = /\d+/g;
      if(item && item.kind === "string") {
        item.getAsString( str => {
          if(str.length === codeCount && pattern.test(str)) {
            setCodeList(str.split(""));
          }
        })
      }
    })
  }

  useEffect( () => {
    setCodeList(new Array(codeCount).fill(""));
  }, [codeCount]);

  useEffect(() => {
    return () => {
      countDownRef && typeof countDownRef.clear === "function" && countDownRef.clear();
    };
  }, []);

  useEffect(() => {
    addPasteListener();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const currentBodyClientHeight = document.documentElement.clientHeight;
      if (currentBodyClientHeight < initialBodyClientHeight) {
        setIsShowConfirmBtn(false);
      } else {
        setIsShowConfirmBtn(true);
      }
    });
  
  }, []);

  const clearErrorNotice = () => {
    if(!errorNotice) return;
    typeof onSetError === "function" && onSetError({
      errorCode: {
        key: "",
        displayMessage: "",
      }
    });
  }

  const handleKeyUp = async (e, index) => {
    const value = e.target.value;
    const BACKSPACE_KEY_CODE = 8;
    if (e.keyCode === BACKSPACE_KEY_CODE && index > 0) {
      clearErrorNotice();
      await sleep(0);
      codeInputRefList[codeCount-1].handleBlur();
      if([null, ''].includes(value)) {
        codeInputRefList[index].handleBlur();
        codeInputRefList[index-1].handleFocus();
        setActiveIndex(index-1);
      } else {
        codeList[index] = "";
        codeInputRefList[index].handleFocus();
        setActiveIndex(index);
        setCodeList([...codeList]);
      } 
    }
  };

  const handleChange = async (value, index) => {
    codeList[index] = value;
    setCodeList([...codeList]);
    if (index < codeCount - 1 && value) {
      codeInputRefList[index].handleBlur();
      codeInputRefList[index+1].handleFocus();
      setActiveIndex(index+1);
    }

    if(codeList.join("").length === codeCount && activeIndex === codeCount - 1) {
      await sleep(0);
      handleVerifyCode();
    }

    clearErrorNotice();
  };

  const handleIOSAutoComplete = (value) => {
    if (![codeCount, codeCount * 2].includes(value.length)) return;
    if (value.length === codeCount * 2) {
      value = value.slice(0, codeCount);
    }
    setCodeList(value.split(""));
  }

  const handleSendVerificationCode = () => {
    const { onSendVerificationCode, receiver } = props;
    typeof onSendVerificationCode === "function" && onSendVerificationCode(receiver, true);
  };

  const handleVerifyCode = () => {
    if(codeList.join("").length < codeCount) {
      const error = {
        errorCode: {
          key: "CODE_LENGTH_ERROR",
          displayMessage: L.getFormatCodeLength(codeCount),
        }
      }
      typeof onSetError === "function" && onSetError(error);
      return;
    }
    const { onVerifyCode } = props;
    typeof onVerifyCode === "function" && onVerifyCode(receiver, codeList.join(""));
  }

  const handleSwitchOtherWays = () => {
    typeof onSwitchOtherWays === "function" && onSwitchOtherWays();
  }

  const renderCodeList = () => {
    const list = [];
    for (let i = 0; i < codeCount; ++i) {
      list.push(<Input 
        className="code-item"
        ref={elem => {codeInputRefList[i] = elem}}
        value={codeList[i]}
        index={i}
        hasClear={false}
        type="tel"
        isPureNumber
        isIOSAutoComplete
        error={!!errorNotice}
        onIOSAutoComplete={handleIOSAutoComplete}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
      />);
    }
    return list;
  }
  
  return (
    <div className="code">
      <h1 className="code-title">{L.TITLE}</h1>
      <p className="code-noticce">{L.getNotice(codeCount)}</p>
      <div className="code-receiver">{receiverPrefix} {receiver}</div>
      <div className="code-list">
        {renderCodeList()}
      </div>
      {errorNotice && <div className="code-list-error">{errorNotice}</div>}
      { isCountDownComplete ? 
        <p className="code-count-down-resend" onClick={handleSendVerificationCode}>{L.RESEND_CODE}</p> : 
        <p className="code-count-down" dangerouslySetInnerHTML={{ __html: L.getResendCode(countDown)}}/>
      }
      {isShowConfirmBtn && <div className="code-btn">
        <Button className="code-btn-verify" onClick={handleVerifyCode}>{L.CODE_BTN}</Button>
        {onSwitchOtherWays && <div className="code-btn-switch" onClick={handleSwitchOtherWays}>{L.OTHER_WAYS}</div>}
      </div>}
    </div>
  );
}

export default forwardRef(VerificationCode);
