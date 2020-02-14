import React from 'react';
import {ScelContent} from 'libs/formats/scel/types';
import {AutoSizer, List} from 'react-virtualized';

export const ScelContentList: React.FC<{ content: ScelContent }> = ({content}) => {
  return (
    <AutoSizer>
      {({width, height}) => (
        <List
          height={height}
          width={width}
          rowCount={content.words.length}
          rowHeight={32}
          rowRenderer={({index, key, style}) => {
            return (
              <div className="scel-list-item" key={key} style={style}>
                <span>{content.words[index].word}</span>
                <small style={{marginLeft: 4, paddingTop: 4}}>{content.words[index].pinyin.join(' ')}</small>
              </div>
            )
          }}
        />
      )}
    </AutoSizer>
  )
};
