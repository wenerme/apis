import React from 'react';
import { Checkbox, Divider, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export interface SelectorOption {
  value;
  label;
  description?;
  enabled?: boolean;
  options?: SelectorOption[];
}

export interface SelectorChangeEvent {
  value;
  option?;
  enabled: boolean;
}

export const AlgorithmSelectorList: React.FC<{
  algorithms: SelectorOption[];
  onChange: (e: SelectorChangeEvent[]) => void;
}> = ({ algorithms, onChange }) => {
  const isGroupPartial = (v) => {
    const a = v.options.filter((v) => v.enabled).length;
    return a > 0 && a < v.options.length;
  };
  const isGroupChecked = (v) => {
    const a = v.options.filter((v) => v.enabled).length;
    return a === v.options.length;
  };
  return (
    <div>
      {algorithms.map((v) => (
        <span key={v.value}>
          {!v.options && (
            <Checkbox
              checked={v.enabled}
              onChange={(e) => {
                onChange([{ value: v.value, enabled: e.target.checked }]);
              }}
            >
              {v.label}
            </Checkbox>
          )}
          {v.options && (
            <div>
              <Divider orientation={'left'} dashed>
                <Checkbox
                  checked={isGroupChecked(v)}
                  indeterminate={isGroupPartial(v)}
                  onChange={(e) => {
                    onChange(
                      v.options.map(({ value: option }) => ({
                        value: v.value,
                        option,
                        enabled: e.target.checked,
                      })),
                    );
                  }}
                >
                  {v.label}
                  {v.description && (
                    <Tooltip title={v.description}>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  )}
                </Checkbox>
              </Divider>
              <Checkbox.Group
                value={v.options.filter((v) => v.enabled).map((v) => v.value)}
                options={v.options}
                onChange={(checked) => {
                  onChange(
                    v.options.map(({ value: option }) => ({
                      value: v.value,
                      option,
                      enabled: checked.includes(option),
                    })),
                  );
                }}
              />
            </div>
          )}
        </span>
      ))}
    </div>
  );
};
