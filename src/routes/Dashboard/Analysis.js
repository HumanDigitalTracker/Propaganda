import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

import {
  Tabs,
  DatePicker,
  Divider,
  Icon,
  Button,
  Row, Col,
} from 'antd';

import {Motion, spring} from 'react-motion';

import styles from './Analysis.less';

import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

import YouTube from 'react-youtube';
import * as MapboxGl from 'mapbox-gl';
import * as geojsonextent from '@mapbox/geojson-extent';

import CardLoader from "components/CardLoader/CardLoader";
import Favourite from "../../components/Favourites/Favourite";
import ViewFavourites from "../../components/Favourites/ViewFavourite";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect((namespaces) => {

  return {
    targetgroup: namespaces.targetgroup,
    card: namespaces.card,
  }
})

export default class Analysis extends Component {
  state = {
    isMobile: false,
    viewfavouritesmodal : false,
    isSqueezed: false,
    contents : [],
    favourites : [],
    tab : '1'
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

  viewFavourites() {
    this.setState({ viewfavouritesmodal: !this.state.viewfavouritesmodal})
  }

  addFavourite(card) {
    this.setState({ favourites: [...this.state.favourites, card] })
  }

  addCard(mention) {
    this.setState({ contents: [...this.state.contents, mention] })
  }

  flyTo(mention) {

    if (this.map){

      this.setState({tab : '2'});

      mention.geojson.features.forEach((marker) => {

        // create the popup
        const popup = new MapboxGl.Popup().setHTML('<h3>' + marker.properties.location + '</h3><p>' + marker.properties.description + '</p>')

        new MapboxGl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(this.map);
      });

      this.map.fitBounds(geojsonextent(mention.geojson), {
        padding: 120,
      });
    }
  }

  addBorder(geojson, clear) {

    const map = this.map;

    if (map) {

      try {

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

    const { isSqueezed, contents, favourites, viewfavouritesmodal } = this.state;
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

    const data = [
      { country: 'North Syria', casualties: 100 },
      { country: 'Southern Syria', casualties: 255 },
    ];

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data)
      .transform({
        type: 'sort',
        callback(a, b) { // 排序依据，和原生js的排序callback一致
          return a.population - b.population > 0;
        }
      });

    return (
      <div className={styles.flexboxlayout}>


        <div>

          <ViewFavourites visible={viewfavouritesmodal} cards={favourites} onCancel={this.viewFavourites.bind(this)}/>

          <div id="container" className="flexcanvas flexChild columnParent">

            <div id="columnChild82623" className="flexChild">

              <Row>
                <Col span={8}>
                  <ul style={{listStyle : 'none', marginTop: '10px',  marginRight: '-639px'}}>
                    {favourites.map((item) => <li style={{padding: '4px', float : 'right'}}>
                      <Icon type={'star'} style={{color : 'green'}}/>
                    </li>)}
                    <li style={{padding: '4px', float : 'right'}}>{favourites.length && <Button onClick={this.viewFavourites.bind(this)}> View favourites </Button> } </li>
                    </ul>

                </Col>

                <Col>
                  <ul style={{listStyle : 'none', marginRight : '320px'}}>
                    {contents.map((item) => <li style={{padding: '4px', float : 'right'}}>

                      <YouTube
                        videoId={item.url.split("v=")[1]}
                        opts={{ height: '60', width: '60', playerVars: { autoplay: 0, modestbranding: true } }}
                      />

                    </li>)}
                  </ul>
                </Col>
              </Row>
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
                                                                                      extra={null/*<Favourite onClick={this.addFavourite.bind(this)} card={thecard}/>*/}
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
                        <div id="columnChild2978" className="flexChild rounded" style={{marginTop : '126px'}}>


                          {/*<Tabs defaultActiveKey={1} activeKey={this.state.tab} onTabClick={(tab) => {console.log(tab); this.setState({'tab' : tab}) }}>
                            <TabPane tab={ <Icon type="line-chart" /> } key="1" >
                              Marcias graph!
                            </TabPane>
                            <TabPane tab={ <Icon type="global" /> } key="2" >
                              <Chart height={400} data={dv} forceFit>
                                <Coord transpose />
                                <Axis name="country" label={{offset: 12}} />
                                <Axis name="casualties" />
                                <Tooltip />
                                <Geom type="interval" position="country*casualties" />
                              </Chart>
                            </TabPane>
                          </Tabs>*/}

                        </div>
                      </div>

                      <div style={{'paddingTop': '0px'}} id="columnChild87347" className="flexChild">

                        {/*<Map*/}
                          {/*style="mapbox://styles/mapbox/light-v9"*/}
                          {/*containerStyle={{*/}
                            {/*marginLeft: '-17px',*/}
                            {/*marginTop: '21px',*/}
                            {/*height: "600px",*/}
                            {/*width: "838px",*/}
                            {/*position: 'absolute',*/}
                          {/*}}*/}

                          {/*onStyleLoad={(map) => {*/}

                            {/*that.map = map;*/}
                            {/*that.map.setCenter([44.361488, 33.312805]);*/}
                            {/*that.map.setZoom([4]);*/}
                          {/*}}*/}
                        {/*>*/}

                        {/*</Map>*/}

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
