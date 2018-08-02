import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'antd';

const formItemLayout = {
  labelCol: {span: 12},
  wrapperCol: {span: 12},
};

export default class actorComponent extends Component {
  state = {modal: false};

  showModal() {
    this.setState({modal: true});
  }

  render() {

    const {modal} = this.state;
    const {mention} = this.props;

    return (
      <span>

        <Modal width={700} title={'Abu Bakr Al-Baghdadi'} visible={modal}
               onCancel={(e) => this.setState({modal: false})} footer={null}>

          <Row>

            <Col span={10}>
              <img alt='' style={{'objectFit': 'cover', 'width': '300px', 'height': '300px'}} src={mention.data.image}/>
            </Col>

            <Col span={14}>
            <Form>

              {mention.data.items.map((e, i) =>

                <Form.Item
                  {...formItemLayout}
                  label={e.title}
                  key={i}
                  style={{marginBottom: '0px'}}
                >
                  <span className="ant-form-text">{e.value}</span>
                </Form.Item>
              )
              }

            </Form>
            </Col>
          </Row>


          {/*<Table pagination={false} dataSource={dataSource} columns={columns} />*/}

          <p>
              {mention.data.paragraph1}
          </p>

          <p>
              {mention.data.paragraph2}
          </p>

        </Modal>

        <span className={'mention'} onClick={this.showModal.bind(this)}>
              {mention.name}
        </span>
      </span>
    )
  }
}
