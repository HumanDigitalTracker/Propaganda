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


  toggle(e, data) {
   this.setState({isShrunk: false});
  }

  hover() {
    this.setState({hover: !this.state.hover});
  }


  render() {

    const {isShrunk, hover} = this.state;
    const {children} = this.props;

    return (
      <div id="tyresrtrt" onClick={this.toggle.bind(this)}>
        <Motion style={{height: spring((isShrunk ? 105 : 700))}}>
          {
            ({height}) => (
              <div style={{'overflow': 'hidden', 'height': height + 'px'}}>

                <div >
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

  render() {



    const { data, thekey, extra, pageActions } = this.props;

    console.log(pageActions);

    const { editorState, headline } = this.state;

    return (<Shrinker>
      <ChartCard bordered={false} key={1} title={<h2 style={{height : '36px'}}>{headline} {extra}</h2>}>

        <Tag style={{color: '#4386BF'}}>Martyrdom</Tag>

        <Tag style={{color: '#4386BF'}}>Asymmetrical War</Tag>

        <Tag style={{color: '#4386BF'}}>Iraq</Tag>

        <Tag style={{color: '#4386BF'}}>Syria</Tag>

        <div>
          <Tag style={{color: '#AFB7C2', border: 'none', background: 'none'} }>38 Items</Tag>
          <Tag style={{color: '#AFB7C2', border: 'none', background: 'none'} }>03/08/2018</Tag>
        </div>


          <CustomMentionEditor readOnly addCard={pageActions.addCard.bind(this)} flyTo={pageActions.flyTo.bind(this)} addBorder={pageActions.addBorder.bind(this)} onChange={this.onChange.bind(this)} editorState={ editorState } />


      </ChartCard>  </Shrinker>
    );

  }
}

export default HeadlineCard;

HeadlineCard.defaultProps = {
  data: sample,
};
