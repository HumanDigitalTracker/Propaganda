import React, {PureComponent} from 'react';
import {Row, Col, Modal, Button, Steps, Table} from 'antd';
import CardLoader from "../CardLoader/CardLoader";

const Step = Steps.Step;


export default class ViewFavourites extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({current});
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  }


  render() {
    const {onCancel, onClick, cards, visible} = this.props;
    const {saved, current} = this.state;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'jb@outlook.com',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'jg@hotmail.com',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'jb@gmail.com',
    }];



    const steps = [{
      title: <span> Preview content   </span>,
      content: <Row>
        <Col span={10} key={1}>

          {cards[0] && <CardLoader key={`card_1`}
                                   pageActions={{
                                     'addCard': () => {
                                     },
                                     'flyTo': () => {
                                     },
                                     'addBorder': () => {
                                     }
                                   }} thekey={cards[0].key}
                                   data={cards[0].data}
                                   card={cards[0].component}/>
          }
        </Col>

        <Col span={4} key={2}>

        </Col>

        <Col span={10} key={2}>
          {cards[1] && <CardLoader key={`card_2`}
                                   pageActions={{
                                     'addCard': () => {
                                     },
                                     'flyTo': () => {
                                     },
                                     'addBorder': () => {
                                     }
                                   }} thekey={cards[1].key}
                                   data={cards[1].data}
                                   card={cards[1].component}/>
          }
        </Col>

      </Row>,
    }, {
      title: 'Select recipients',
      content: <Table rowSelection={{selectedRowKeys: []}} columns={columns} dataSource={data} />,
    }, {
      title: 'Send',
      content: <Row><Col span={8}></Col><Col span={8}><h1>Click send to send the email to the recipients</h1></Col><Col span={8}></Col></Row>,
    }];

    return (
      <span>

      <Modal visible={visible} width={'80%'} footer={[
        ((current === 0 || current ===1) ? <Button type="primary" onClick={this.prev.bind(this)}>Back</Button> : <span></span>),
        ((current === 0 || current ===1) ? <Button type="primary" onClick={this.next.bind(this)}>Next</Button> : <Button type="danger" onClick={onCancel}>Send</Button>),

      ]} onCancel={onCancel}>

        <div>
        <Steps current={current}>
          {steps.map((item, i) => <Step key={i} title={item.title}/>)}
        </Steps>

        <div className="steps-content">{steps[current].content}</div>

        </div>

      </Modal>

      </span>

    );
  }
}





