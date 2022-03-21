// 提取样式
function extractStyle(text = "") {
  let obj = JSXParser(text);
  if (!obj) {
    vscode.window.showErrorMessage("Please check your JSX syntax");
    return false;
  } else {
    return generateSass(obj);
  }
}

/*
  {
    type: "div",
    props: {
      className: "abc",
      id: "demo"
    },
    children: [

    ]
  }
*/
const DEFAULT_SPACE_COUNT = 2;  // 默认缩进为2个空格
function generateSass(obj, spaceCount = 0) {
  let result = "";
  let {
    props,
    children
  } = obj;
  if(!props || !children) {
    return "";
  }

  if (props.className) {
    let classNames = "";
    if(typeof props.className === "object" && props.className.type === "#jsx") {
      classNames = jsxClassNameToCommon(props.className.nodeValue).split(" ");
    } else {
      classNames = props.className.trim().split(" ");
    }

    result += generateWhiteSpace(spaceCount);
    let arr = [];
    for (let item of classNames) {
      if (!item) continue;
      arr.push(`.${item}`)
    }
    result += arr.join(", ") + " {\n";
  }

  if (children.length) {
    let prefix = "";
    let count = props.className ? DEFAULT_SPACE_COUNT : 0;
    for (let [index, item] of children.entries()) {
      prefix = (index === 0 || !item?.props?.className) ? "" : "\n";
      result += prefix + generateSass(item, spaceCount + count);
    }
  }

  if(props.className) {
    result += "\n" + generateWhiteSpace(spaceCount) + "}"
  }

  return result;
}

/* 
  @description: 转换jsx className
  eg: classNames('set-pin-container', { 'keyboard-active': keyboardActive })
*/

function jsxClassNameToCommon (className) {
  className = className.replace(/'/g, '"');
  let result = "",
    leftFlag = false;
  for(let value of className) {
    if(value === '"') {
      if(leftFlag) {
        leftFlag = false;
        result += " ";
      } else {
        leftFlag = true;
      }
      continue;
    }
    if(leftFlag) {
      result += value;
    }
  }
  return result.trim();
}


// 生成指定数量的空格
function generateWhiteSpace(cnt) {
  let result = "";
  for (let i = 0; i < cnt; ++i) {
    result += " ";
  }
  return result;
}


let case1 = `
<ul className="address">
  {this.state.list.map(item =>
    <li className={cx({ "active": item === this.currentAddress })}
      key={item}
      onClick={() => this.handleClick(item)}>
      {item}
    </li>)}
</ul>
`;

let case2 = `
  <div className="container">
    <ul className="order-list" a={b}>
      <li className="order-item"></li>
    </ul>
  </div>
`;

// fix
let case3 = `
  <div className={classNames('set-pin-container', { 'keyboard-active': keyboardActive })}>
  </div>
`;

let case4 = `
  <li className={cx({ "active": item === this.currentAddress })}>
    {item}
  </li>
`;

let case5 = `
<div className="page">
  <img
    className="icon"
    src="https://laz-img-cdn.alicdn.com/tfs/TB10rKhU4z1gK0jSZSgXXavwpXa-401-401.png"
  />
  <p className="title">{language.TITIE}</p>
  <p className="text">{language.TPIS_TEXT}</p>
  <div className="btn" type="primary" onClick={this.startSelfie}>
    <img src={icon} className="btn-icon" />
    <span className="btn-text">{language.TAKE_SELFIE_V2}</span>
  </div>
</div>
`

let case6 = `
<div className={retainDialog ? 'page' : ''}>
<Loading
  forceGif
  customGif="//laz-img-cdn.alicdn.com/tfs/TB1hgibm5_1gK0jSZFqXXcpaXXa-124-124.gif"
  visible={showLoading}
/>
<div className="srcoll-box">
  {pageStructure[0].show && (
    <Element name={pageStructure[0].name}>
      <OCR
        showPic={showOCRPic}
        cardList={cardList}
        data={{
          name: formData.name,
          ktp: formData.ktp,
          img: formData.frontIdPhoto,
        }}
        succCallBack={this.succCallBack}
        failedCallBack={this.failedCallBack}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[0].name);
        }}
      />
    </Element>
  )}
  {/* {pageStructure[1].show && (
    <Element name={pageStructure[1].name}>
      <TakePhoto
        accessKeyId={accessKeyId}
        accessKeySecret={accessKeySecret}
        stsToken={stsToken}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[1].name);
        }}
      />
    </Element>
  )} */}
  {pageStructure[1].show && (
    <Element name={pageStructure[1].name}>
      <Detail
        data={{
          phoneNum: formData.phoneNum,
          email: formData.email,
        }}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[1].name);
        }}
      />
    </Element>
  )}
  {
    <Element
      name={pageStructure[2].name}
      className={this.createHideClass(pageStructure[2].show)}
    >
      <Address
        province={this.state.formData.provinceLive}
        district={this.state.formData.cityLive}
        postCode={this.state.formData.areaLive}
        addressInfo={this.state.formData.addressDetailLive}
        map={AddressMap}
        getData={this.getData}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[2].name);
        }}
      />
    </Element>
  }
  {pageStructure[3].show && (
    <Element name={pageStructure[3].name}>
      <Experience
        industry={industry}
        educationLevel={educationLevel}
        occupation={occupation}
        yearsOfWorking={yearsOfWorking}
        monthlyIncome={monthlyIncome}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[3].name);
        }}
      />
    </Element>
  )}
  {pageStructure[4].show && (
    <Element name={pageStructure[4].name}>
      <EmergencyForm
        data={{
          contactPersonName: formData.contactPersonName,
          contactPersonPhone: formData.contactPersonPhone,
          contactPersonRelationship: formData.contactPersonRelationship,
          userPhoneNum: formData.phoneNum,
        }}
        relationShip={contactPersonRelationship}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[4].name);
        }}
      />
    </Element>
  )}
  {pageStructure[5].show && (
    <Element name={pageStructure[5].name}>
      <MotherInfo
        data={{
          motherName: formData.motherName,
        }}
        maritalStatus={maritalStatus}
        wrappedComponentRef={(inst) => {
          this.getRef(inst, pageStructure[5].name);
        }}
      />
    </Element>
  )}
  {pageStructure[6] &&
    pageStructure[6].show &&
    showGpsCard && (
      <Element name={pageStructure[6].name}>
        <DeviceInfo
          wrappedComponentRef={(inst) => {
            this.getRef(inst, pageStructure[6].name);
          }}
        />
      </Element>
    )}
  <AkuLogo text={language.POWEREDBY} />
</div>
<div className="empty-holder-box" />
<NextBackBtn
  scene={'paylater'}
  show={showOCRPic}
  promotionInfo={promotionInfo}
  selfProgress={this.selfProgress}
  nextBtnText={language.NEXT}
  backBtnText={language.BACK}
  backBtnFinalText={language.ENABLE_AND_SUBMIT}
  length={pageStructure.length}
  step={this.index}
  nextFuncClick={this.scrollToSection}
  backFuncClick={this.scrollBackSection}
/>
<Dialog className="retain-dialog" showDialog={retainDialog} closable={false}>
  <span className="title">{language.LEAVE_TITLE}</span>
  <span className="text">{language.LEAVE_TEXT}</span>
  {displayVoucher && giveUpPicUrl ? (
    <img className="give-up-img" src={giveUpPicUrl} alt="" />
  ) : null}
  <div className="button-group">
    <Button className="retain-button" onClick={this.retainDialogConfirm}>
      {language.LEAVE_RIGHTTEXT}
    </Button>
    <Button className="retain-button" onClick={this.retainDialogCancel}>
      {language.LEAVEL_LEFTBTN}
    </Button>
  </div>
</Dialog>
</div>
`
let case7 = `
  <div className="debug-tool" id="abc">
    <h1>debug tool</h1>
    <div onClick={this.handleClick}>add 1</div>
  </div>
`

let case8 = `
<div className="confetti-box">
  <div className="confetti-btn-list">
    <div className="confetti-btn-item" onClick={this.handlePlay}>play</div>
    <div className="confetti-btn-item" onClick={this.handlePause}>pause</div>
    <div className="confetti-btn-item" onClick={this.handleDestroy}>destroy</div>
  </div>

  <div className="confetti-wrapper" ref={this.confettiWrapperRef}>

  </div>
</div>
`;

let case9 = `
<ul className="receipt-list">
  {
    list.map((item, index) => <li className="receipt-item" style={{color: item.color}} key={index}>
      <div className="receipt-item-circle" style={{backgroundColor: item.color}}>
      </div>
      <p className="receipt-item-text">{item.text}</p>
      { item.selected && <div className="receipt-item-selected">right tick</div> }
    </li>)
  }
</ul>
`;

let case10 = `
  <div className="container">
    {isShowNotice && <div className="notice">I am notice</div>}
  </div>
`;

let case11 = `
  <div className="container">
    {isShowNotice && <div className="notice">I am notice</div>}
  </div>
`;

let case12 = `
  <div className="container">
    <ul className="fruit-list">
      { fruitList.map(item => <li className="fruit-item">
        <span className="fruit-item-name">{item.name}<span>
        {item.selected && <span className="fruit-item-name"><span>}
      <li>)}
    </ul>
  </div>
`;

// debugger
let parseResult = JSXParser(case12);
let style = generateSass(parseResult)
console.log(parseResult)
console.log(style)
