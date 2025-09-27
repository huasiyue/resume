import React from 'react';
import {
  ProfileTwoTone,
  ContactsTwoTone,
  SmileTwoTone,
  TrophyTwoTone,
  TagsTwoTone,
  RocketTwoTone,
  ProjectTwoTone,
  ToolTwoTone,
  ScheduleTwoTone,
  ExperimentTwoTone,
  TrophyOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import _ from 'lodash-es';
import { intl } from '@/i18n';
import type { ResumeConfig } from '@/components/types';

/**
 * ① 内置的简历模块
 * ② 后续支持添加自定义模块
 */
export const MODULES = ({
                          intl,
                          titleNameMap,
                        }: {
  intl: any;
  titleNameMap?: ResumeConfig['titleNameMap'];
}) => {
  return [
    {
      name: intl.formatMessage({ id: '头像设置' }),
      icon: <ContactsTwoTone />,
      key: 'avatar',
    },
    {
      name: intl.formatMessage({ id: '个人信息' }),
      icon: <ProfileTwoTone />,
      key: 'profile',
    },
    {
      name: intl.formatMessage({ id: '教育背景' }),
      icon: <ScheduleTwoTone />,
      key: 'educationList',
    },
    {
      name: intl.formatMessage({ id: '自我介绍' }),
      icon: <SmileTwoTone />,
      key: 'aboutme',
    },
    {
      name: intl.formatMessage({ id: '更多信息' }),
      icon: <TrophyTwoTone />,
      key: 'awardList',
    },
    {
      name: intl.formatMessage({ id: '个人作品' }),
      icon: <ToolTwoTone />,
      key: 'workList',
    },
    {
      name: intl.formatMessage({ id: '专业技能' }),
      icon: <RocketTwoTone />,
      key: 'skillList',
    },
    {
      name: intl.formatMessage({ id: '工作经历' }),
      icon: <TagsTwoTone />,
      key: 'workExpList',
    },
    {
      key: 'researchList',
      name: titleNameMap?.researchList || intl.formatMessage({ id: '科研经历' }),
      icon: <ExperimentTwoTone />,
    },
    // 添加荣誉奖项
    {
      key: 'honorList',
      name: titleNameMap?.honorList || intl.formatMessage({ id: '荣誉奖项' }),
      icon: <TrophyTwoTone />,
    },
    // 添加学生工作
    {
      key: 'studentWorkList',
      name: titleNameMap?.studentWorkList || intl.formatMessage({ id: '学生工作' }),
      icon: <ContactsTwoTone />,
    },
    {
      name: intl.formatMessage({ id: '项目经历' }),
      icon: <ProjectTwoTone />,
      key: 'projectList',
    },
  ].map(d => {
    const name = _.get(titleNameMap, d.key);
    return { ...d, name: _.isNil(name) ? d.name : name };
  });
};

/**
 * 模块对应配置内容
 */
export const CONTENT_OF_MODULE = ({ intl }) => {
  return {
    avatar: [
      {
        type: 'checkbox',
        attributeId: 'hidden',
        displayName: intl.formatMessage({ id: '隐藏头像' }),
        formItemProps: {
          valuePropName: 'checked',
        },
        cfg: {
          checked: false,
        },
      },
      {
        type: 'input',
        attributeId: 'src',
        displayName: intl.formatMessage({ id: '头像地址' }),
        cfg: {
          placeholder: 'https://xxx.png',
        },
      },
      {
        type: 'select',
        attributeId: 'shape',
        displayName: intl.formatMessage({ id: '头像形状' }),
        cfg: {
          defaultValue: 'circle',
          options: [
            { value: 'circle', label: intl.formatMessage({ id: '圆形' }) },
            { value: 'square', label: intl.formatMessage({ id: '方形' }) },
          ],
        },
      },
    ],
    profile: [
      {
        type: 'input',
        attributeId: 'name',
        displayName: intl.formatMessage({ id: '姓名' }),
        formItemProps: { rules: [{ required: true }] },
      },
      {
        type: 'input',
        attributeId: 'mobile',
        displayName: intl.formatMessage({ id: '手机号码' }),
        formItemProps: {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        },
      },
      {
        type: 'input',
        attributeId: 'email',
        displayName: intl.formatMessage({ id: '邮箱' }),
        formItemProps: { rules: [{ required: true, message: 'Please input your email!' }] },
      },
      {
        type: 'input',
        attributeId: 'birth_date',
        displayName: intl.formatMessage({ id: '出生年月' }),
        cfg: { placeholder: '例如：2005.01' },
      },
      {
        type: 'input',
        attributeId: 'political_status',
        displayName: intl.formatMessage({ id: '政治面貌' }),
        cfg: { placeholder: '例如：中共预备党员' },
      },
    ],
    educationList: [
      {
        type: 'textArea',
        attributeId: 'education_desc',
        displayName: intl.formatMessage({ id: '教育背景' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'education_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    projectList: [
      {
        type: 'input',
        attributeId: 'project_time',
        displayName: intl.formatMessage({ id: '起止时间' }),
        formItemProps: { rules: [{ required: true }] },
        // cfg: { picker: 'month' },
      },
      {
        type: 'input',
        attributeId: 'project_name',
        displayName: intl.formatMessage({ id: '项目名称' }),
      },
      {
        type: 'input',
        attributeId: 'project_role',
        displayName: intl.formatMessage({ id: '担任角色' }),
      },
      {
        type: 'textArea',
        attributeId: 'project_desc',
        displayName: intl.formatMessage({ id: '项目描述' }),
        cfg: { autoSize: { minRows: 8 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'project_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
      {
        type: 'textArea',
        attributeId: 'project_content',
        displayName: intl.formatMessage({ id: '主要工作' }),
        cfg: {
          autoSize: { minRows: 8 },
          showCount: true,
        },
        formItemProps: {
          style: { marginTop: 25 },
        },
      },
      {
        type: 'checkbox',
        attributeId: 'project_content_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
      {
        type: 'textArea',
        attributeId: 'project_tech_stack',
        displayName: intl.formatMessage({ id: '技术栈' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
        formItemProps: { style: { marginTop: 25 } },
      },
      {
        type: 'checkbox',
        attributeId: 'project_tech_stack_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
      {
        type: 'textArea',
        attributeId: 'project_achievement',
        displayName: intl.formatMessage({ id: '取得成果' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
        formItemProps: { style: { marginTop: 25 } },
      },
      {
        type: 'checkbox',
        attributeId: 'project_achievement_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    workExpList: [
      {
        type: 'input',
        attributeId: 'work_time',
        displayName: intl.formatMessage({ id: '起止时间' }),
        formItemProps: { rules: [{ required: true }] },
        // cfg: { picker: 'month' },
      },
      {
        type: 'input',
        attributeId: 'company_name',
        displayName: intl.formatMessage({ id: '公司名称' }),
        formItemProps: { rules: [{ required: true }] },
      },
      {
        type: 'input',
        attributeId: 'department_name',
        displayName: intl.formatMessage({ id: '部门' }),
      },
      {
        type: 'textArea',
        attributeId: 'work_desc',
        displayName: intl.formatMessage({ id: '职位或描述' }),
      },
      {
        type: 'checkbox',
        attributeId: 'work_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    workList: [
      {
        type: 'input',
        attributeId: 'work_name',
        displayName: intl.formatMessage({ id: '作品名称' }),
      },
      {
        type: 'input',
        attributeId: 'work_desc',
        displayName: intl.formatMessage({ id: '作品描述' }),
      },
      {
        type: 'input',
        attributeId: 'visit_link',
        displayName: intl.formatMessage({ id: '作品链接' }),
      },
    ],
    skillList: [
      {
        type: 'textArea',
        attributeId: 'skill_desc',
        displayName: intl.formatMessage({ id: '个人技能' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'skill_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    aboutme: [
      {
        type: 'textArea',
        attributeId: 'aboutme_desc',
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'aboutme_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    awardList: [
      {
        type: 'textArea',
        attributeId: 'award_desc',
        displayName: intl.formatMessage({ id: '更多信息' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'award_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    // 添加荣誉奖项表单定义
    honorList: [
      {
        type: 'textArea',
        attributeId: 'honor_desc',
        displayName: intl.formatMessage({ id: '奖项内容' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'honor_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
    // 添加学生工作表单定义
    studentWorkList: [
      {
        type: 'textArea',
        attributeId: 'student_work_desc',
        displayName: intl.formatMessage({ id: '工作描述' }),
        cfg: { autoSize: { minRows: 4 }, showCount: true },
      },
      {
        type: 'checkbox',
        attributeId: 'student_work_desc_isHtml',
        displayName: intl.formatMessage({ id: 'HTML模式' }),
        formItemProps: { valuePropName: 'checked' },
      },
    ],
  };
};
