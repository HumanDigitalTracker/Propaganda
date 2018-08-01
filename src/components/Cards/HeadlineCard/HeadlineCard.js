import React, {Component} from 'react';
import {Chart, Geom, Axis, Tooltip, Legend, Coord} from 'bizcharts';
import numeral from "numeral";
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import {Row, Col, Modal, Button, Divider, Tag, Icon} from 'antd';

import Flip from 'components/Flip';
import {Motion, spring} from 'react-motion';

import {ChartCard} from 'components/Charts';
import HeadlineSummary from "../../Headlines/HeadlineSummary";

import sample from './sample.json';
import schema from './schema.json';
import CustomMentionEditor from "../../Admin/CustomComponentMentionEditor";

class Shrinker extends Component {

  state = {
    isShrunk: true,
    hover: false,
  };


  toggle() {
    this.setState({isShrunk: !this.state.isShrunk});
  }

  hover() {
    this.setState({hover: !this.state.hover});
  }


  render() {

    const {isShrunk, hover} = this.state;
    const {children} = this.props;

    return (
      <div onMouseLeave={this.hover.bind(this)} onMouseEnter={this.hover.bind(this)} onClick={this.toggle.bind(this)}>
        <Motion style={{height: spring((isShrunk ? 150 : 600))}}>
          {
            ({height}) => (
              <div style={{'overflow': 'hidden', 'height': height + 'px'}}>

                {isShrunk && <div style={{'position': 'absolute'}}>

                  <Row>
                    <Col span={24}>
                      <Icon type={'plus'} style={{fontSize: '78px'}}/>
                      <span style={{fontSize: '24px'}}>3 minute read - 5 pieces of content</span>
                    </Col>


                  </Row>

                </div>}

                {hover && !isShrunk && <div style={{'position': 'absolute'}}>

                  <Row>
                    <Col span={24}>
                      <span style={{fontSize: '24px'}}>Reduce</span>
                    </Col>


                  </Row>

                </div>}


                <div style={isShrunk ? {opacity: 0.3} : {opacity: 1.0}}>
                  {children}
                </div>

              </div>)

          }

        </Motion></div>);

  }
}

class HeadlineCard extends Component {
  constructor(props) {
    super(props);
    this.schema = schema;
    this.state = {adminmodal: false, flipped: false, headline : props.data.headline, editorState : EditorState.createWithContent(convertFromRaw( props.data.editorState ))};
  }

  shouldComponentUpdate() {
    return true;
  }

  onChange = (editorState) => {
    this.setState({ 'editorState': editorState });
  }

  flyTo() {
    alert(1);
  }

  addBorder() {
    alert(2);
  }

  save(json) {
    // console.log(json)
  }

  render() {
    const { data, thekey, extra, pageActions } = this.props;
    const { editorState, headline } = this.state;

    return (
      <ChartCard bordered={false} key={1}>

        <h1> {headline} </h1>

       <Shrinker>
          <CustomMentionEditor readOnly flyTo={this.flyTo.bind(this)} addBorder={this.addBorder.bind(this)} onChange={this.onChange.bind(this)} editorState={ editorState } />
       </Shrinker>

      </ChartCard>
    );

  }
}

export default HeadlineCard;

HeadlineCard.defaultProps = {
  data: sample,
};
