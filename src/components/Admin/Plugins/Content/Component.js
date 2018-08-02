import React, {Component} from 'react';
import {Popover, Icon, Tag, Button, Tabs } from 'antd';
import YouTube from 'react-youtube';
import { Document, Page } from 'react-pdf';
import Facebook from "../../../Content/Facebook/Facebook";

const TabPane = Tabs.TabPane;

import styles from './styles.less';
const contentComponent = (saveContent) => (mentionProps) => {

  const opts = {
    height: '200',
    width: '300',
    playerVars: {
      autoplay: 1,
      modestbranding: true
    }
  };

  const pdf_content = (
    <div>
      <p>
        Shares : 123
      </p>

      <Document
        file={{url : require('../../../../assets/test.pdf')}}
      >
        <Page width={300} pageNumber={1} />


      </Document>

    </div>
  );

  const pdf_multiple_content = (
    <div className={'documents'}>

      <Tabs
        defaultActiveKey="1"
        tabPosition={'left'}
        style={{ height: 350 }}
      >
        <TabPane tab="Newsletter 136" key="1">
          <Document file={{url : require('../../../../assets/the-islamic-state-al-nabacc84_-newsletter-136.pdf')}}>
            <Page width={300} pageNumber={2} />
          </Document>
        </TabPane>
        <TabPane tab="Newsletter 137" key="2">
          <Document file={{url : require('../../../../assets/the-islamic-state-al-nabacc84_-newsletter-137.pdf')}}>
            <Page width={300} pageNumber={2} />
          </Document>
        </TabPane>
        <TabPane tab="Newsletter 138" key="3">
          <Document file={{url : require('../../../../assets/the-islamic-state-al-nabacc84_-newsletter-138.pdf')}}>
            <Page width={300} pageNumber={2} />
          </Document>
        </TabPane>
        <TabPane tab="Newsletter 139" key="4">
          <Document file={{url : require('../../../../assets/the-islamic-state-al-nabacc84_-newsletter-139.pdf')}}>
            <Page width={300} pageNumber={2} />
          </Document>
        </TabPane>
        <TabPane tab="Newsletter 140" key="5">
          <Document file={{url : require('../../../../assets/the-islamic-state-al-nabacc84_-newsletter-140.pdf')}}>
            <Page width={300} pageNumber={2} />
          </Document>
        </TabPane>
      </Tabs>

    </div>
  );


  const youtube_content = (
    <div>
      <p>

      </p>

      <p>
        Shares : 123
      </p>

      <YouTube
        videoId={mentionProps.mention.url.split("v=")[1]}
        opts={opts}
      />

    </div>
  );

  const facebook_content = (
    <div>
      <Facebook></Facebook>
      Shares : 123
      <Button> Save content </Button>
    </div>
  );

  const typemap = {'youtube' : youtube_content, 'pdf' : pdf_content, 'pdf_multiple' : pdf_multiple_content, 'facebook' : facebook_content};

  return (
    <span className={'mention'}
    >

          <Popover content={typemap[mentionProps.mention.type] || <span>unknown</span>} title={<span> {mentionProps.mention.title} <a className="doNotToggle" style={{float : 'right'}} onClick={(e) => {saveContent(mentionProps.mention)}}> Save content </a> </span>}>

            {mentionProps.mention.type === 'youtube' && <Icon type={'youtube'}/> }

            {mentionProps.mention.type === 'pdf' && <Icon type={'file-pdf'}/> }

            {mentionProps.mention.type === 'pdf_multiple' && <Icon type={'copy'}/> }

            {mentionProps.mention.type === 'facebook' && <Icon type={'facebook'}/> }

            {mentionProps.mention.title}
          </Popover>

        </span>
  )
}

export default contentComponent;
