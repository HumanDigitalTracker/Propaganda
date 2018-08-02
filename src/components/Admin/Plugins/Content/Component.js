import {Popover, Icon, Tag, Button } from 'antd';
import YouTube from 'react-youtube';
import { Document, Page } from 'react-pdf';
import Facebook from "../../../Content/Facebook/Facebook";

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
        <Tag color="red">
        <Icon type={'notification'}/> ISIS</Tag>
        Shares : 123
        <Button> Save content </Button>
      </p>

      <Document
        file={{url : require('../../../../assets/test.pdf')}}
      >
        <Page width={300} pageNumber={1} />


      </Document>

    </div>
  );

  const youtube_content = (
    <div>
      <p>
        <Tag color="red"> <Icon type={'notification'}/> ISIS</Tag>
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

  const typemap = {'youtube' : youtube_content, 'pdf' : pdf_content, 'facebook' : facebook_content};

  return (
    <span className={'mention'}
    >

          <Popover content={typemap[mentionProps.mention.type] || <span>unknown</span>} title={<span> {mentionProps.mention.title} <a className="doNotToggle" style={{float : 'right'}} onClick={(e) => {saveContent(mentionProps.mention)}}> Save content </a> </span>}>

            {mentionProps.mention.type === 'youtube' && <Icon type={'youtube'}/> }

            {mentionProps.mention.type === 'pdf' && <Icon type={'file-pdf'}/> }

            {mentionProps.mention.type === 'facebook' && <Icon type={'facebook'}/> }

            {mentionProps.mention.title}
          </Popover>

        </span>
  )
}

export default contentComponent;
