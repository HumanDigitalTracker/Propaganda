import React, {Component} from 'react';
import {Popover, Icon, Tag, Timeline} from 'antd';

const timelineComponent = (mentionProps) => {

  return (
    <span>

      <h2>{mentionProps.mention.name} timeline</h2>
        <Timeline>
          <Timeline.Item color="green">1/1/2018 Started posting</Timeline.Item>
          <Timeline.Item color="green">1/2/2018   Created new account</Timeline.Item>

          <Timeline.Item color="red">
              <p>1/4/2018  Posted on facebook</p>
              <p></p>
              <p></p>
            </Timeline.Item>

          <Timeline.Item>
      <p>1/5/2018  Went on rally</p>
    </Timeline.Item>
  </Timeline>

      </span>
  )
}

export default timelineComponent;
