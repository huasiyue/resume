import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import './index.less';

type Props = {
  template: string;
  onChange: (v: string) => void;
};

const TEMPLATES = [
  {
    id: 'template1',
    name: 'Default',
    description: '\u9ed8\u8ba4\u6a21\u677f\uff08\u9002\u7528\u4e8e\u5355\u9875\uff09',
    preview: 'default',
  },
  {
    id: 'nbu',
    name: 'NBU',
    description: '\u5b81\u6ce2\u5927\u5b66\u4e2d\u6587\u7b80\u5386\u6a21\u677f',
    preview: 'nbu',
  },
  {
    id: 'sdfmu',
    name: 'SDFMU',
    description:
      '\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\u5b98\u65b9\u7d2b\u8272\u6a21\u677f',
    preview: 'sdfmu',
  },
  {
    id: 'sdfmu-classic',
    name: 'SDFMU Classic',
    description:
      '\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\u84dd\u7d2b\u7ecf\u5178\u98ce\u683c',
    preview: 'sdfmu-classic',
  },
  {
    id: 'template5',
    name: 'SDFMU Light',
    description:
      '\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\u6d45\u8272\u80cc\u666f\u6a21\u677f',
    preview: 'sdfmu',
  },
];

export const Templates: React.FC<Props> = props => {
  const intl = useIntl();

  return (
    <div className="templates">
      {TEMPLATES.map(item => {
        return (
          <div
            className={cx('template-item', {
              selected: item.id === props.template,
            })}
            key={`${item.id}`}
            onClick={() => props.onChange(item.id)}
          >
            <div className={cx('template-preview', item.preview)}>
              <span className="preview-header" />
              <span className="preview-title" />
              <span className="preview-line long" />
              <span className="preview-line" />
              <span className="preview-line short" />
              <span className="preview-title" />
              <span className="preview-line long" />
              <span className="preview-line" />
            </div>
            <span className="template-id">{item.name}</span>
            <span className="template-description">
              {intl.formatMessage({
                id: item.description,
                defaultMessage: item.description,
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};
