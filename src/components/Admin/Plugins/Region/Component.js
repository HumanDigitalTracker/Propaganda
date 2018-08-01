import {Icon} from 'antd';

const regionComponent = (flyTo, addBorder) => (mentionProps) => {

  return (
    <span
      className={mentionProps.className}
      onMouseEnter={() => {
        addBorder(mentionProps.mention.geojson, false);
      }}
      onMouseLeave={() => {
        addBorder(mentionProps.mention.geojson, true);
      }}
    >

         <Icon type={'global'}/> {mentionProps.mention.name}

        </span>
  )
}

export default regionComponent;
