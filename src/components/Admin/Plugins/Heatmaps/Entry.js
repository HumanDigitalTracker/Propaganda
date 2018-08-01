import {Popover, Icon, Tag} from 'antd';

const heatmapEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps} className='mentionSuggestions'>
      <div className={'mentionSuggestionsEntryContainer'}>
        <div className={'mentionSuggestionsEntryContainerLeft'}>
          jkuhjggg
        </div>
        <div className={'mentionSuggestionsEntryContainerRight'}>
          jhjhh
          <div className={'mentionSuggestionsEntryTitle'}>
            jghghggg
          </div>
        </div>
      </div>
    </div>
  );
};

export default heatmapEntry;
