import {Popover, Icon, Tag} from 'antd';

const battleEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span>  <Icon type={'pushpin'}/> {mention.name}</span>
    </div>
  );
};

export default battleEntry;
