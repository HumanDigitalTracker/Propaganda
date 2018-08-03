import React, {Component, Fragment} from 'react';
import * as MapboxGl from 'mapbox-gl';
import * as geojsonextent from '@mapbox/geojson-extent';

import {connect} from 'dva';

import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'


import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import {
  Row,
  Col,
  Button,
} from 'antd';

import { Select } from 'antd';

import borders from '../assets/allcountries';
import heatmap_bad from '../assets/heatmap_bad.geojson';
import heatmap_good from '../assets/heatmap_good.geojson';

import CustomMentionEditor from "../components/Admin/CustomComponentMentionEditor";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});


@connect((namespaces) => {

  return {
    card: namespaces.card,
  }
})

export default class Admin extends Component {
  //EditorState.createEmpty(),

  raw = {"entityMap": {"1": {"data": {"mention": {"url": "https://videos.files.wordpress.com/4cDBZnMG/the-islamic-state-22tribulations-and-blessings-wilacc84yat-gharb-ifricc84qicc84yyah22_dvd.mp4", "created": "Fri, 03 Aug 2018 09:04:17 GMT", "type": "raw", "id": 25, "title": "Tribulations and Blessings"}}, "type": "^mention", "mutability": "SEGMENTED"}, "0": {"data": {"mention": {"url": "https://videos.files.wordpress.com/OFBfTYKJ/the-islamic-state-22the-point-of-death-wilacc84yat-barqah22_dvd.mp4", "created": "Fri, 03 Aug 2018 08:56:52 GMT", "type": "raw", "id": 24, "title": "The Point of Death"}}, "type": "^mention", "mutability": "SEGMENTED"}, "3": {"data": {"mention": {"data": {"items": [{"value": "Ibrahim Awad Ibrahim al-Badri", "title": "Birth Name"}, {"value": "Saladin Governorate, Iraq", "title": "Place of Birth"}, {"value": "1971, Samarra, Iraq", "title": "Date of Birth"}, {"value": "-", "title": "Date of Death"}, {"value": "Leader of the Islamic State of Iraq and the Levant", "title": "Rank"}, {"value": "Leader of Islamic State of Iraq", "title": "Commands Held"}, {"value": "Daesh, Former: Muslim Brotherhood, Islamic State in Iraq (Al-Qaeda affiliated)", "title": "Affiliations"}], "image": "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2018/2/12/c6242b2d89194957910c6599f10025a5_18.jpg", "paragraph1": "Abu Bakr al-Baghdadi\u2014born \u201cIbrahim Awwad Ibrahim al-Badri\u201d in 1971 in Samarra, Iraq\u2014has served as ISIS\u2019s caliph, Arabic for \u201csuccessor,\u201d since June 2014. In assuming the title, Baghdadi declared himself the religious, political, and military leader of all Muslims. Baghdadi has been in hiding since the collapse of ISIS\u2019s caliphate in Syria and Iraq.", "paragraph2": "Baghdadi is careful to reveal little about his identity or background. There were reportedly only two publicly available photographs of Baghdadi prior to ISIS\u2019s rise to the international stage in 2014. Known as the \u201cinvisible sheikh,\u201d Baghdadi wears a mask when addressing other ISIS commanders. However, an un-masked Baghdadi addressed members of ISIS in July 2014 from the pulpit of Mosul\u2019s Great Mosque.", "paragraph3": ""}, "name": "Abu Bakr Al-Baghdadi"}}, "type": "@Amention", "mutability": "SEGMENTED"}, "2": {"data": {"mention": {"data": {"headline": "Staying relevant: Maximising the impact of new content", "editorState": {"entityMap": {"1": {"type": "^mention", "data": {"mention": {"url": "https://www.youtube.com/watch?v=-GmfBeJLgoc", "created": "Thu, 26 Jul 2018 11:01:43 GMT", "type": "youtube", "id": 19, "title": "And They Gave Zakah"}}, "mutability": "SEGMENTED"}, "0": {"type": "^mention", "data": {"mention": {"url": "https://www.youtube.com/watch?v=7yBy_kSBM58", "created": "Thu, 26 Jul 2018 11:01:30 GMT", "type": "youtube", "id": 11, "title": "Victory From God and an Imminent Conquest (1)"}}, "mutability": "SEGMENTED"}}, "blocks": [{"text": "  undefined is part of a linked five-part series of videos, three of which feature in the top 25 shared pieces of content over the period. Given shrinking resources and territory, it is highly likely that video content produced by the organisation has to showcase the limited operational capabilities and successes of the organisation in the best possible light. Older content serves to prevent previous victories fading from memory, whilst maintenance of production values and an upbeat tone for more recent content acts as a way of continuing a narrative of success despite an obvious lack of real victories. ", "entityRanges": [{"length": 9, "key": 0, "offset": 2}], "depth": 0, "key": "bs0hs", "type": "unstyled", "inlineStyleRanges": [], "data": {}}, {"text": "", "entityRanges": [], "depth": 0, "key": "ag9ns", "type": "unstyled", "inlineStyleRanges": [], "data": {}}, {"text": "A similar intent is also likely behind the reuse of the video undefined which showcases the organisations\u2019previous bureaucratic and administrative abilities as a governing organisation collecting and distributing to those in need as well as providing official advice and guidance. Interestingly, this video also contains extensive English subtitles, which indicates that it is intended for a wider audience than is normal for the organisations\u2019content. , which showcases the organisationsprevious bureaucratic and administrative abilities as a governing organisation collecting and distributing to those in need as well as providing official advice and guidance. Interestingly, this video also contains extensive English subtitles, which indicates that it is intended for a wider audience than is normal for the organisations content", "entityRanges": [{"length": 9, "key": 1, "offset": 62}], "depth": 0, "key": "cbe6s", "type": "unstyled", "inlineStyleRanges": [], "data": {}}, {"text": "", "entityRanges": [], "depth": 0, "key": "cms02", "type": "unstyled", "inlineStyleRanges": [], "data": {}}, {"text": "Given the subject, and the \u2018authoritative\u2019 guidance presented within the video, it is likely this is intended to present a narrative that the organisation is relevant as the leader of the Muslim world and a legitimate state body, rather than one on the verge of defeat. ", "entityRanges": [], "depth": 0, "key": "5qdaj", "type": "unstyled", "inlineStyleRanges": [], "data": {}}]}}, "name": "Previous Report"}}, "type": "@Lmention", "mutability": "SEGMENTED"}, "5": {"data": {"mention": {"data": {"items": [{"value": "Tarkhan Tayumurazovich Batirashvili", "title": "Birth Name"}, {"value": "Birkiani, Georgian", "title": "Place of Birth"}, {"value": "11 February 1986", "title": "Date of Birth"}, {"value": "10 July 2016 (age 30)", "title": "Date of Death"}, {"value": ": Field Commander", "title": "Rank"}, {"value": "Northern Syria", "title": "Commands Held"}, {"value": "Georgian Armed Forces (2006 -2010), Jaish al-Muhajireen wal-Ansar (2012-2013), Daesh (2013 - 2016)", "title": "Affiliations"}], "image": "https://upload.wikimedia.org/wikipedia/en/1/19/Tarkhan_Tayumurazovich_Batirashvili.jpg", "paragraph1": "Tarkhan Batirashvili known as Abu Omar al-Shishani, or Omar al-Shishani, was a Georgian Chechen (Kist) jihadist who served as a commander for the Islamic State in Syria, and previously as a sergeant in the Georgian Army.", "paragraph2": "A veteran of the 2008 Russo-Georgian War, Batirashvili became jihadist after being discharged from the Georgian military and served in various command positions with Islamist militant groups fighting in the Syrian Civil War. Batirashvili was previously the leader of the rebel group Muhajireen Brigade (Emigrants Brigade), and its successor, Jaish al-Muhajireen wal-Ansar (Army of Emigrants and Supporters). In 2013, Batirashvili joined the Islamic State and rapidly became a senior commander in the organization, directing a series of battles and ultimately earning a seat on ISIL's shura council", "paragraph3": "The US Treasury Department added Batirashvili to its list of Specially Designated Global Terrorists on 24 September 2014, and seven months later the US government announced a reward up to US$5 million for information leading to his capture. There were several reports of his death throughout 2015 and 2016. ISIL confirmed he was killed in July 2016 as a result of a US airstrike."}, "name": "Abu Omar al-Shishani"}}, "type": "@Amention", "mutability": "SEGMENTED"}, "4": {"data": {"mention": {"url": "https://videos.files.wordpress.com/4cDBZnMG/the-islamic-state-22tribulations-and-blessings-wilacc84yat-gharb-ifricc84qicc84yyah22_dvd.mp4", "created": "Fri, 03 Aug 2018 09:04:17 GMT", "type": "raw", "id": 25, "title": "Tribulations and Blessings"}}, "type": "^mention", "mutability": "SEGMENTED"}, "7": {"data": {"mention": {"name": "July", "geojson": {"type": "FeatureCollection", "features": [{"geometry": {"type": "Point", "coordinates": [38.9981, 35.9594]}, "type": "Feature", "properties": {"location": "Raqqa, Raqqa", "description": "Intermittent attacks in Raqqa and surrounding villages."}}, {"geometry": {"type": "Point", "coordinates": [38.9512, 36.6919]}, "type": "Feature", "properties": {"location": "Hamam al-Turhman, Raqqa", "description": "Intermittent attacks. Casualties: Daesh execution of 19 captives."}}, {"geometry": {"type": "Point", "coordinates": [40.4465, 35.0161]}, "type": "Feature", "properties": {"location": "Al Mayadin, Deir Ezzor", "description": "Prolonged firefight. Casualties: Daesh - 40 dead Russian Army - 4 dead, 5 injured"}}, {"geometry": {"type": "Point", "coordinates": [40.9082, 34.4653]}, "type": "Feature", "properties": {"location": "Al-Bukamal", "description": "Clashes with Iranian militias, Casualties, Unconfirmed"}}, {"geometry": {"type": "Point", "coordinates": [36.5663, 32.7129]}, "type": "Feature", "properties": {"location": "As-Suwayda, As-Suwayda", "description": "Daesh suicide bombings and gun attacks, Casualties 255 reported deaths"}}]}}}, "type": "@Bmention", "mutability": "SEGMENTED"}, "6": {"data": {"mention": {"url": "http://www.google.co.uk", "created": "Fri, 27 Jul 2018 14:15:55 GMT", "type": "pdf_multiple", "id": 23, "title": "Islamic State Newsletters 136-140"}}, "type": "^mention", "mutability": "SEGMENTED"}}, "blocks": [{"text": "  ", "entityRanges": [], "depth": 0, "data": {}, "key": "bs0hs", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "undefined and undefined also continue to promote a positive message about the future of Daesh as a whole. The encouraging narrative uses references to the rewards of a death through martyrdom and the opportunities available to fight unbelievers in new regions as a way of keeping alive the prospect of victory. Use of a positive narrative was a key theme in Previous Report and is likely to continue to be important looking forward as Daesh steers its way through change and mitigates the impact of losses, such as the death of the son of alleged Caliph Abu Bakr Al-Baghdadi Hudhayfah al-Badri, who was eulogised in the content Tribulations and Blessings, the 7th most popular video this month. The theme of martyrdom also carried over from last month through this video and the introduction of undefined which touched on the loss of several Daesh leaders including Abu Omar al-Shishani , who was killed two years ago this month.", "entityRanges": [{"length": 9, "key": 0, "offset": 0}, {"length": 9, "key": 1, "offset": 14}, {"length": 15, "key": 2, "offset": 358}, {"length": 20, "key": 3, "offset": 554}, {"length": 9, "key": 4, "offset": 795}, {"length": 20, "key": 5, "offset": 866}], "depth": 0, "data": {}, "key": "66emu", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "", "entityRanges": [], "depth": 0, "data": {}, "key": "4a5rl", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "Each issue of Al-Naba since #136 has included an infographic undefined obviously intended to highlight successes. In addition to confirming the new Wilayah structure, each similar infographic lists the number of operations undertaken and enemies killed across the caliphate, attempting to highlight to both friend and foe that the organisation remains a threat. None of the videos and articles published this month suggest the organisation considers itself to be militarily or organisationally defeated; instead they suggest a narrative where shifting tactics and commitment by its fighters will eventually lead to success. Given open-source reporting of rising levels of asymmetric attacks in Iraq, and continued fighting across Syria in July , Daesh media still has plenty of opportunity to produce media around ongoing operations which promotes this narrative. ", "entityRanges": [{"length": 9, "key": 6, "offset": 61}, {"length": 4, "key": 7, "offset": 739}], "depth": 0, "data": {}, "key": "3ra3f", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "  ", "entityRanges": [], "depth": 0, "data": {}, "key": "3i500", "inlineStyleRanges": [], "type": "unstyled"}]};

  state = {
    headline : '',
    editorState: EditorState.createWithContent(convertFromRaw(this.raw)),
    group : 3
  }

  handleChange(value) {
   this.setState({group : value});
  }

  flyTo(mention) {

    if (this.map){

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


  addHeatmap(data, colours) {

    try {

      this.map.removeLayer('trees-heat');
      this.map.removeLayer('trees-point');
      this.map.removeSource('trees');

    } catch(e) {

    }

    this.map.addSource('trees', {
      type: 'geojson',
      data: (data === 'heatmap_bad' ? heatmap_bad : heatmap_good)
    });

    this.map.addLayer({
      id: 'trees-heat',
      type: 'heatmap',
      source: 'trees',
      maxzoom: 15,
      paint: {
        // increase weight as diameter breast height increases
        'heatmap-weight': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [1, 0],
            [62, 1]
          ]
        },
        // increase intensity as zoom level increases
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [15, 3]
          ]
        },
        // assign color values be applied to points depending on their density
        'heatmap-color': colours,
        // increase radius as zoom increases
        'heatmap-radius': {
          stops: [
            [11, 15],
            [15, 20]
          ]
        },
        // decrease opacity to transition into the circle layer
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [15, 0]
          ]
        },
      }
    }, 'waterway-label');

    this.map.addLayer({
      id: 'trees-point',
      type: 'circle',
      source: 'trees',
      minzoom: 14,
      paint: {
        // increase the radius of the circle as the zoom level and dbh value increases
        'circle-radius': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [{ zoom: 15, value: 1 }, 5],
            [{ zoom: 15, value: 62 }, 10],
            [{ zoom: 22, value: 1 }, 20],
            [{ zoom: 22, value: 62 }, 50],
          ]
        },
        'circle-color': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
          ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 1]
          ]
        }
      }
    }, 'waterway-label');

    const that = this;

    that.map.on('click', 'trees-point', function(e) {
      new MapboxGl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML('<b>SOMETHING:</b> ' + e.features[0].properties.dbh)
        .addTo(that.map);
    });

  }

  createCard() {
    const {dispatch} = this.props;

    const { editorState, group, headline } = this.state;

    dispatch({
      type: 'card/createquestioncard',
      payload: {component : 'HeadlineCard', key : {"type" : "group", week : 34, "id" : group}, data : { headline, editorState : convertToRaw(editorState.getCurrentContent())}},
    })

  }

  onHeadlineChange = (e) => {
    console.log(e);
    this.setState({headline : e.target.value});
  }

  onChange = (editorState) => {
    this.setState({editorState : editorState });
  }

  render() {

    const that = this;
    const { editorState } = this.state;

    return (
      <div>

        <Row>
          <Col span={14}>

            <h1>ARTICLE CREATOR</h1>



            <CustomMentionEditor editorState={ editorState } onHeadlineChange={this.onHeadlineChange.bind(this)} onChange={ this.onChange.bind(this) } flyTo={this.flyTo.bind(this)} addBorder={this.addBorder.bind(this)} />




            <Button onClick={this.createCard.bind(this)}>Create Article on </Button>

            <Select defaultValue={3} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
              <Select.Option value={3}>Taliban</Select.Option>
              <Select.Option value={1}>ISIS</Select.Option>
            </Select>

          </Col>

          <Col span={10}>

            <Map
              style="mapbox://styles/mapbox/dark-v9"
              containerStyle={{
                height: "100vh",
                width: "100%",
                position: 'absolute',
              }}

              onStyleLoad={(map) => {

                that.map = map;
                that.map.setCenter( [ 44.361488, 33.312805 ]);
              }}
            >

            </Map>

          </Col>

        </Row>
      </div>
    );
  }
}
