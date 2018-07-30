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
import HeadlineCreator2 from "../../Admin/HeadlineCreator2";

class Shrinker extends Component {

  state = {
    isShrunk: true,
    hover: false,
  };


  toggle() {
    this.setState({isShrunk: !this.state.isShrunk});

    if (this.props.pageActions.handlePageSqueeze && this.state.isShrunk) {
      this.props.pageActions.handlePageSqueeze();
    }
  }

  hover() {
    this.setState({hover: !this.state.hover});
  }


  render() {

    const {isShrunk, hover} = this.state;
    const {children} = this.props;

    return (
      <div onMouseLeave={this.hover.bind(this)} onMouseEnter={this.hover.bind(this)} onClick={this.toggle.bind(this)}>
        <Motion style={{height: spring((isShrunk ? 150 : 400))}}>
          {
            ({height}) => (
              <div style={{'overflow': 'hidden', 'height': height + 'px'}}>

                {isShrunk && hover && <div style={{'position': 'absolute'}}>

                  <Row>
                    <Col span={24}>
                      <Icon type={'plus'} style={{fontSize: '78px'}}/>
                      <span style={{fontSize: '24px'}}>3 minute read - 5 pieces of content</span>
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
    this.state = {adminmodal: false, flipped: false};
  }

  shouldComponentUpdate() {
    return true;
  }

  onChange = (editorStateKey) => (editorState) => {
    this.setState({ [editorStateKey]: editorState });
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
    const {data, thekey, extra, pageActions} = this.props;

    const raw = {"entityMap": {"1": {"data": {"mention": {"colours": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(236,222,239,0)", 0.2, "rgb(208,209,230)", 0.4, "rgb(166,189,219)", 0.6, "rgb(103,169,207)", 0.8, "rgb(28,144,153)"], "data": "heatmap_bad", "name": "Somewhere Bad", "geojson": {"duration": 2000, "center": [-79.94606, 40.44961], "zoom": 12}}}, "type": "@Hmention", "mutability": "SEGMENTED"}, "0": {"data": {"mention": {"name": "North Pitsburgh", "geojson": {"duration": 1000, "center": [-79.92606, 40.34961], "zoom": 12}}}, "type": "@Rmention", "mutability": "SEGMENTED"}, "2": {"data": {"mention": {"colours": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(12,34,239,0)", 0.2, "rgb(13,45,230)", 0.4, "rgb(12,18,219)", 0.6, "rgb(12,19,207)", 0.8, "rgb(1,144,153)"], "data": "heatmap_good", "name": "Somewhere Good", "geojson": {"duration": 2000, "center": [-79.94606, 40.44961], "zoom": 12}}}, "type": "@Hmention", "mutability": "SEGMENTED"}}, "blocks": [{"text": "dgfdf North Pitsburgh Somewhere Bad and somewher good Somewhere Good ", "entityRanges": [{"length": 15, "key": 0, "offset": 6}, {"length": 13, "key": 1, "offset": 22}, {"length": 14, "key": 2, "offset": 54}], "depth": 0, "data": {}, "key": "bs0hs", "inlineStyleRanges": [], "type": "unstyled"}]};


    const editorState = EditorState.createWithContent(convertFromRaw(raw));

    return (
      <ChartCard extra={<Tag color="blue">Week {thekey.week} </Tag>} bordered={false} key={1}>

        <HeadlineCreator2 onChange={this.onChange('editorState2')} readonly editorState={editorState} flyTo={this.flyTo.bind(this)} addBorder={this.addBorder.bind(this)}></HeadlineCreator2>

        <span style={{display: 'inline-block', 'float': 'right', 'paddingBottom': '10px'}}>
                <Tag color="magenta">racist</Tag>
                <Tag color="red">terrorist</Tag>
                <Tag color="volcano">miliant</Tag>
        </span>

      </ChartCard>
    );

  }
}

export default HeadlineCard;

HeadlineCard.defaultProps = {
  data: sample,
};
