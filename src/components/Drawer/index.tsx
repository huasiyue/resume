import React, { useState, useRef, useMemo } from 'react';
import {
  Drawer as AntdDrawer,
  Button,
  Collapse,
  Modal,
  Radio,
  Popover,
  Input,
  Switch, // 新增
} from 'antd';
import { DeleteFilled, InfoCircleFilled } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash-es';
import arrayMove from 'array-move';
import { FormCreator } from '../FormCreator';
import { getDefaultTitleNameMap } from '@/data/constant';
import { FormattedMessage, useIntl } from 'react-intl';
import { MODULES, CONTENT_OF_MODULE } from '@/helpers/contant';
import type { ResumeConfig, ThemeConfig } from '../types';
import { ConfigTheme } from './ConfigTheme';
import { Templates } from './Templates';
import './index.less';
import useThrottle from '@/hooks/useThrottle';

const { Panel } = Collapse;

type Props = {
  value: ResumeConfig;
  onValueChange: (v: Partial<ResumeConfig>) => void;
  theme: ThemeConfig;
  onThemeChange: (v: Partial<ThemeConfig>) => void;
  template: string;
  onTemplateChange: (v: string) => void;

  style?: object;
};

const type = 'DragableBodyRow';

const DragableRow = ({ index, moveRow, ...restProps }) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      // @ts-ignore
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      // @ts-ignore
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <div
      ref={ref}
      className={`${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}
      {...restProps}
    />
  );
};

/**
 * @description 简历配置区
 */
export const Drawer: React.FC<Props> = props => {
  const intl = useIntl();

  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(null);
  const [currentContent, updateCurrentContent] = useState(null);

  /**
   * 1. 更新currentContent State
   * 2. 调用 props.onValueChange 更新模板
   */
  const updateContent = useThrottle(
    v => {
      // 非列表模块采用“直接覆盖”保存，避免 merge 造成结构异常
      const isPlainOverride =
        childrenDrawer === 'awardList' ||
        childrenDrawer === 'skillList' ||
        childrenDrawer === 'aboutme' ||
        childrenDrawer === 'educationList' ||
        childrenDrawer === 'honorList' ||
        childrenDrawer === 'studentWorkList' ||
        childrenDrawer === 'competitionAwardList';

      const newConfig = isPlainOverride
        ? v
        : _.merge({}, currentContent, v);

      updateCurrentContent(newConfig);
      props.onValueChange({
        [childrenDrawer]: newConfig,
      });
    },
    [currentContent, childrenDrawer],
    800
  );

  const [type, setType] = useState('module');

  const swapItems = (moduleKey: string, oldIdx: number, newIdx: number) => {
    const newValues = _.clone(_.get(props.value, moduleKey, []));
    if (!Array.isArray(newValues)) return; // 防御：非数组不做移动
    props.onValueChange({
      [moduleKey]: arrayMove(newValues, newIdx, oldIdx),
    });
  };

  const deleteItem = (moduleKey: string, idx: number) => {
    const newValues = _.get(props.value, moduleKey, []);
    if (!Array.isArray(newValues)) return; // 防御：非数组不做删除
    props.onValueChange({
      [moduleKey]: newValues.slice(0, idx).concat(newValues.slice(idx + 1)),
    });
  };

  const modules = useMemo(() => {
    const titleNameMap = props.value?.titleNameMap;
    return MODULES({ intl, titleNameMap });
  }, [intl, props.value?.titleNameMap]);

  const contentOfModule = useMemo(() => {
    return CONTENT_OF_MODULE({ intl });
  }, [intl]);

  const DEFAULT_TITLE_MAP = getDefaultTitleNameMap({ intl });
  const isList =
    childrenDrawer !== 'studentWorkList' &&
    childrenDrawer !== 'honorList' &&
    childrenDrawer !== 'educationList' &&
    childrenDrawer !== 'skillList' &&
    childrenDrawer !== 'awardList' &&
    childrenDrawer !== 'competitionAwardList' &&
    _.endsWith(childrenDrawer, 'List');

  // #region 1 render: moduleContent
  const renderModuleList = ({ icon, key, name }, idx, values) => {
    const isHidden = !!props.value?.moduleHiddenMap?.[key];
    const header = (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="item-icon">{icon}</span>
          <span className="item-name">
          {DEFAULT_TITLE_MAP[key] ? (
            <Input
              placeholder={DEFAULT_TITLE_MAP[key]}
              bordered={false}
              defaultValue={name}
              onChange={e => {
                e.stopPropagation();
                props.onValueChange({
                  titleNameMap: {
                    ...(props.value.titleNameMap || {}),
                    [key]: e.target.value,
                  },
                });
              }}
              onClick={e => e.stopPropagation()}
              style={{ padding: 0 }}
            />
          ) : (
            name
          )}
        </span>
        </div>
        <span onClick={e => e.stopPropagation()}>
        <Switch
          size="small"
          checked={!isHidden}
          onChange={checked => {
            props.onValueChange({
              moduleHiddenMap: {
                ...(props.value.moduleHiddenMap || {}),
                [key]: !checked,
              },
            });
          }}
        />
      </span>
      </div>
    );

    const list = _.map(values, (value, idx: number) => (
      <DragableRow
        key={`${idx}`}
        index={idx}
        moveRow={(oldIdx, newIdx) => swapItems(key, oldIdx, newIdx)}
      >
        <div
          onClick={() => {
            setChildrenDrawer(key);
            updateCurrentContent({
              ...value,
              dataIndex: idx,
            });
          }}
        >
          {`${idx + 1}. ${Object.values(value || {}).join(' - ')}`}
        </div>
        <DeleteFilled
          onClick={() => {
            Modal.confirm({
              content: intl.formatMessage({ id: '确认删除' }),
              onOk: () => deleteItem(key, idx),
            });
          }}
        />
      </DragableRow>
    ));

    return (
      <div className="module-item" key={`${idx}`}>
        <Collapse defaultActiveKey={[]} ghost>
          <Panel header={header} key={`${idx}`}>
            <div className="list-value-item">
              {list}
              <div
                className="btn-append"
                onClick={() => {
                  setChildrenDrawer(key);
                  updateCurrentContent(null);
                }}
              >
                <FormattedMessage id="继续添加" />
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  };
  // #endregion

  // #region 1.2 render: ModuleListItem when !_.endsWith(module.key,'List')
  const renderModuleListItem = ({ icon, key, name }) => {
    const isHidden = key === 'avatar'
      ? !!props.value?.avatar?.hidden
      : !!props.value?.moduleHiddenMap?.[key];

    return (
      <div className="module-item" key={key}>
        <Collapse
          defaultActiveKey={[]}
          ghost
          expandIcon={() => (
            <span style={{ display: 'inline-block', width: '12px' }} />
          )}
        >
          <Panel
            header={
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  className="item-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCurrentContent(_.get(props.value, key));
                    setChildrenDrawer(key);
                  }}
                >{icon}</span>
                  <span
                    className="item-name"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateCurrentContent(_.get(props.value, key));
                      setChildrenDrawer(key);
                    }}
                  >{name}</span>
                </div>
                <span onClick={e => e.stopPropagation()}>
                <Switch
                  size="small"
                  checked={!isHidden}
                  onChange={checked => {
                    // 特殊处理头像和个人信息的隐藏逻辑
                    if (key === 'avatar') {
                      // 头像隐藏在avatar.hidden中
                      const newAvatar = { ...(props.value.avatar || {}) };
                      newAvatar.hidden = !checked;
                      props.onValueChange({ avatar: newAvatar });
                    } else {
                      // 其他模块使用moduleHiddenMap
                      props.onValueChange({
                        moduleHiddenMap: {
                          ...(props.value.moduleHiddenMap || {}),
                          [key]: !checked,
                        },
                      });
                    }
                  }}
                />
              </span>
              </div>
            }
            className="no-content-panel"
            key="no-content-panel__renderModuleListItem"
          />
        </Collapse>
      </div>
    );
  };
  // #endregion

  // 排序相关：定义左右列模块与当前顺序
  // 这里是关键修改点：添加新模块到默认排序中
  const BASIC_KEYS = ['educationList', 'workList', 'aboutme', 'skillList', 'awardList', 'honorList', 'competitionAwardList', 'studentWorkList'];
  const MAIN_KEYS = ['workExpList', 'projectList', 'researchList'];

  // 使用已保存的顺序为主，仅补齐缺失的新模块
  const savedBasic = _.get(props.value, 'moduleOrderBasic');
  const savedMain = _.get(props.value, 'moduleOrderMain');

  const basicBase = Array.isArray(savedBasic) ? savedBasic : BASIC_KEYS;
  const mainBase = Array.isArray(savedMain) ? savedMain : MAIN_KEYS;

  const allSaved = new Set([...basicBase, ...mainBase]);
  const extrasBasic = BASIC_KEYS.filter(k => !allSaved.has(k));
  const extrasMain = MAIN_KEYS.filter(k => !allSaved.has(k));

  const moduleOrderBasic = [...basicBase, ...extrasBasic];
  const moduleOrderMain = [...mainBase, ...extrasMain].filter(k => !moduleOrderBasic.includes(k));

  const nameMap = modules.reduce((acc, m) => ({ ...acc, [m.key]: m.name }), {});
  const combinedOrder = [...moduleOrderBasic, ...moduleOrderMain];

  const moduleContent = (
    <DndProvider backend={HTML5Backend}>
      {/* 模块顺序面板（合并为一个列表） */}
      <Collapse ghost>
        <Panel
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><FormattedMessage id="模块顺序" /></span>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onValueChange({
                    moduleOrderBasic: BASIC_KEYS,
                    moduleOrderMain: MAIN_KEYS,
                  });
                }}
              >
                重置排序
              </Button>
            </div>
          }
          key="module-order"
        >
          <div>
            {combinedOrder.map((key, idx) => (
              <DragableRow
                key={`all-${idx}`}
                index={idx}
                moveRow={(oldIdx, newIdx) => {
                  const newCombined = arrayMove(combinedOrder, newIdx, oldIdx);
                  // 根据当前归属（而非固定常量）拆分回左右列
                  const newBasic = newCombined.filter(k => moduleOrderBasic.includes(k));
                  const newMain = newCombined.filter(k => moduleOrderMain.includes(k));
                  props.onValueChange({
                    moduleOrderBasic: newBasic,
                    moduleOrderMain: newMain,
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderBottom: '1px dashed #eee' }}>
                  <span>{`${idx + 1}. ${nameMap[key] || key}`}</span>
                  {/* 列归属切换：左侧 / 右侧 */}
                  <Radio.Group
                    size="small"
                    value={moduleOrderBasic.includes(key) ? 'basic' : 'main'}
                    onChange={(e) => {
                      e.stopPropagation();
                      const to = e.target.value; // 'basic' | 'main'
                      if (to === 'basic') {
                        // 从右侧移到左侧（去重后追加到左列末尾）
                        const newMain = moduleOrderMain.filter(k => k !== key);
                        const newBasic = moduleOrderBasic.includes(key) ? moduleOrderBasic : moduleOrderBasic.concat(key);
                        props.onValueChange({
                          moduleOrderBasic: newBasic,
                          moduleOrderMain: newMain,
                        });
                      } else {
                        // 从左侧移到右侧（去重后追加到右列末尾）
                        const newBasic = moduleOrderBasic.filter(k => k !== key);
                        const newMain = moduleOrderMain.includes(key) ? moduleOrderMain : moduleOrderMain.concat(key);
                        props.onValueChange({
                          moduleOrderBasic: newBasic,
                          moduleOrderMain: newMain,
                        });
                      }
                    }}
                  >
                    <Radio.Button value="basic">左侧</Radio.Button>
                    <Radio.Button value="main">右侧</Radio.Button>
                  </Radio.Group>
                </div>
              </DragableRow>
            ))}
          </div>
        </Panel>
      </Collapse>

      <div className="module-list">
        {modules.map((module, idx) => {
          if (
            !_.endsWith(module.key, 'List') ||
            module.key === 'studentWorkList' ||
            module.key === 'honorList' ||
            module.key === 'educationList' ||
            module.key === 'skillList' ||
            module.key === 'awardList' ||
            module.key === 'competitionAwardList'
          ) {
            return renderModuleListItem(module);
          }
          const values = _.get(props.value, module.key, []);
          return renderModuleList(module, idx, values);
        })}
      </div>
      <AntdDrawer
        title={modules.find(m => m.key === childrenDrawer)?.name}
        width={450}
        onClose={() => setChildrenDrawer(null)}
        visible={!!childrenDrawer}
      >
        <FormCreator
          config={contentOfModule[childrenDrawer]}
          value={currentContent}
          isList={isList}
          onChange={v => {
            if (isList) {
              // 克隆数组，避免直接修改原引用导致渲染异常或数据串行
              const newValue = _.clone(_.get(props.value, childrenDrawer, []));
              if (currentContent) {
                newValue[currentContent.dataIndex] = _.merge({}, currentContent, v);
              } else {
                newValue.push(v);
              }
              props.onValueChange({
                [childrenDrawer]: newValue,
              });
              setChildrenDrawer(null);
              updateCurrentContent(null);
            } else {
              updateContent(v);
            }
          }}
        />
      </AntdDrawer>
    </DndProvider>
  );

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={props.style}
      >
        <FormattedMessage id="进行配置" />
        <Popover
          content={
            <FormattedMessage id="移动端模式下，只支持预览，不支持配置" />
          }
        >
          <InfoCircleFilled style={{ marginLeft: '4px' }} />
        </Popover>
      </Button>
      <AntdDrawer
        title={
          <Radio.Group value={type} onChange={e => setType(e.target.value)}>
            <Radio.Button value="module">
              <FormattedMessage id="配置简历" />
            </Radio.Button>
            <Radio.Button value="template">
              <FormattedMessage id="选择模板" />
            </Radio.Button>
          </Radio.Group>
        }
        width={480}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {type === 'module' ? (
          moduleContent
        ) : (
          <>
            <ConfigTheme
              {...props.theme}
              onChange={v => props.onThemeChange(v)}
            />
            <Templates
              template={props.template}
              onChange={v => props.onTemplateChange(v)}
            />
          </>
        )}
      </AntdDrawer>
    </>
  );
};
