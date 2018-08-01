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

    this.graphPlugin = createMentionPlugin(
      {
        mentionTrigger: '@G',
        mentionComponent: graphComponent,
      }
    );

    this.contentPlugin = createMentionPlugin(
      {
        mentionTrigger: '^',
        mentionComponent: contentComponent,
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
  };

  focus = () => {
    this.editor.focus();
  };

  render() {

    const {editorState, onChange, onHeadlineChange, readOnly} = this.props;
    const {definitions, graphs, contents, heatmaps} = this.state;

    const GraphSuggestions = this.graphPlugin.MentionSuggestions;
    const ContentSuggestions = this.contentPlugin.MentionSuggestions;
    const DefinitionSuggestions = this.definitionPlugin.MentionSuggestions;
    const HeatmapSuggestions = this.heatmapPlugin.MentionSuggestions;
    const {Toolbar} = this.toolbarPlugin;

    return (

      <div>

        {!readOnly && <input onChange={onHeadlineChange} />}

        <div className={editorStyles.editor} onClick={this.focus}>

          <Editor
            readOnly={readOnly}
            editorState={editorState}
            onChange={onChange}
            plugins={[this.toolbarPlugin, this.graphPlugin, this.definitionPlugin, this.contentPlugin, this.heatmapPlugin]}
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

        </div>
      </div>
    );
  }
}
