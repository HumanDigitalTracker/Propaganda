import React, {Component} from 'react'
import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import Editor, {composeDecorators} from 'draft-js-plugins-editor'
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import {fromJS} from 'immutable';
import createMentionPlugin, {defaultSuggestionsFilter} from '../EditorPlugins/draft-js-mention-plugin/src';
import createImagePlugin from 'draft-js-image-plugin';

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';


const text = 'In this editor a toolbar shows up once you select part of the text …';


import {raw} from './initialState/raw';
import Search from './Plugins/Search';

import definitionComponent from './Plugins/Definition/Component';
import DefinitionEntry from './Plugins/Definition/Entry';

import contentComponent from './Plugins/Content/Component';
import ContentEntry from './Plugins/Content/Entry';

import regionComponent from './Plugins/Region/Component';
import RegionEntry from './Plugins/Region/Entry';

import heatmapComponent from './Plugins/Heatmaps/Component';
import HeatmapEntry from './Plugins/Heatmaps/Entry';

import graphComponent from './Plugins/Graph/Component';
import GraphEntry from './Plugins/Graph/Entry';



class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={buttonStyles.buttonWrapper}>
        <button onClick={this.onClick} className={buttonStyles.button} >
          H
        </button>
      </div>
    );
  }
}

import editorStyles from './editorStyles.less';
import buttonStyles from './buttonStyles.less';
import toolbarStyles from './toolbarStyles.less';

const toolbarPlugin = createToolbarPlugin({

  theme: { buttonStyles, toolbarStyles },

  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
  ]
});

const { Toolbar } = toolbarPlugin;

const imagePlugin = createImagePlugin();

export default class HeadlineCreator extends Component {

  heatmapPlugin = createMentionPlugin(
    {
      mentionTrigger: '@H',
      mentionComponent: heatmapComponent(this.props.flyTo, this.props.addBorder),
    }
  );

  definitionPlugin = createMentionPlugin(
    {
      mentionTrigger: '@D',
      mentionComponent: definitionComponent,
    }
  );

  graphPlugin = createMentionPlugin(
    {
      mentionTrigger: '@G',
      mentionComponent: graphComponent,
    }
  );

  contentPlugin = createMentionPlugin(
    {
      mentionTrigger: '^',
      mentionComponent: contentComponent,
    }
  );

  regionPlugin = createMentionPlugin(
    {
      mentionTrigger: '@R',
      mentionComponent: regionComponent(this.props.flyTo, this.props.addBorder),
    }
  );

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

  graphSearch = (Search('/api/real/content', (data) => {
    this.setState({
      graphs: [
        {name: "Social media report"},
        {name: "Other graph"},
      ],
    });
  }));

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

  contentSearch = (Search('/api/real/content', (data) => {
    this.setState({suggestions: data.list});
  }));

  regionSearch = (Search('/api/real/content', (data) => {
    this.setState({
      regions: [
        {name: "North Pitsburgh", geojson: {duration: 1000, center: [-79.92606, 40.34961], zoom: 12}},
        {name: "South Pitchsburgh", geojson: {duration: 1000, center: [-79.87606, 40.54961], zoom: 12}},
        {name: "Somewhere Bad", geojson: {duration: 2000, center: [-79.94606, 40.44961], zoom: 12}}

      ],
    });
  }));

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(raw)),
    suggestions: [],
    regions: [],
    heatmaps: [],
    definitions: [],
    graphs: [],
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {

    return (
      <div>

          <div className={editorStyles.editor} onClick={this.focus}>

            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={[toolbarPlugin, this.graphPlugin, this.definitionPlugin, this.contentPlugin, this.regionPlugin, this.heatmapPlugin,  imagePlugin]}
              ref={(element) => {
                this.editor = element
              }}
            />

            <Toolbar />

            <this.graphPlugin.MentionSuggestions
              key="34"
              entryComponent={GraphEntry}
              onSearchChange={this.graphSearch}
              suggestions={this.state.graphs}
              onClose={() => this.setState({graphs: []})}
            />

            <this.definitionPlugin.MentionSuggestions
              key="0"
              entryComponent={DefinitionEntry}
              onSearchChange={this.definitionSearch}
              suggestions={this.state.definitions}
              onClose={() => this.setState({definitions: []})}
            />

            <this.contentPlugin.MentionSuggestions
              key="1"
              entryComponent={ContentEntry}
              onSearchChange={this.contentSearch}
              suggestions={this.state.suggestions}
              onClose={() => this.setState({suggestions: []})}
            />

            <this.regionPlugin.MentionSuggestions
              key="2"
              entryComponent={RegionEntry}
              onSearchChange={this.regionSearch}
              suggestions={this.state.regions}
              onClose={() => this.setState({regions: []})}
            />

            <this.heatmapPlugin.MentionSuggestions
              key="3"
              entryComponent={HeatmapEntry}
              onSearchChange={this.heatmapSearch}
              suggestions={this.state.heatmaps}
              onClose={() => this.setState({heatmaps: []})}
            />

            {/*<ImageAdd
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={imagePlugin.addImage}
            />*/}

          </div>

        <ul>
          <li>@H - graph</li>
          <li>@D - definition</li>
          <li>@G - graph</li>
          <li>^ - content</li>
          <li>@R - region</li>
        </ul>

      </div>
    )
  }
}
