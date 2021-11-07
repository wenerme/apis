import 'tailwindcss/tailwind.css';
import { useImmer } from 'use-immer';
import { HiClipboardList, HiX, HiBeaker, HiMenuAlt3, HiDocumentDuplicate } from 'react-icons/hi';
import { useEffect } from 'react';
import classNames from 'classnames';
export const JsonFormatter = () => {
  const [state, update] = useImmer({ input: '{"hello":"json"}', output: '', indent: 2, error: '' });
  const setInput = (v: string) => {
    update((s) => {
      s.input = v;
      try {
        const o = JSON.parse(v);
        s.output = JSON.stringify(o, null, s.indent);
        s.error = '';
      } catch (e) {
        s.error = String(e);
      }
    });
  };
  useEffect(() => {
    setInput(state.input);
  }, [state.indent]);
  return (
    <div className="gap-4 px-8 py-4 grid grid-cols-2">
      <div>
        <div className="flex items-center flex-col">
          <div className="btn-group">
            <button className="btn btn-sm primary">
              <HiClipboardList />
              剪切板
            </button>
            <button className="btn btn-sm" onClick={() => setInput('{"hello":"json"}')}>
              <HiBeaker />
              示例
            </button>
            <button className="btn btn-sm " onClick={(e) => setInput('{}')}>
              <HiX /> 清除
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">输入</span>
          </label>
          <textarea
            value={state.input}
            onChange={(e) => setInput(e.target.value)}
            className={classNames('textarea', state.error ? 'textarea-error' : 'textarea-primary')}
            cols={40}
            rows={12}
          ></textarea>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 items-center ">
          <span className="form-control flex-row items-center">
            <HiMenuAlt3 />
            <select
              value={state.indent}
              onChange={(e) =>
                update((s) => {
                  s.indent = parseInt(e.target.value);
                })
              }
              className="select select-xs select-bordered w-12"
            >
              <option>0</option>
              <option>2</option>
              <option>4</option>
            </select>
          </span>
          <div className="btn-group">
            <button
              className="btn btn-sm"
              onClick={() => {
                navigator.clipboard?.writeText(state.output);
              }}
            >
              <HiDocumentDuplicate />
              复制
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">输出</span>
          </label>
          <textarea value={state.output} className="textarea textarea-info" readOnly cols={40} rows={12}></textarea>
        </div>
      </div>
    </div>
  );
};
