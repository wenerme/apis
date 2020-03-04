import {ColumnProps} from 'antd/lib/table';

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
  }

  return columns
}
