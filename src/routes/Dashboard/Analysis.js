import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Button,
  Divider
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import {getTimeDistance} from '../../utils/utils';

import {Motion, spring} from 'react-motion';

import styles from './Analysis.less';

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});


import CardJSONEditor from "components/CardJSONEditor/CardJSONEditor";
import CardLoader from "components/CardLoader/CardLoader";
import Facebook from "../../components/Content/Facebook/Facebook";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Yuan = ({children}) => (
  <span
    dangerouslySetInnerHTML={{__html: yuan(children)}} /* eslint-disable-line react/no-danger */
  />
);

@connect((namespaces) => {

  return {
    targetgroup: namespaces.targetgroup,
    card: namespaces.card,
  }
})

export default class Analysis extends Component {
  state = {
    isMobile: false,
    isSqueezed: false
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'targetgroup/fetch',
      payload: {userId: 1}
    });

    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, key: {'type' : 'group', id: 3}}
    });


  }

  handlePageSqueeze() {
    this.setState({isSqueezed: !this.state.isSqueezed});
  }

  loadTargetGroup(targetgroup) {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, key: {'type' : 'group', id: targetgroup.id}}
    }).then((x)=> {
      this.forceUpdate();
    });
  }




  render() {

    const {isSqueezed} = this.state;
    const {targetgroup, card} = this.props;
    const that = this;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: {marginBottom: 24},
    };

    return (
      <div className={styles.flexboxlayout}>



        <div>
          <div id="container" className="flexcanvas flexChild columnParent">

            <div id="columnChild9707" className="flexChild rowParent">
              <div id="rowChild30953" className="flexChild rowParent">


                <Motion key={1} style={{width: spring(isSqueezed ? 100 : 250)}}>
                  {
                    ({width}) => (

                      <div style={{'width': width}} id="rowChild19929" className="flexChild rounded">

                      </div>

                    )}
                </Motion>

                <Motion key={2} style={{width: spring(isSqueezed ? 500 : 750)}}>
                  {
                    ({width}) => (
                      <div style={{'background' : 'white', 'marginTop': '91px', 'marginLeft': '96px', width: '946px' }} id="rowChild14954" className="flexChild rounded">
                        {card.questioncards.map((thecard, index) => <span><CardLoader key={`card_${index}`} pageActions={{'handlePageSqueeze' : this.handlePageSqueeze.bind(this)}} thekey={ thecard.key } data={ thecard.data } card={thecard.component}/><Divider /></span> ) }
                      </div>)
                  }

                </Motion>

                <div style={{'position': 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                </div>
              </div>

              <Motion key={4} style={{width: spring(isSqueezed ? 400 : 836)}}>
                {
                  ({width}) => (
                    <div style={{'width': width}} id="rowChild12611" className="flexChild columnParent">
                      <div id="columnChild20412" className="flexChild columnParent">
                        <div id="columnChild2978" className="flexChild rounded"></div>
                      </div>

                      <div style={{'paddingTop' : '0px'}} id="columnChild87347" className="flexChild">

                        <Map
                          style="mapbox://styles/mapbox/light-v9"
                          containerStyle={{
                            height: "100vh",
                            width: "838px",
                            position: 'absolute',
                          }}

                          onStyleLoad={(map) => {

                            that.map = map;
                            that.map.setCenter( [ 44.361488, 33.312805 ]);
                          }}
                        >

                        </Map>

                      </div>
                    </div>)

                }

              </Motion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
