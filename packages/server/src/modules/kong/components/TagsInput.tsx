import React, { useEffect, useRef, useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { Input, Tag } from 'antd';
import produce from 'immer';
import { PlusOutlined } from '@ant-design/icons/lib';

export const TagsInput: React.FC<{ value; onChange }> = ({ value, onChange }) => {
  const [state, setState] = useState({
    tags: value ?? [],
    inputVisible: false,
    inputValue: '',
  });

  const inputRef = useRef();

  const onEdit = (v) => {
    setState(
      produce((s) => {
        s.tags = state.tags.filter((vv) => vv !== v);
        s.inputVisible = true;
        s.inputValue = v;
      })
    );
  };
  const onConfirm = () => {
    setState(
      produce((state) => {
        const { inputValue } = state;
        let { tags } = state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        state.tags = tags;
        state.inputVisible = false;
        state.inputValue = '';
      })
    );
  };

  const removeTag = (v) => {
    setState(
      produce((state) => {
        state.tags = state.tags.filter((vv) => vv !== v);
      })
    );
  };

  const showInput = () => {
    setState(
      produce((s) => {
        s.inputVisible = true;
      })
    );
  };

  const { inputValue, inputVisible, tags } = state;

  useEffect(() => {
    onChange?.(tags);
  }, [tags]);

  return (
    <div>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
          onComplete: (e) => {
            // e.target.style = {};
          },
        }}
        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
        appear={false}
        style={{ display: 'inline-block' }}
      >
        {(value || tags).map((v) => (
          <span key={v} style={{ display: 'inline-block' }}>
            <Tag
              closable
              onDoubleClick={() => onEdit(v)}
              onClose={(e) => {
                e.preventDefault();
                removeTag(v);
              }}
            >
              {v}
            </Tag>
          </span>
        ))}
      </TweenOneGroup>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(v) => {
            const value = v.target.value;
            setState(
              produce((s) => {
                s.inputValue = value;
              })
            );
          }}
          onBlur={onConfirm}
          onPressEnter={onConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};
