import React, { useEffect, useState } from 'react';
import { ScelContent, ScelWord } from 'libs/formats/scel/types';
import { AutoSizer, List } from 'react-virtualized';
import { Descriptions, Input } from 'antd';

const ScelWordList: React.FC<{ list: ScelWord[] }> = ({ list }) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          height={height}
          width={width}
          rowCount={list.length}
          rowHeight={32}
          rowRenderer={({ index, key, style }) => {
            return (
              <div className="scel-list-item" key={key} style={style}>
                <span>{list[index].word}</span>
                <small style={{ marginLeft: 4, paddingTop: 4 }}>{list[index].pinyin.join(' ')}</small>
              </div>
            );
          }}
        />
      )}
    </AutoSizer>
  );
};
export const ScelContentList: React.FC<{ content: ScelContent }> = ({ content }) => {
  const all = content.words;
  const [list, setList] = useState(all);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) {
      setList(all);
      return;
    }

    setList(all.filter((v) => v.word.includes(search)));
  }, [search]);

  return (
    <div style={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
      <div style={{ height: 64 }}>
        <Input.Search placeholder="搜索词条。。。" onSearch={setSearch} />
        <Descriptions column={6}>
          <Descriptions.Item label="总数">{all.length}</Descriptions.Item>
          <Descriptions.Item label="结果数">{list.length}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
        <ScelWordList list={list} />
      </div>
    </div>
  );
};
