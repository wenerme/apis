import {ColumnProps} from 'antd/lib/table';
import React from 'react';
import {RenderedCell} from 'rc-table/lib/interface';

export type ColumnRender<T> = (value: any, record: T, index: number) => React.ReactNode | RenderedCell<T>;

export function normalizeColumns<T>(columns: Array<ColumnProps<T>>) {
  const keys = new Set();
  for (const column of columns) {
    if (!column.key && column.title && typeof column.title === 'string') {
      column.key = column.title;
    }
    if (!column.key && column.dataIndex) {
      if (Array.isArray(column.dataIndex)) {
        column.key = column.dataIndex.join('.')
      } else {
        column.key = column.dataIndex;
      }
    }

    if (!column.key) {
      console.warn(`Column no key`, column);
    } else if (keys.has(column.key)) {
      console.warn(`Column duplicate key ${column.key}`, column);
    } else {
      keys.add(column.key)
    }

    if (column.key && !column.dataIndex && typeof column.key === 'string') {
      column.dataIndex = column.key.split('.')
    }
  }

  return columns
}
