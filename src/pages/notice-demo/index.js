import React from "react";
import Notice from "@/components/notice/index.js";

class NoticeDemo extends React.PureComponent {
  render () {
    return (
      <div>
        <h1>
          I am notice demo
        </h1>
        <Notice lines={2}
          text="Didn't know what time it was and the lights were low
          I leaned back on my radio
          Some cat was layin' down some get it on rock 'n' roll, he said
          Then the loud sound did seem to fade
          Came back like a slow voice on a wave of phase haze
          That weren't no D.J. that was hazy cosmic jive"
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <Notice lines={2}
          text="Didn't know what time "
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <Notice lines={2}
          text="Didn't know what time it was and the lights were low
          I leaned back "
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <Notice lines={2}
          text="寂寞围绕着电视 垂死坚持 在两点半消失 多希望有人来陪我 度过末日
          空虚敲打着意志
          彷佛这时间已静止"
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <Notice lines={1}
          text="寂寞围绕着电视 垂死坚持"
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <Notice lines={2}
          text="Didn't know what time it was and the lights were low
          I leaned back "
          image="https://laz-img-cdn.alicdn.com/tfs/TB1xCV6YRr0gK0jSZFnXXbRRXXa-52-52.png"
          />

        <div>Here is another text</div>
      </div>
    );
  }
}

export default NoticeDemo;