import {Icon} from 'antd';

const heatmapComponent = (flyTo, addBorder) => (mentionProps) => {

  return (
    <span className={'mention'}
          onClick={() => {
            flyTo(mentionProps.mention.geojson);
            addBorder(mentionProps.mention.data, mentionProps.mention.colours);
          }}
    >

         <Icon type={'line-chart'}/> {mentionProps.mention.name}

        </span>
  )
}

export default heatmapComponent;
