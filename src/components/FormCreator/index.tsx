import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Checkbox, Select, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import _ from 'lodash-es';
import { ColorPicker } from './ColorPicker';
import { FormattedMessage } from 'react-intl';

const AVATAR_SOURCE_LIMIT = 5 * 1024 * 1024;
const AVATAR_TARGET_LIMIT = 200 * 1024;
const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function getDataUrlBytes(dataUrl: string) {
  const base64 = dataUrl.split(',')[1] || '';
  return Math.ceil((base64.length * 3) / 4);
}

function canvasToAvatarDataUrl(
  image: HTMLImageElement,
  maxSide: number,
  quality: number
) {
  const scale = Math.min(1, maxSide / image.naturalWidth, maxSide / image.naturalHeight);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  if (!context) return '';

  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', quality);
}

function compressAvatarDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const candidates = [
        { maxSide: 480, quality: 0.9 },
        { maxSide: 400, quality: 0.82 },
        { maxSide: 320, quality: 0.74 },
        { maxSide: 256, quality: 0.68 },
      ];
      let result = dataUrl;

      for (const item of candidates) {
        const next = canvasToAvatarDataUrl(image, item.maxSide, item.quality);
        if (!next) continue;
        result = next;
        if (getDataUrlBytes(next) <= AVATAR_TARGET_LIMIT) break;
      }

      resolve(result);
    };

    image.onerror = reject;
    image.src = dataUrl;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Invalid image data'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const AvatarUploadInput = ({
  value,
  onChange,
  uploadText = '上传图片',
  clearText = '清除头像',
  unsupportedText = '当前浏览器不支持本地图片上传',
  invalidTypeText = '请选择 JPG、PNG 或 WebP 图片',
  tooLargeText = '图片不能超过 5MB',
  readErrorText = '图片读取失败，请重新选择',
}: {
  value?: string;
  onChange?: (value: string) => void;
  uploadText?: string;
  clearText?: string;
  unsupportedText?: string;
  invalidTypeText?: string;
  tooLargeText?: string;
  readErrorText?: string;
}) => {
  const beforeUpload: UploadProps['beforeUpload'] = file => {
    const isAllowedType =
      AVATAR_TYPES.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isAllowedType) {
      message.warn(invalidTypeText);
      return false;
    }

    if (file.size > AVATAR_SOURCE_LIMIT) {
      message.warn(tooLargeText);
      return false;
    }

    if (typeof window === 'undefined' || !window.FileReader) {
      message.warn(unsupportedText);
      return false;
    }

    readFileAsDataUrl(file)
      .then(compressAvatarDataUrl)
      .then(nextValue => {
        onChange?.(nextValue);
        message.success(uploadText);
      })
      .catch(() => message.warn(readErrorText));

    return false;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <Upload
        accept="image/jpeg,image/png,image/webp"
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>{uploadText}</Button>
      </Upload>
      <Button
        disabled={!value}
        icon={<DeleteOutlined />}
        onClick={() => onChange?.('')}
      >
        {clearText}
      </Button>
      {value && (
        <img
          alt=""
          src={value}
          style={{
            width: 40,
            height: 40,
            border: '1px solid #d9d9d9',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
};

type Props = {
  /** 表单配置 */
  config: Array<{
    type: string /** 组件类型 */;
    attributeId: string;
    displayName: string;
    formItemProps?: FormItemProps;
    cfg?: {
      [k: string]: any /**其它和组件本身有关的配置 */;
    };
  }>;
  /** 表单已配置内容 */
  value: {
    [key: string]: any;
  };
  onChange: (v: any) => void;
  /** 列表型内容 */
  isList: boolean;
};

type FormItemComponentProps = {
  value: any;
  onChange?: (v: any) => void;
  [key: string]: any;
};

const FormItemComponentMap = (type: string) => (
  props: FormItemComponentProps = { value: null }
) => {
  switch (type) {
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'input':
      return <Input {...props} />;
    case 'number':
      return <InputNumber {...props} />;
    case 'textArea':
      return <Input.TextArea {...props} />;
    case 'color-picker':
      return <ColorPicker {...props} />;
    case 'image-upload':
      return <AvatarUploadInput {...props} />;
    default:
      return <Input />;
  }
};

export const FormCreator: React.FC<Props> = props => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const datas = Object.keys(props.value || {}).map(d => ({
      name: [d],
      value: props.value[d],
    }));
    setFields(datas);
  }, [props.value]);

  const handleChange = (values: any) => {
    if ('edu_time' in values && typeof values.edu_time === 'string') {
      values.edu_time = values.edu_time.split(',');
    }
    if ('work_time' in values) {
      values.work_time = values.work_time.split(',');
    }
    props.onChange(values);
  };

  // 修复：onValuesChange 需要传递 allValues，而不是仅 changedValues
  const handleValuesChange = (_changedValues: any, allValues: any) => {
    handleChange(allValues);
  };

  const handleSingleValueChange = (attributeId: string, value: any) => {
    const nextValues = {
      ...(props.value || {}),
      [attributeId]: value,
    };

    setFields(
      Object.keys(nextValues).map(d => ({
        name: [d],
        value: nextValues[d],
      }))
    );
    handleChange(nextValues);
  };

  const formProps = props.isList
    ? { onFinish: handleChange }
    : { onValuesChange: handleValuesChange };

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        initialValues={props.value}
        fields={fields}
        {...formProps}
      >
        {_.map(props.config, (c, index) => {
          const isCustomAction = c.type === 'image-upload';
          const formItemKey = `${c.attributeId}-${c.type}-${index}`;

          return (
            <React.Fragment key={formItemKey}>
              <Form.Item
                label={c.displayName}
                wrapperCol={c.displayName ? { span: 18 } : { span: 24 }}
                name={isCustomAction ? undefined : c.attributeId}
                {...(c.formItemProps || {})}
              >
                {FormItemComponentMap(c.type)({
                  ...(c.cfg || {}),
                  value: _.get(props.value, [c.attributeId]),
                  onChange: isCustomAction
                    ? value => handleSingleValueChange(c.attributeId, value)
                    : undefined,
                })}
              </Form.Item>

              {/*{(['input', 'textArea'].includes(c.type) &&*/}
              {/*  !['edu_time', 'work_time'].includes(c.attributeId)) && (*/}
              {/*  <Form.Item*/}
              {/*    key={`${c.attributeId}_isHtml`}*/}
              {/*    label=""*/}
              {/*    wrapperCol={c.displayName ? { span: 18, offset: 6 } : { span: 24 }}*/}
              {/*    name={`${c.attributeId}_isHtml`}*/}
              {/*    valuePropName="checked"*/}
              {/*    style={{ marginTop: -8 }}*/}
              {/*  >*/}
              {/*    /!*<Checkbox>*!/*/}
              {/*    /!*  <FormattedMessage id="HTML模式" />*!/*/}
              {/*    /!*</Checkbox>*!/*/}
              {/*  </Form.Item>*/}
              {/*)}*/}
            </React.Fragment>
          );
        })}
        {props.isList && (
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="提交" />
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
