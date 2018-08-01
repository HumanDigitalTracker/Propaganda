import {Popover, Icon, Tag} from 'antd';

const graphEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span>
          {mention.name}
        </span>
    </div>
  );
};

export default graphEntry;
