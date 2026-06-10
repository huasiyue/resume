import React from 'react';
import { Template2 } from './Template2';
import { NbuTemplate } from './NbuTemplate';
import { SdfmuClassicTemplate, SdfmuTemplate } from './SdfmuTemplate';
import { SdfmuLightTemplate } from './SdfmuLightTemplate';

export const Resume: React.FC<any> = ({ template, ...restProps }) => {
  const Template = React.useMemo(() => {
    const templateMap = {
      template1: Template2,
      nbu: NbuTemplate,
      sdfmu: SdfmuTemplate,
      'sdfmu-classic': SdfmuClassicTemplate,
      template5: SdfmuLightTemplate,
    };

    return templateMap[template] || Template2;
  }, [template]);

  return Template ? <Template {...restProps} /> : null;
};
