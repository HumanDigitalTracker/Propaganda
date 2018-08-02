import {Icon} from 'antd';

const battleComponent = (flyTo) => (mentionProps) => {

  return (
    <span className={'mention'}
          onClick={() => {
            flyTo(mentionProps.mention);
          }}
    >

         <Icon type={'pushpin'}/> {mentionProps.mention.name}
        </span>
  )
}

export default battleComponent;
