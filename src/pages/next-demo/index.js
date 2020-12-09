import React from "react";
import "./index.scss";
import { Input, Field, Form} from '@alifd/next';

class NextDemo extends React.Component {
  constructor (props) {
    super(props);
    this.field = new Field(this, {parseName: true});
  }

  handleGetValues = () => {
    let values = this.field.getValues()
    let {getErrors} = this.field;
    console.log(getErrors())
    console.log(values);
  }

  handleSubmit = () => {
    console.log(this.field.getValues())
  }

  render () {
    const { init } = this.field;
    return (
      <div className="container">
        <Form className="form">
          <Form.Item label="name">
            <Input {...init("name", {
              rules: [],
            })}/>
          </Form.Item>
          <Form.Item label="age">
            <Input {...init("age", {
              rules: [{
                required: true,
                message: "age mandatory"
              }],
            })}/>
          </Form.Item>

          <Form.Submit onClick={this.handleSubmit}>Submit</Form.Submit>
        </Form>

        <div className="btn"> I am a button</div>
      </div>
    );
  }
}

export default NextDemo;

/*
  componentWillReceiveProps
*/