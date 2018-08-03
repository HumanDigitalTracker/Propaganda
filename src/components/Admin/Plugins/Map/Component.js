import React, {Component} from 'react';
import {Modal, Row, Col, Form, Icon } from 'antd';

import * as MapboxGl from 'mapbox-gl';

import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";

import * as geojsonextent from '@mapbox/geojson-extent';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

const formItemLayout = {
  labelCol: {span: 12},
  wrapperCol: {span: 12},
};

export default class mapComponent extends Component {
  state = {modal: false};

  showModal() {
    this.setState({modal: true});
  }

  render() {

    const {modal} = this.state;
    const {mention} = this.props;
    const that = this;

    return (
      <span>

        <Modal getContainer={()=> document.getElementById('rowChild14954') || document.body}  style={{ top: '152px', left: '-290px' }} width={700} title={mention.name + ': Notable Battles'} visible={modal}
               onCancel={(e) => this.setState({modal: false})} footer={null}>

          <Map
            style="mapbox://styles/mapbox/light-v9"
            containerStyle={{
              height: "500px",
              width: "100%",
            }}

            onStyleLoad={(map) => {

              that.map = map;
              that.map.setCenter([44.361488, 33.312805]);

              mention.geojson.features.forEach((marker) => {

                // create the popup
                const popup = new MapboxGl.Popup().setHTML('<h2>' + marker.properties.location + '</h2><h3>' + marker.properties.description + '</h3>')

                new MapboxGl.Marker()
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(popup)
                  .addTo(this.map);
              });

              this.map.fitBounds(geojsonextent(mention.geojson), {
               duration : 0,
                padding: 120,
              });

            }}
          >

                        </Map>

        </Modal>

        <span className={'mention'} onClick={this.showModal.bind(this)}>
              <Icon type="global" /> {mention.name}
        </span>
      </span>
    )
  }
}
