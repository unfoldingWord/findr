import { Box, BoxProps } from '@mui/material';

import { VscCaseSensitive, VscWholeWord, VscRegex } from 'react-icons/vsc';

import { useFnrContext } from '@findr/ui';
import { SearchBox } from './search-box/search-box';
import { OnChangeOptionsCallback, OptionsBar } from './options-bar/options-bar';
import { OptionButton } from './option-button/option-button';

const defaultSearchOptions = {
  isCaseMatched: false,
  isWordMatched: false,
  isRegex: false,
};

// const defaultReplaceOptions = {
//   isCasePreserved: false,
// };

export function FnrMUI<Options>({ sx, ...props }: BoxProps) {
  const {
    actions: fnrActons,
    state: fnrState,
    events: fnrEvents,
  } = useFnrContext();

  const { setOptions } = fnrActons ?? {};
  const { options, target } = fnrState ?? {};
  const { onChangeTarget } = fnrEvents ?? {};

  console.log({ options, target });

  const onChangeOptions: OnChangeOptionsCallback = (event, newOptions) => {
    if (typeof setOptions === 'function')
      setOptions((options: Options) => ({ ...options, ...newOptions }));
  };

  return (
    <Box sx={{ display: 'grid', ...sx }}>
      <SearchBox
        onChange={
          typeof onChangeTarget === 'function' ? onChangeTarget : () => null
        }
        sx={{ background: '#fff' }}
        searchOptions={
          <OptionsBar
            defaultOptions={defaultSearchOptions}
            onChange={onChangeOptions}
          >
            <OptionButton
              value="isCaseMatched"
              aria-label="isCaseMatched"
              title="Match Case"
            >
              <VscCaseSensitive size={'1.5em'} />
            </OptionButton>
            <OptionButton
              value="isWordMatched"
              aria-label="isWordMatched"
              title="Match Whole Word"
            >
              <VscWholeWord size={'1.5em'} />
            </OptionButton>
            <OptionButton
              value="isRegex"
              aria-label="isRegex"
              title="Use Regular Expression"
            >
              <VscRegex size={'1.5em'} />
            </OptionButton>
          </OptionsBar>
        }
      />
    </Box>
  );
}

export default FnrMUI;
