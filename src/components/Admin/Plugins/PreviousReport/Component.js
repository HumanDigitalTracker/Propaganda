import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'antd';
import CustomMentionEditor from "../../../Admin/CustomComponentMentionEditor";
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'

export default class previousreportComponent extends Component {
  state = {modal: false, editorstate: EditorState.createWithContent(convertFromRaw(this.props.mention.data.editorState))};

  showModal() {
    this.setState({modal: true});
  }

  onChange = (editorState) => {
    this.setState({'editorstate': editorState});
  }

  render() {

    const {modal} = this.state;
    const {mention} = this.props;

    //this.setState({editorstate: EditorState.createWithContent(convertFromRaw(mention.data.editorState))});

    return (
      <span>

        <Modal width={700} title={mention.data.headline} visible={modal} onCancel={(e) => this.setState({modal: false})}
               footer={null}>
            {/*hack to make it look like we can show previous reports - I have just pasted the json into a 'data' property mention in CustomComponentMMentionEditor!*/}
          <CustomMentionEditor readOnly onChange={this.onChange.bind(this)} editorState={this.state.editorstate}/>

        </Modal>

        <span className={'mention'} onClick={this.showModal.bind(this)}>
              {mention.name}
        </span>
      </span>
    )
  }
}
