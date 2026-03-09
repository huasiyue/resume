import React from 'react';
import { Template2 } from './Template2';

export const Resume: React.FC<any> = ({ template, ...restProps }) => {
  const Template = React.useMemo(() => {
    return Template2;
  }, []);

  return Template ? <Template {...restProps} /> : null;
};
