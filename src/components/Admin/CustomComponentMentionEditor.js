import React, {Component} from 'react';

import Editor from 'draft-js-plugins-editor';

import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';

import editorStyles from './editorStyles.less';
import buttonStyles from './buttonStyles.less';
import toolbarStyles from './toolbarStyles.less';

import createMentionPlugin from 'draft-js-mention-plugin';

import Search from "./Plugins/Search";

import previousreportComponent from './Plugins/PreviousReport/Component';
import PreviousReportEntry from './Plugins/PreviousReport/Entry';

import regionComponent from './Plugins/Region/Component';
import RegionEntry from './Plugins/Region/Entry';

import heatmapComponent from './Plugins/Heatmaps/Component';
import HeatmapEntry from './Plugins/Heatmaps/Entry';

import graphComponent from "./Plugins/Graph/Component";
import GraphEntry from "./Plugins/Graph/Entry";

import contentComponent from './Plugins/Content/Component';
import ContentEntry from './Plugins/Content/Entry';

import definitionComponent from './Plugins/Definition/Component';
import DefinitionEntry from './Plugins/Definition/Entry';

import actorComponent from './Plugins/Actor/Component';
import ActorEntry from './Plugins/Actor/Entry';

import battleComponent from './Plugins/Battle/Component';
import BattleEntry from './Plugins/Battle/Entry';

import HeadlinesButton from './HeadlinesButton';

export default class CustomMentionEditor extends Component {

  heatmapSearch = (Search('/api/real/content', (data) => {
    this.setState({
      heatmaps: [{
        name: "Somewhere Bad", 'data': 'heatmap_bad', 'colours': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(236,222,239,0)',
          0.2, 'rgb(208,209,230)',
          0.4, 'rgb(166,189,219)',
          0.6, 'rgb(103,169,207)',
          0.8, 'rgb(28,144,153)'
        ], geojson: {duration: 2000, center: [-79.94606, 40.44961], zoom: 12}
      }, {
        name: "Somewhere Good", 'data': 'heatmap_good', 'colours': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(12,34,239,0)',
          0.2, 'rgb(13,45,230)',
          0.4, 'rgb(12,18,219)',
          0.6, 'rgb(12,19,207)',
          0.8, 'rgb(1,144,153)'
        ], geojson: {duration: 2000, center: [-79.94606, 40.44961], zoom: 12}
      }]
    });
  }));

  regionSearch = (Search('/api/real/content', (data) => {
    this.setState({
      regions: [
        { name: "Iraq",         geojson: {border : {"type":"Feature","id":"IRQ","properties":{"name":"Iraq"},"geometry":{"type":"Polygon","coordinates":[[[45.420618,35.977546],[46.07634,35.677383],[46.151788,35.093259],[45.64846,34.748138],[45.416691,33.967798],[46.109362,33.017287],[47.334661,32.469155],[47.849204,31.709176],[47.685286,30.984853],[48.004698,30.985137],[48.014568,30.452457],[48.567971,29.926778],[47.974519,29.975819],[47.302622,30.05907],[46.568713,29.099025],[44.709499,29.178891],[41.889981,31.190009],[40.399994,31.889992],[39.195468,32.161009],[38.792341,33.378686],[41.006159,34.419372],[41.383965,35.628317],[41.289707,36.358815],[41.837064,36.605854],[42.349591,37.229873],[42.779126,37.385264],[43.942259,37.256228],[44.293452,37.001514],[44.772699,37.170445],[45.420618,35.977546]]]}}, duration: 2000, center: [-79.94606, 40.44961], zoom: 12}},
        { name: "Syria",        geojson: {border : {"type":"Feature","id":"SYR","properties":{"name":"Syria"},"geometry":{"type":"Polygon","coordinates":[[[38.792341,33.378686],[36.834062,32.312938],[35.719918,32.709192],[35.700798,32.716014],[35.836397,32.868123],[35.821101,33.277426],[36.06646,33.824912],[36.61175,34.201789],[36.448194,34.593935],[35.998403,34.644914],[35.905023,35.410009],[36.149763,35.821535],[36.41755,36.040617],[36.685389,36.259699],[36.739494,36.81752],[37.066761,36.623036],[38.167727,36.90121],[38.699891,36.712927],[39.52258,36.716054],[40.673259,37.091276],[41.212089,37.074352],[42.349591,37.229873],[41.837064,36.605854],[41.289707,36.358815],[41.383965,35.628317],[41.006159,34.419372],[38.792341,33.378686]]]}}, duration: 2000, center: [-79.94606, 40.44961], zoom: 12}},
       ],
    });
  }));

  previousreportSearch = (Search('/api/real/content', (data) => {
    this.setState({
      previousreports: [
        { name: "Previous Report",  data : {"headline": "Staying relevant: Maximising the impact of new content", "editorState": {"entityMap": {"1": {"data": {"mention": {"url": "https://www.youtube.com/watch?v=-GmfBeJLgoc", "title": "And They Gave Zakah", "type": "youtube", "id": 19, "created": "Thu, 26 Jul 2018 11:01:43 GMT"}}, "type": "^mention", "mutability": "SEGMENTED"}, "0": {"data": {"mention": {"url": "https://www.youtube.com/watch?v=7yBy_kSBM58", "title": "Victory From God and an Imminent Conquest (1)", "type": "youtube", "id": 11, "created": "Thu, 26 Jul 2018 11:01:30 GMT"}}, "type": "^mention", "mutability": "SEGMENTED"}}, "blocks": [{"text": "  undefined is part of a linked five-part series of videos, three of which feature in the top 25 shared pieces of content over the period. Given shrinking resources and territory, it is highly likely that video content produced by the organisation has to showcase the limited operational capabilities and successes of the organisation in the best possible light. Older content serves to prevent previous victories fading from memory, whilst maintenance of production values and an upbeat tone for more recent content acts as a way of continuing a narrative of success despite an obvious lack of real victories. ", "entityRanges": [{"length": 9, "key": 0, "offset": 2}], "depth": 0, "data": {}, "key": "bs0hs", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "", "entityRanges": [], "depth": 0, "data": {}, "key": "ag9ns", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "A similar intent is also likely behind the reuse of the video undefined which showcases the organisations\u2019previous bureaucratic and administrative abilities as a governing organisation collecting and distributing to those in need as well as providing official advice and guidance. Interestingly, this video also contains extensive English subtitles, which indicates that it is intended for a wider audience than is normal for the organisations\u2019content. , which showcases the organisationsprevious bureaucratic and administrative abilities as a governing organisation collecting and distributing to those in need as well as providing official advice and guidance. Interestingly, this video also contains extensive English subtitles, which indicates that it is intended for a wider audience than is normal for the organisations content", "entityRanges": [{"length": 9, "key": 1, "offset": 62}], "depth": 0, "data": {}, "key": "cbe6s", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "", "entityRanges": [], "depth": 0, "data": {}, "key": "cms02", "inlineStyleRanges": [], "type": "unstyled"}, {"text": "Given the subject, and the \u2018authoritative\u2019 guidance presented within the video, it is likely this is intended to present a narrative that the organisation is relevant as the leader of the Muslim world and a legitimate state body, rather than one on the verge of defeat. ", "entityRanges": [], "depth": 0, "data": {}, "key": "5qdaj", "inlineStyleRanges": [], "type": "unstyled"}]}}       },
      ],
    });
  }));

  graphSearch = (Search('/api/real/content', (data) => {
    this.setState({
      graphs: [
        {name: "Social media report"},
        {name: "Other graph"},
      ],
    });
  }));

  contentSearch = (Search('/api/real/content', (data) => {
    this.setState({contents: data.list});
  }));

  definitionSearch = (Search('/api/real/content', (data) => {
    this.setState({
      definitions: [
        {
          name: "ISIS",
          value: "The Islamic State of Iraq and the Levant (ISIL /ˈaɪsəl/), also known as the Islamic State of Iraq and Syria, the Islamic State of Iraq and al-Sham (ISIS /ˈaɪsɪs/)[55], officially known as the Islamic State (IS) and by its Arabic language acronym Daesh (Arabic: داعش‎ dāʿish, IPA: [ˈdaːʕɪʃ]),[56][57] is a Salafi jihadist terrorist organisation and former unrecognised proto-state that follows a fundamentalist, Salafi/Wahhabi doctrine of Sunni Islam.[58][59]"
        },
        {name: "Operations", value: "By operations we mean blah blah blah"},
        {
          name: "The Levant",
          value: "The Levant (/ləˈvænt/) is an approximate historical geographical term referring to a large area in the Eastern Mediterranean. In its narrowest sense, it is equivalent to the historical region of Syria. In its widest historical sense, the Levant included all of the eastern Mediterranean with its islands;[3] that is, it included all of the countries along the Eastern Mediterranean shores, extending from Greece to Cyrenaica.[2][4]"
        },

      ],
    });
  }));

  actorSearch = (Search('/api/real/content', (data) => {
    this.setState({
      actors: [
        {
          name: "Abu Bakr Al-Baghdadi",
          data : {
            image: 'https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2018/2/12/c6242b2d89194957910c6599f10025a5_18.jpg',
            items: [
              {title: 'Birth Name', value: "Ibrahim Awad Ibrahim al-Badri"},
              {title: 'Place of Birth', value: "Saladin Governorate, Iraq"},
              {title: 'Date of Birth', value: "1971, Samarra, Iraq"},
              {title: 'Date of Death', value: "-"},
              {title: 'Rank', value: "Leader of the Islamic State of Iraq and the Levant"},
              {title: "Commands Held", value: "Leader of Islamic State of Iraq"},
              {title: 'Affiliations', value: "Daesh, Former: Muslim Brotherhood, Islamic State in Iraq (Al-Qaeda affiliated)"},
            ],

            paragraph1: 'Abu Bakr al-Baghdadi—born “Ibrahim Awwad Ibrahim al-Badri” in 1971 in Samarra, Iraq—has served as ISIS’s caliph, Arabic for “successor,” since June 2014. In assuming the title, Baghdadi declared himself the religious, political, and military leader of all Muslims. Baghdadi has been in hiding since the collapse of ISIS’s caliphate in Syria and Iraq.',
            paragraph2: 'Baghdadi is careful to reveal little about his identity or background. There were reportedly only two publicly available photographs of Baghdadi prior to ISIS’s rise to the international stage in 2014. Known as the “invisible sheikh,” Baghdadi wears a mask when addressing other ISIS commanders. However, an un-masked Baghdadi addressed members of ISIS in July 2014 from the pulpit of Mosul’s Great Mosque.',
            paragraph3 : '',
          },
        },


        {
          name: "Abu Omar al-Shishani",
          data : {
            image: 'https://upload.wikimedia.org/wikipedia/en/1/19/Tarkhan_Tayumurazovich_Batirashvili.jpg',
            items: [
              {title: 'Birth Name', value: "Tarkhan Tayumurazovich Batirashvili"},
              {title: 'Place of Birth', value: "Birkiani, Georgian"},
              {title: 'Date of Birth', value: "11 February 1986"},
              {title: 'Date of Death', value: "10 July 2016 (age 30)"},
              {title: 'Rank', value: ": Field Commander"},
              {title: "Commands Held", value: "Northern Syria"},
              {title: 'Affiliations', value: "Georgian Armed Forces (2006 -2010), Jaish al-Muhajireen wal-Ansar (2012-2013), Daesh (2013 - 2016)"},
            ],

            paragraph1: 'Tarkhan Batirashvili known as Abu Omar al-Shishani, or Omar al-Shishani, was a Georgian Chechen (Kist) jihadist who served as a commander for the Islamic State in Syria, and previously as a sergeant in the Georgian Army.',
            paragraph2: 'A veteran of the 2008 Russo-Georgian War, Batirashvili became jihadist after being discharged from the Georgian military and served in various command positions with Islamist militant groups fighting in the Syrian Civil War. Batirashvili was previously the leader of the rebel group Muhajireen Brigade (Emigrants Brigade), and its successor, Jaish al-Muhajireen wal-Ansar (Army of Emigrants and Supporters). In 2013, Batirashvili joined the Islamic State and rapidly became a senior commander in the organization, directing a series of battles and ultimately earning a seat on ISIL\'s shura council',
            paragraph3 : 'The US Treasury Department added Batirashvili to its list of Specially Designated Global Terrorists on 24 September 2014, and seven months later the US government announced a reward up to US$5 million for information leading to his capture. There were several reports of his death throughout 2015 and 2016. ISIL confirmed he was killed in July 2016 as a result of a US airstrike.'
          },
        },




      ],
    });
  }));

  battleSearch = (Search('/api/real/content', (data) => {
    this.setState({
      battles: [{'name' : 'July',

        geojson : {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [38.9981, 35.9594],
            },
            properties: {
              location : 'Raqqa, Raqqa',
              description : 'Intermittent attacks in Raqqa and surrounding villages.',
            }
          },

            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [38.9512, 36.6919],
              },
              properties: {
                location : 'Hamam al-Turhman, Raqqa',
                description : 'Intermittent attacks. Casualties: Daesh execution of 19 captives.',
              }
            },

            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [40.4465, 35.0161],
              },
              properties: {
                location : 'Al Mayadin, Deir Ezzor',
                description : 'Prolonged firefight. Casualties: Daesh - 40 dead Russian Army - 4 dead, 5 injured',
              }
            },

            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [40.9082, 34.4653],
              },
              properties: {
                location : 'Al-Bukamal',
                description : 'Clashes with Iranian militias, Casualties, Unconfirmed',
              }
            },

            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [36.5663, 32.7129],
              },
              properties: {
                location : 'As-Suwayda, As-Suwayda',
                description : 'Daesh suicide bombings and gun attacks, Casualties 255 reported deaths',
              }
            }

            ]
        }}],
    });
  }));

  constructor(props) {
    super(props);

    this.toolbarPlugin = createToolbarPlugin({

      theme: {buttonStyles, toolbarStyles},

      structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        HeadlinesButton,
        UnorderedListButton,
        OrderedListButton,
      ]
    });

    this.heatmapPlugin = createMentionPlugin(
      {
        mentionTrigger: '@H',
        mentionComponent: heatmapComponent(this.props.flyTo, this.props.addBorder),
      }
    );


    this.regionPlugin = createMentionPlugin(
      {
        mentionTrigger: '@R',
        mentionComponent: regionComponent(this.props.addBorder),
      }
    );

    this.previousreportPlugin = createMentionPlugin(
      {
        mentionTrigger: '@L',
        mentionComponent: previousreportComponent,
      }
    );

    this.graphPlugin = createMentionPlugin(
      {
        mentionTrigger: '@G',
        mentionComponent: graphComponent(this.props.flyTo),
      }
    );

    this.contentPlugin = createMentionPlugin(
      {
        mentionTrigger: '^',
        mentionComponent: contentComponent(this.props.addCard),
      }
    );

    this.definitionPlugin = createMentionPlugin(
      {
        mentionTrigger: '@D',
        mentionComponent: definitionComponent,
      }
    );

    this.actorPlugin = createMentionPlugin(
      {
        mentionTrigger: '@A',
        mentionComponent: actorComponent,
      }
    );

    this.battlePlugin = createMentionPlugin(
      {
        mentionTrigger: '@B',
        mentionComponent: battleComponent(this.props.flyTo, this.props.addBorder),
      }
    );


  }

  state = {
    heatmaps: [],
    graphs: [],
    contents: [],
    definitions: [],
    regions : [],
    actors : [],
    battles: [],
    previousreports: [],
  };

  focus = () => {
    this.editor.focus();
  };

  render() {

    const {editorState, onChange, onHeadlineChange, readOnly} = this.props;
    const { definitions, graphs, contents, heatmaps, regions, actors, battles, previousreports } = this.state;

    const GraphSuggestions          = this.graphPlugin.MentionSuggestions;
    const ContentSuggestions        = this.contentPlugin.MentionSuggestions;
    const DefinitionSuggestions     = this.definitionPlugin.MentionSuggestions;
    const HeatmapSuggestions        = this.heatmapPlugin.MentionSuggestions;
    const RegionSuggestions         = this.regionPlugin.MentionSuggestions;
    const ActorSuggestions          = this.actorPlugin.MentionSuggestions;
    const BattleSuggestions         = this.battlePlugin.MentionSuggestions;
    const PreviousReportSuggestions = this.previousreportPlugin.MentionSuggestions;

    const {Toolbar} = this.toolbarPlugin;

    return (

      <div>

        {!readOnly && <input onChange={onHeadlineChange} />}

        <div className={editorStyles.editor} onClick={this.focus}>

          <Editor
            readOnly={readOnly}
            editorState={editorState}
            onChange={onChange}
            plugins={[this.previousreportPlugin, this.battlePlugin, this.actorPlugin, this.regionPlugin, this.toolbarPlugin, this.graphPlugin, this.definitionPlugin, this.contentPlugin, this.heatmapPlugin]}
            ref={(element) => {
              this.editor = element;
            }}
          />

          {!readOnly && <Toolbar/>}

          <DefinitionSuggestions
            key={2}
            entryComponent={DefinitionEntry}
            onSearchChange={this.definitionSearch}
            suggestions={definitions}
            onClose={() => this.setState({definitions: []})}/>

          <GraphSuggestions
            key={3}
            entryComponent={GraphEntry}
            onSearchChange={this.graphSearch}
            suggestions={graphs}
            onClose={() => this.setState({graphs: []})}
          />

          <ContentSuggestions
            key={4}
            entryComponent={ContentEntry}
            onSearchChange={this.contentSearch}
            suggestions={contents}
            onClose={() => this.setState({contents: []})}
          />

          <HeatmapSuggestions
            key={5}
            entryComponent={HeatmapEntry}
            onSearchChange={this.heatmapSearch}
            suggestions={heatmaps}
            onClose={() => this.setState({heatmaps: []})}
          />

          <RegionSuggestions
            key={6}
            entryComponent={RegionEntry}
            onSearchChange={this.regionSearch}
            suggestions={regions}
            onClose={() => this.setState({regions: []})}
          />

          <ActorSuggestions
            key={7}
            entryComponent={ActorEntry}
            onSearchChange={this.actorSearch}
            suggestions={actors}
            onClose={() => this.setState({actors: []})}
          />

          <BattleSuggestions
            key={8}
            entryComponent={BattleEntry}
            onSearchChange={this.battleSearch}
            suggestions={battles}
            onClose={() => this.setState({battles: []})}
          />

          <PreviousReportSuggestions
            key={9}
            entryComponent={PreviousReportEntry}
            onSearchChange={this.previousreportSearch}
            suggestions={previousreports}
            onClose={() => this.setState({previousreports: []})}
          />

        </div>
      </div>
    );
  }
}
