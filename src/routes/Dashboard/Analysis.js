import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import heatmap_bad from './../../assets/heatmap_bad.geojson';
import heatmap_good from './../../assets/heatmap_good.geojson';

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

import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

import YouTube from 'react-youtube';

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
    isSqueezed: false,
    contents : []
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'targetgroup/fetch',
      payload: {userId: 1}
    });

    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, key: {'type': 'group', id: 1}}
    });


  }

  handlePageSqueeze() {
    this.setState({isSqueezed: !this.state.isSqueezed});
  }

  loadTargetGroup(targetgroup) {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, key: {'type': 'group', id: targetgroup.id}}
    }).then((x) => {
      this.forceUpdate();
    });
  }

  addCard(mention) {
    this.setState({ contents: [...this.state.contents, mention] })
  }

  flyTo(whereTo) {
    if (this.map) this.map.flyTo(whereTo);
  }

  addBorder(geojson, clear) {

    const map = this.map;

    if (map) {

      try {
        console.log(geojson);
        if (map.getLayer('border')) map.removeLayer('border');
        if (map.getSource('border-source')) map.removeSource('border-source');

        if (!clear) {
          map.addSource('border-source', {
            type: 'geojson',
            data: {"type":"FeatureCollection","features" : [geojson.border]},
          });

          map.addLayer({
            'id': 'border',
            'type': 'fill',
            'source': 'border-source',
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.8,
            }
          },'waterway-label');
        }


      } catch (e) {
      }
    }
  }
  render() {

    const { isSqueezed, contents } = this.state;
    const { card } = this.props;
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

            <div id="columnChild82623" className="flexChild">

              <ul style={{listStyle : 'none', marginRight : '320px'}}>
                {contents.map((item) => <li style={{padding: '4px', float : 'right'}}>

                  <YouTube
                    videoId={item.url.split("v=")[1]}
                    opts={{ height: '60', width: '60', playerVars: { autoplay: 0, modestbranding: true } }}
                  />

                </li>)}
              </ul>

            </div>

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
                      <div style={{'background': 'white', 'marginTop': '76px', 'marginLeft': '96px', width: '946px'}}
                           id="rowChild14954" className="flexChild rounded">
                        {card.questioncards.map((thecard, index) => <span><CardLoader key={`card_${index}`}
                                                                                      pageActions={{
                                                                                        'addCard': this.addCard.bind(this),
                                                                                        'flyTo': this.flyTo.bind(this),
                                                                                        'addBorder': this.addBorder.bind(this)
                                                                                      }} thekey={thecard.key}
                                                                                      data={thecard.data}
                                                                                      card={thecard.component}/><Divider/></span>)}
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

                      <div style={{'paddingTop': '0px'}} id="columnChild87347" className="flexChild">

                        <Map
                          style="mapbox://styles/mapbox/light-v9"
                          containerStyle={{
                            marginLeft: '-5px',
                            marginTop: '14px',
                            height: "600px",
                            width: "838px",
                            position: 'absolute',
                          }}

                          onStyleLoad={(map) => {

                            that.map = map;
                            that.map.setCenter([44.361488, 33.312805]);
                            that.map.setZoom([4]);
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
