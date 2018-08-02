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

  }

  state = {
    heatmaps: [],
    graphs: [],
    contents: [],
    definitions: [],
    regions : [],
  };

  focus = () => {
    this.editor.focus();
  };

  render() {

    const {editorState, onChange, onHeadlineChange, readOnly} = this.props;
    const { definitions, graphs, contents, heatmaps, regions } = this.state;

    const GraphSuggestions = this.graphPlugin.MentionSuggestions;
    const ContentSuggestions = this.contentPlugin.MentionSuggestions;
    const DefinitionSuggestions = this.definitionPlugin.MentionSuggestions;
    const HeatmapSuggestions = this.heatmapPlugin.MentionSuggestions;
    const RegionSuggestions = this.regionPlugin.MentionSuggestions;

    const {Toolbar} = this.toolbarPlugin;

    return (

      <div>

        {!readOnly && <input onChange={onHeadlineChange} />}

        <div className={editorStyles.editor} onClick={this.focus}>

          <Editor
            readOnly={readOnly}
            editorState={editorState}
            onChange={onChange}
            plugins={[this.regionPlugin, this.toolbarPlugin, this.graphPlugin, this.definitionPlugin, this.contentPlugin, this.heatmapPlugin]}
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

        </div>
      </div>
    );
  }
}
