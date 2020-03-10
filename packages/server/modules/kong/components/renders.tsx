import {format} from 'date-fns';
import {Checkbox} from 'antd';
import React from 'react';

export function renderTimeStamp(v) {
  return format(new Date(v * 1000), 'yyyy-MM-dd HH:mm')
}

export function renderArrayOfString(v) {
  if (!v) {
    return null
  }
  if (Array.isArray(v)) {
    return v.flatMap((v, i) => [<span key={`${i}-0`}>{v}</span>, <br key={`${i}-1`} />])
  }
  return v
}

export function renderBoolean(v) {
  return <Checkbox checked={Boolean(v)} />
}
