import React from 'react';
import { Tag, Progress } from 'antd';
import {
  PhoneFilled,
  MailFilled,
  ScheduleFilled,
  CrownFilled,
  TrophyFilled,
} from '@ant-design/icons';
import cx from 'classnames';
import _ from 'lodash-es';
import { FormattedMessage, useIntl } from 'react-intl';
import { getDefaultTitleNameMap } from '@/data/constant';
import { Avatar } from '../../Avatar';
import type { ResumeConfig, ThemeConfig } from '../../types';
import './index.less';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

const Wrapper = ({ className, title, color, children }) => {
  return (
    <div className={cx('section', className)}>
      <div className="section-title" style={{ color }}>
        <span className="title">{title}</span>
        <span className="title-addon" />
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
};

/**
 * @description 简历内容区
 */
export const Template2: React.FC<Props> = props => {
  const intl = useIntl();
  const { value, theme } = props;

  /** 个人基础信息 */
  const profile: any = _.get(value, 'profile') ?? {};

  const titleNameMap = _.get(
    value,
    'titleNameMap',
    getDefaultTitleNameMap({ intl })
  );

  /** 教育背景 */
  const educationList = _.get(value, 'educationList');

  /** 工作经历 */
  const workExpList = _.get(value, 'workExpList');

  /** 科研经历 */
  const researchList = _.get(value, 'researchList');

  /** 荣誉奖项 */
  const honorList = _.get(value, 'honorList');

  /** 学生工作 */
  const studentWorkList = _.get(value, 'studentWorkList');

  /** 项目经验 */
  const projectList = _.get(value, 'projectList');

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 更多信息 */
  const awardList = _.get(value, 'awardList');

  /** 工作成果（左侧模块） */
  const workList = _.get(value, 'workList');

  /** 自我介绍（左侧模块） */
  const aboutme = _.get(value, 'aboutme');

  /** 隐藏映射 */
// 在获取 hiddenMap 后添加
  const hiddenMap = _.get(value, 'moduleHiddenMap', {}) as {
    [key: string]: boolean;
    educationList?: boolean;
    workExpList?: boolean;
    projectList?: boolean;
    researchList?: boolean;
    honorList?: boolean;
    studentWorkList?: boolean;
    skillList?: boolean;
    awardList?: boolean;
    workList?: boolean;
    aboutme?: boolean;
    profile?: boolean;
  };

  /** 模块排序（两列） */
  const DEFAULT_BASIC_ORDER = ['educationList', 'workList', 'aboutme', 'skillList', 'awardList', 'honorList', 'studentWorkList'];
  const DEFAULT_MAIN_ORDER = ['workExpList', 'projectList', 'researchList'];

  const orderBasic = _.get(value, 'moduleOrderBasic', DEFAULT_BASIC_ORDER);
  const orderMain = _.get(value, 'moduleOrderMain', DEFAULT_MAIN_ORDER);

  // renderBasicSection
  const renderBasicSection = (key: string) => {
    switch (key) {
      case 'educationList':
        return !(hiddenMap && hiddenMap.educationList) && (educationList as any)?.education_desc ? (
          <Wrapper
            title={titleNameMap.educationList}
            className="section section-education"
            color={theme.color}
          >
            <div className="education-item">
              {(educationList as any).education_desc_isHtml ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: (educationList as any).education_desc || '',
                  }}
                />
              ) : (
                <span>{(educationList as any).education_desc}</span>
              )}
            </div>
          </Wrapper>
        ) : null;
      case 'honorList':
        return !(hiddenMap && hiddenMap.honorList) && honorList && (
          Array.isArray(honorList) ? honorList.length > 0 : (honorList as any).honor_desc
        ) ? (
          <Wrapper title={titleNameMap.honorList || "荣誉奖项"} className="experience" color={theme.color}>
            {Array.isArray(honorList) ? honorList.map((honor, idx) => {
              return (
                <div key={idx.toString()}>
                  <TrophyFilled style={{ color: '#ffc107', marginRight: '8px' }} />
                  {honor?.honor_info_isHtml ? (
                    <span
                      className="info-name"
                      dangerouslySetInnerHTML={{ __html: honor.honor_info || '' }}
                    />
                  ) : (
                    <span className="info-name">{honor.honor_info}</span>
                  )}
                  {honor?.honor_time_isHtml ? (
                    <span
                      className="sub-info honor-time"
                      dangerouslySetInnerHTML={{ __html: honor.honor_time || '' }}
                    />
                  ) : honor.honor_time ? (
                    <span className="sub-info honor-time">({honor.honor_time})</span>
                  ) : null}
                </div>
              );
            }) : (
              <div>
                {(honorList as any).honor_desc_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: (honorList as any).honor_desc || '' }} />
                ) : (
                  <span>{(honorList as any).honor_desc}</span>
                )}
              </div>
            )}
          </Wrapper>
        ) : null;
      case 'studentWorkList':
        return !(hiddenMap && hiddenMap.studentWorkList) && studentWorkList && (
          Array.isArray(studentWorkList) ? studentWorkList.length > 0 : (studentWorkList as any).student_work_desc
        ) ? (
          <Wrapper title={titleNameMap.studentWorkList || "学生工作"} className="experience" color={theme.color}>
            {Array.isArray(studentWorkList) ? studentWorkList.map((work, idx) => {
              return (
                <div key={idx.toString()}>
                  <div>
                    <CrownFilled style={{ color: '#ffc107', marginRight: '8px' }} />
                    <b className="info-name">{work.student_work_name}</b>
                  </div>
                  {work.student_work_desc && <div>{work.student_work_desc}</div>}
                </div>
              );
            }) : (
              <div>
                {(studentWorkList as any).student_work_desc_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: (studentWorkList as any).student_work_desc || '' }} />
                ) : (
                  <span>{(studentWorkList as any).student_work_desc}</span>
                )}
              </div>
            )}
          </Wrapper>
        ) : null;
      case 'workExpList':
        return !(hiddenMap && hiddenMap.workExpList) && workExpList && workExpList.length > 0 ? (
          <Wrapper title={titleNameMap.workExpList} className="experience" color={theme.color}>
            <div className="section section-work-exp">
              {_.map(workExpList, (work, idx) => {
                const [start = null, end = null] =
                  typeof work.work_time === 'string' ? `${work.work_time || ''}`.split(',') : work.work_time;
                return work ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {work.company_name}
                        <span className="sub-info">{work.department_name}</span>
                      </b>
                      <span className="info-time">
                        {start}
                        {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                      </span>
                    </div>
                    <div className="work-description">{work.work_desc}</div>
                  </div>
                ) : null;
              })}
            </div>
          </Wrapper>
        ) : null;
      case 'projectList':
        return !(hiddenMap && hiddenMap.projectList) && projectList && projectList.length > 0 ? (
          <Wrapper title={titleNameMap.projectList} className="skill" color={theme.color}>
            <div className="section section-project">
              {_.map(projectList, (project, idx) =>
                project ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {project.project_name}
                        <span className="info-time">{project.project_time}</span>
                      </b>
                      {project.project_role && <Tag color={theme.tagColor}>{project.project_role}</Tag>}
                    </div>
                    {/* 新增：参与度进度条 */}
                    {typeof project.participation_percent === 'number' && (
                      <div className="section-detail" style={{ marginTop: 8 }}>
                        <span><FormattedMessage id="参与度" />：{project.participation_percent}%</span>
                        <div style={{ width: 240, marginTop: 6 }}>
                          <Progress percent={project.participation_percent} size="small" showInfo={false} />
                        </div>
                      </div>
                    )}
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="项目描述" />：
                      </span>
                      <span>{project.project_desc}</span>
                    </div>
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="主要工作" />：
                      </span>
                      <span className="project-content">{project.project_content}</span>
                    </div>
                    {project.project_tech_stack && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="技术栈" />：
                        </span>
                        <span className="project-tech-stack">
                          {project.project_tech_stack_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: project.project_tech_stack || '' }} />
                          ) : (
                            project.project_tech_stack
                          )}
                        </span>
                      </div>
                    )}
                    {project.project_achievement && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="取得成果" />：
                        </span>
                        <span className="project-achievement">
                          {project.project_achievement_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: project.project_achievement || '' }} />
                          ) : (
                            project.project_achievement
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </Wrapper>
        ) : null;
      case 'researchList':
        return !(hiddenMap && hiddenMap.researchList) && researchList && researchList.length > 0 ? (
          <Wrapper title={titleNameMap?.researchList || "科研经历"} className="experience" color={theme.color}>
            <div className="section section-research">
              {_.map(researchList, (research, idx) =>
                research ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {research?.research_name_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_name || '' }} />
                        ) : (
                          research.research_name
                        )}
                        <span className="info-time">
                          {research?.research_time_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_time || '' }} />
                          ) : (
                            research.research_time
                          )}
                        </span>
                      </b>
                      {research.research_role && (
                        <Tag color={theme.tagColor}>
                          {research?.research_role_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_role || '' }} />
                          ) : (
                            research.research_role
                          )}
                        </Tag>
                      )}
                    </div>
                    {/* 下面内容不变 */}
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="项目概述" />：
                      </span>
                      <span>
                        {research?.research_desc_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_desc || '' }} />
                        ) : (
                          research.research_desc
                        )}
                      </span>
                    </div>
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="本人工作" />：
                      </span>
                      <span className="research-content">
                        {research?.research_content_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_content || '' }} />
                        ) : (
                          research.research_content
                        )}
                      </span>
                    </div>
                    {research.research_achievement && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="取得成果" />：
                        </span>
                        <span className="research-achievement">
                          {research?.research_achievement_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_achievement || '' }} />
                          ) : (
                            research.research_achievement
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </Wrapper>
        ) : null;
      default:
        return null;
    }
  };

  // renderSection
    const renderSection = (key: string) => {
    switch (key) {
      case 'educationList':
        return !(hiddenMap && hiddenMap.educationList) && (educationList as any)?.education_desc ? (
          <Wrapper
            title={titleNameMap.educationList}
            className="section section-education"
            color={theme.color}
          >
            <div className="education-item">
              {(educationList as any).education_desc_isHtml ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: (educationList as any).education_desc || '',
                  }}
                />
              ) : (
                <span>{(educationList as any).education_desc}</span>
              )}
            </div>
          </Wrapper>
        ) : null;
      case 'workList':
        return !(hiddenMap && hiddenMap.workList) && workList && workList.length > 0 ? (
          <Wrapper title={titleNameMap.workList} className="section section-work" color={theme.color}>
            {workList.map((work, idx) => {
              return (
                <div key={idx.toString()}>
                  <div>
                    <CrownFilled style={{ color: '#ffc107', marginRight: '8px' }} />
                    <b className="info-name">{work.work_name}</b>
                    {(work as any).visit_link && (
                      <a className="sub-info" href={(work as any).visit_link}>
                        <FormattedMessage id="访问链接" />
                      </a>
                    )}
                  </div>
                  {work.work_desc && <div>{work.work_desc}</div>}
                </div>
              );
            })}
          </Wrapper>
        ) : null;
      case 'aboutme':
        return !(hiddenMap as any)?.aboutme && aboutme && (
          Array.isArray(aboutme) ? aboutme.length > 0 : aboutme.aboutme_desc
        ) ? (
          <Wrapper title={titleNameMap.aboutme || <FormattedMessage id="自我介绍" />} className="section section-aboutme" color={theme.color}>
            {Array.isArray(aboutme) ? aboutme.map((d, idx) => (
              <div key={`${idx}`}>{d}</div>
            )) : (
              <div>{aboutme.aboutme_desc}</div>
            )}
          </Wrapper>
        ) : null;
      case 'skillList':
          return !(hiddenMap && hiddenMap.skillList) && skillList && (
            Array.isArray(skillList) ? skillList.length > 0 : (skillList as any)?.skill_desc
          ) ? (
            <Wrapper title={titleNameMap.skillList || <FormattedMessage id="个人技能" />} className="section section-skill" color={theme.color}>
              {Array.isArray(skillList) ? (
                skillList.map((d, idx) => (
                  <div key={`${idx}`}>{d}</div>
                ))
              ) : (skillList as any)?.skill_desc_isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: (skillList as any).skill_desc || '' }} />
              ) : (
                <div>{(skillList as any).skill_desc}</div>
              )}
            </Wrapper>
          ) : null;
      case 'awardList':
        return !(hiddenMap && hiddenMap.awardList) && (awardList as any) ? (
          <Wrapper title={titleNameMap.awardList || <FormattedMessage id="更多信息" />} className="section section-award" color={theme.color}>
            {(awardList as any)?.award_desc_isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: (awardList as any).award_desc || '' }} />
            ) : (
              <div>{(awardList as any)?.award_desc || ''}</div>
            )}
          </Wrapper>
        ) : null;
      case 'honorList':
        return !(hiddenMap && hiddenMap.honorList) && honorList && (
          Array.isArray(honorList) ? honorList.length > 0 : (honorList as any).honor_desc
        ) ? (
          <Wrapper title={titleNameMap.honorList || "荣誉奖项"} className="experience" color={theme.color}>
            {Array.isArray(honorList) ? honorList.map((honor, idx) => {
              return (
                <div key={idx.toString()}>
                  <TrophyFilled style={{ color: '#ffc107', marginRight: '8px' }} />
                  {honor?.honor_info_isHtml ? (
                    <span
                      className="info-name"
                      dangerouslySetInnerHTML={{ __html: honor.honor_info || '' }}
                    />
                  ) : (
                    <span className="info-name">{honor.honor_info}</span>
                  )}
                  {honor?.honor_time_isHtml ? (
                    <span
                      className="sub-info honor-time"
                      dangerouslySetInnerHTML={{ __html: honor.honor_time || '' }}
                    />
                  ) : honor.honor_time ? (
                    <span className="sub-info honor-time">({honor.honor_time})</span>
                  ) : null}
                </div>
              );
            }) : (
              <div>
                {(honorList as any).honor_desc_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: (honorList as any).honor_desc || '' }} />
                ) : (
                  <span>{(honorList as any).honor_desc}</span>
                )}
              </div>
            )}
          </Wrapper>
        ) : null;
      case 'studentWorkList':
        return !(hiddenMap && hiddenMap.studentWorkList) && studentWorkList && (
          Array.isArray(studentWorkList) ? studentWorkList.length > 0 : (studentWorkList as any).student_work_desc
        ) ? (
          <Wrapper title={titleNameMap.studentWorkList || "学生工作"} className="experience" color={theme.color}>
            {Array.isArray(studentWorkList) ? studentWorkList.map((work, idx) => {
              return (
                <div key={idx.toString()}>
                  <div>
                    <CrownFilled style={{ color: '#ffc107', marginRight: '8px' }} />
                    <b className="info-name">{work.student_work_name}</b>
                  </div>
                  {work.student_work_desc && <div>{work.student_work_desc}</div>}
                </div>
              );
            }) : (
              <div>
                {(studentWorkList as any).student_work_desc_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: (studentWorkList as any).student_work_desc || '' }} />
                ) : (
                  <span>{(studentWorkList as any).student_work_desc}</span>
                )}
              </div>
            )}
          </Wrapper>
        ) : null;
      case 'workExpList':
        return !(hiddenMap && hiddenMap.workExpList) && workExpList && workExpList.length > 0 ? (
          <Wrapper title={titleNameMap.workExpList} className="experience" color={theme.color}>
            <div className="section section-work-exp">
              {_.map(workExpList, (work, idx) => {
                const [start = null, end = null] =
                  typeof work.work_time === 'string' ? `${work.work_time || ''}`.split(',') : work.work_time;
                return work ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {work.company_name}
                        <span className="sub-info">{work.department_name}</span>
                      </b>
                      <span className="info-time">
                        {start}
                        {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                      </span>
                    </div>
                    <div className="work-description">{work.work_desc}</div>
                  </div>
                ) : null;
              })}
            </div>
          </Wrapper>
        ) : null;
      case 'projectList':
        return !(hiddenMap && hiddenMap.projectList) && projectList && projectList.length > 0 ? (
          <Wrapper title={titleNameMap.projectList} className="skill" color={theme.color}>
            <div className="section section-project">
              {_.map(projectList, (project, idx) =>
                project ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {project.project_name}
                        <span className="info-time">{project.project_time}</span>
                      </b>
                      {project.project_role && <Tag color={theme.tagColor}>{project.project_role}</Tag>}
                    </div>
                    {/* 新增：参与度进度条（安全解析与钳制） */}
                    {(() => {
                      const raw = project?.participation_percent;
                      const num = typeof raw === 'string' ? parseFloat(raw) : raw;
                      const isValid = Number.isFinite(num as number);
                      const percent = isValid ? Math.max(0, Math.min(100, Number(num))) : null;
                      return percent !== null ? (
                        <div className="section-detail" style={{ marginTop: 8 }}>
                          <span><FormattedMessage id="参与度" />：{percent}%</span>
                          <div style={{ width: '85%', margin: '6px auto 0' }}>
                            <Progress percent={percent} size="small" showInfo={false} />
                          </div>
                        </div>
                      ) : null;
                    })()}
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="项目描述" />：
                      </span>
                      <span>{project.project_desc}</span>
                    </div>
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="主要工作" />：
                      </span>
                      <span className="project-content">{project.project_content}</span>
                    </div>
                    {project.project_tech_stack && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="技术栈" />：
                        </span>
                        <span className="project-tech-stack">
                          {project.project_tech_stack_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: project.project_tech_stack || '' }} />
                          ) : (
                            project.project_tech_stack
                          )}
                        </span>
                      </div>
                    )}
                    {project.project_achievement && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="取得成果" />：
                        </span>
                        <span className="project-achievement">
                          {project.project_achievement_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: project.project_achievement || '' }} />
                          ) : (
                            project.project_achievement
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </Wrapper>
        ) : null;
      case 'researchList':
        return !(hiddenMap && hiddenMap.researchList) && researchList && researchList.length > 0 ? (
          <Wrapper title={titleNameMap?.researchList || "科研经历"} className="experience" color={theme.color}>
            <div className="section section-research">
              {_.map(researchList, (research, idx) =>
                research ? (
                  <div className="section-item" key={idx.toString()}>
                    <div className="section-info">
                      <b className="info-name">
                        {research?.research_name_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_name || '' }} />
                        ) : (
                          research.research_name
                        )}
                        <span className="info-time">
                          {research?.research_time_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_time || '' }} />
                          ) : (
                            research.research_time
                          )}
                        </span>
                      </b>
                      {research.research_role && (
                        <Tag color={theme.tagColor}>
                          {research?.research_role_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_role || '' }} />
                          ) : (
                            research.research_role
                          )}
                        </Tag>
                      )}
                    </div>
                    {(() => {
                      const raw = research?.participation_percent;
                      const num = typeof raw === 'string' ? parseFloat(raw) : raw;
                      const isValid = Number.isFinite(num as number);
                      const percent = isValid ? Math.max(0, Math.min(100, Number(num))) : null;
                      return percent !== null ? (
                        <div className="section-detail" style={{ marginTop: 8 }}>
                          <span><FormattedMessage id="参与度" />：{percent}%</span>
                          <div style={{ width: '85%', margin: '6px auto 0' }}>
                            <Progress percent={percent} size="small" showInfo={false} />
                          </div>
                        </div>
                      ) : null;
                    })()}
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="项目概述" />：
                      </span>
                      <span>
                        {research?.research_desc_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_desc || '' }} />
                        ) : (
                          research.research_desc
                        )}
                      </span>
                    </div>
                    <div className="section-detail">
                      <span>
                        <FormattedMessage id="本人工作" />：
                      </span>
                      <span className="research-content">
                        {research?.research_content_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_content || '' }} />
                        ) : (
                          research.research_content
                        )}
                      </span>
                    </div>
                    {research.research_achievement && (
                      <div className="section-detail">
                        <span>
                          <FormattedMessage id="取得成果" />：
                        </span>
                        <span className="research-achievement">
                          {research?.research_achievement_isHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: research.research_achievement || '' }} />
                          ) : (
                            research.research_achievement
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </Wrapper>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="template2-resume resume-content">
      <div className="basic-info">
        {/* 头像 + 个人信息 */}
        {!hiddenMap?.profile && (
          <div className="profile">
            {/* 头像 + 个人信息，这部分保持不参与模块排序 */}
            <div className="profile-info">
              {/* 个人信息内容 */}
              {profile.name && <div className="name">{profile.name}</div>}
              {/* 只保留：电话、邮箱、出生年月、政治面貌 */}
              <div className="profile-list">
                {profile.mobile && (
                  <div className="phone">
                    <PhoneFilled style={{ color: theme.color, marginRight: '8px' }} />
                    <span>联系方式：{profile.mobile}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="email">
                    <MailFilled style={{ color: theme.color, marginRight: '8px' }} />
                    <span>电子邮件：{profile.email}</span>
                  </div>
                )}
                {profile.birth_date && (
                  <div className="birth-date">
                    <ScheduleFilled style={{ color: theme.color, marginRight: '8px' }} />
                    <span>出生年月：{profile.birth_date}</span>
                  </div>
                )}
                {profile.political_status && (
                  <div className="political-status">
                    <CrownFilled style={{ color: theme.color, marginRight: '8px' }} />
                    <span>政治面貌：{profile.political_status}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 头像 */}
            {!value?.avatar?.hidden && (
              <Avatar
                avatarSrc={value?.avatar?.src}
                className="avatar"
                shape={value?.avatar?.shape}
                size={value?.avatar?.size}
              />
            )}
          </div>
        )}

        {/* 左侧区域按排序渲染（使用通用渲染函数） */}
        {orderBasic.map(key => renderSection(key))}
      </div>

      <div className="main-info">
        {/* 右侧区域按排序渲染（使用通用渲染函数） */}
        {orderMain.map(key => renderSection(key))}
      </div>
    </div>
  );
};
