import React from 'react';
import { Rate, Tag, Badge, Card, Progress } from 'antd';
import {
  PhoneFilled,
  MailFilled,
  GithubFilled,
  ZhihuCircleFilled,
  TrophyFilled,
  CheckCircleFilled,
  ScheduleFilled,
  EnvironmentFilled,
  HeartFilled,
  CrownFilled,
} from '@ant-design/icons';
import _ from 'lodash-es';
import { FormattedMessage, useIntl } from 'react-intl';
import { getDefaultTitleNameMap } from '@/data/constant';
import type { ResumeConfig, ThemeConfig } from '../../types';
import './index.less';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

const wrapper = ({ id, title, color }) => WrappedComponent => {
  return (
    <section>
      <div className="section-header">
        <h1 style={{ background: color }}>{title}</h1>
      </div>
      <div className="section-body">{WrappedComponent}</div>
    </section>
  );
};

const CardWrapper: React.FC<{
  title: string | JSX.Element;
  className: string;
  color: string;
}> = ({ title, color, className, children }) => {
  return (
    <Badge.Ribbon
      text={<div className="section-title">{title}</div>}
      color={color}
      placement="start"
    >
      <Card className={className}>{children}</Card>
    </Badge.Ribbon>
  );
};

/**
 * @description 简历内容区
 */
export const Template3: React.FC<Props> = props => {
  const intl = useIntl();
  const { value, theme } = props;

  /** 个人基础信息 */
  const profile = _.get(value, 'profile');

  const titleNameMap = _.get(
    value,
    'titleNameMap',
    getDefaultTitleNameMap({ intl })
  );

  /** 教育背景 */
  const educationList = _.get(value, 'educationList');

  /** 工作经历 */
  const workExpList = _.get(value, 'workExpList');

  /** 项目经验 */
  const projectList = _.get(value, 'projectList');
  /** 科研经历 */
  const researchList = _.get(value, 'researchList');

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 更多信息 */
  const awardList = _.get(value, 'awardList');

  /** 作品 */
  const workList = _.get(value, 'workList');

  /** 自我介绍 */
  const aboutme = _.split(_.get(value, ['aboutme', 'aboutme_desc']), '\n');

  return (
    <div className="template3-resume resume-content">
      <div className="basic-info">
        <div className="profile">
          {profile?.name && (
            <div className="name">
              {profile?.name_isHtml ? (
                <span dangerouslySetInnerHTML={{ __html: profile.name || '' }} />
              ) : (
                profile.name
              )}
            </div>
          )}
          <div className="profile-list">
            {profile?.mobile && (
              <div className="mobile">
                <PhoneFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.mobile_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: profile.mobile || '' }} />
                ) : (
                  profile.mobile
                )}
              </div>
            )}
            {profile?.email && (
              <div className="email">
                <MailFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.email_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: profile.email || '' }} />
                ) : (
                  profile.email
                )}
              </div>
            )}
            {profile?.github && (
              <div className="github">
                <GithubFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.github_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: profile.github || '' }} />
                ) : (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      window.open(profile.github);
                    }}
                  >
                    {profile.github}
                  </span>
                )}
              </div>
            )}
            {profile?.zhihu && (
              <div className="github">
                <ZhihuCircleFilled
                  style={{ color: theme.color, opacity: 0.85 }}
                />
                {profile?.zhihu_isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: profile.zhihu || '' }} />
                ) : (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      window.open(profile.zhihu);
                    }}
                  >
                    {profile.zhihu}
                  </span>
                )}
              </div>
            )}
            {profile?.workExpYear && (
              <div className="work-exp-year">
                <ScheduleFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span>
                  <FormattedMessage id="工作经验" />:{' '}
                  {profile?.workExpYear_isHtml ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: profile.workExpYear || '' }}
                    />
                  ) : (
                    profile.workExpYear
                  )}
                </span>
              </div>
            )}
            {profile?.workPlace && (
              <div className="work-place">
                <EnvironmentFilled
                  style={{ color: theme.color, opacity: 0.85 }}
                />
                <span>
                  <FormattedMessage id="期望工作地" />:{' '}
                  {profile?.workPlace_isHtml ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: profile.workPlace || '' }}
                    />
                  ) : (
                    profile.workPlace
                  )}
                </span>
              </div>
            )}
            {profile?.positionTitle && (
              <div className="expect-job">
                <HeartFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span>
                  <FormattedMessage id="职位" />:{' '}
                  {profile?.positionTitle_isHtml ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: profile.positionTitle || '',
                      }}
                    />
                  ) : (
                    profile.positionTitle
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* 教育背景 */}
        {educationList?.length ? (
          <CardWrapper
            title={titleNameMap.educationList}
            className="section section-education"
            color={theme.color}
          >
            {educationList.map((education, idx) => {
              const [start, end] = education.edu_time;
              return (
                <div key={idx.toString()} className="education-item">
                  <div>
                    <span>
                      <b>
                        {education?.school_isHtml ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: education.school || '',
                            }}
                          />
                        ) : (
                          education.school
                        )}
                      </b>
                      <span style={{ marginLeft: '8px' }}>
                        {education.major && (
                          <>
                            {education?.major_isHtml ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: education.major || '',
                                }}
                              />
                            ) : (
                              <span>{education.major}</span>
                            )}
                          </>
                        )}
                        {education.academic_degree && (
                          <span
                            className="sub-info"
                            style={{ marginLeft: '4px' }}
                          >
                            {education?.academic_degree_isHtml ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: education.academic_degree || '',
                                }}
                              />
                            ) : (
                              <>({education.academic_degree})</>
                            )}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="sub-info" style={{ float: 'right' }}>
                      {start}
                      {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardWrapper>
        ) : null}
        {/* 作品 */}
        {workList?.length ? (
          <CardWrapper
            title={titleNameMap.workList}
            className="section section-work"
            color={theme.color}
          >
            {workList.map((work, idx) => {
              return (
                <div key={idx.toString()}>
                  <div>
                    <CrownFilled
                      style={{ color: '#ffc107', marginRight: '8px' }}
                    />
                    <b className="info-name">
                      {work?.work_name_isHtml ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: work.work_name || '',
                          }}
                        />
                      ) : (
                        work.work_name
                      )}
                    </b>
                    {work.visit_link &&
                      (work?.visit_link_isHtml ? (
                        <span
                          className="sub-info"
                          dangerouslySetInnerHTML={{
                            __html: work.visit_link || '',
                          }}
                          style={{ marginLeft: 8 }}
                        />
                      ) : (
                        <a className="sub-info" href={work.visit_link} style={{ marginLeft: 8 }}>
                          <FormattedMessage id="访问链接" />
                        </a>
                      ))}
                  </div>
                  {work?.work_desc_isHtml ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: work.work_desc || '',
                      }}
                    />
                  ) : (
                    work.work_desc && <div>{work.work_desc}</div>
                  )}
                </div>
              );
            })}
          </CardWrapper>
        ) : null}
        <CardWrapper
          title={<FormattedMessage id="自我介绍" />}
          className="section section-aboutme"
          color={theme.color}
        >
          {value?.aboutme?.aboutme_isHtml ? (
            <div
              dangerouslySetInnerHTML={{
                __html: value?.aboutme?.aboutme_desc || '',
              }}
            />
          ) : (
            _.split(value?.aboutme?.aboutme_desc, '\n').map((d, idx) => (
              <div key={`${idx}`}>{d}</div>
            ))
          )}
        </CardWrapper>
        {/* 专业技能 */}
        {skillList?.length ? (
          <CardWrapper
            title={titleNameMap.skillList}
            className="section section-skill"
            color={theme.color}
          >
            {skillList.map((skill, idx) => {
              const skills = _.split(skill.skill_desc, '\n').join('；');
              return (
                <div className="skill-item" key={idx.toString()}>
                  <span>
                    <CheckCircleFilled
                      style={{ color: '#ffc107', marginRight: '8px' }}
                    />
                    {skill?.skill_desc_isHtml ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: skill.skill_desc || '',
                        }}
                      />
                    ) : (
                      skills
                    )}
                  </span>
                  {skill.skill_level && (
                    <Rate
                      allowHalf
                      disabled
                      value={skill.skill_level / 20}
                      className="skill-rate"
                    />
                  )}
                </div>
              );
            })}
          </CardWrapper>
        ) : null}
      </div>
      <div className="main-info">
        {workExpList?.length
          ? wrapper({
              id: 'work-experience',
              title: titleNameMap?.workExpList,
              color: theme.color,
            })(
              <div className="section section-work-exp">
                {_.map(workExpList, (work, idx) => {
                  const [start = null, end = null] =
                    typeof work.work_time === 'string'
                      ? `${work.work_time || ''}`.split(',')
                      : work.work_time;
                  return work ? (
                    <div className="section-item" key={idx.toString()}>
                      <div className="section-info">
                        <b className="info-name">
                          {work?.company_name_isHtml ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: work.company_name || '',
                              }}
                            />
                          ) : (
                            work.company_name
                          )}
                          <span className="sub-info">
                            {work?.department_name_isHtml ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: work.department_name || '',
                                }}
                              />
                            ) : (
                              work.department_name
                            )}
                          </span>
                        </b>
                        <span className="info-time">
                          {start}
                          {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                        </span>
                      </div>
                      {work.work_desc_isHtml ? (
                        <div
                          className="work-description"
                          dangerouslySetInnerHTML={{ __html: work.work_desc }}
                        />
                      ) : (
                        <div className="work-description">{work.work_desc}</div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            )
          : null}

        {projectList?.length
          ? wrapper({
              id: 'skill',
              title: titleNameMap?.projectList,
              color: theme.color,
            })(
              <div className="section section-project">
                {_.map(projectList, (project, idx) =>
                  project ? (
                    <div className="section-item" key={idx.toString()}>
                      <div className="section-info">
                        <b className="info-name">
                          {project?.project_name_isHtml ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: project.project_name || '',
                              }}
                            />
                          ) : (
                            project.project_name
                          )}
                          <span className="info-time">
                            {project?.project_time_isHtml ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: project.project_time || '',
                                }}
                              />
                            ) : (
                              project.project_time
                            )}
                          </span>
                        </b>
                        {project.project_role && (
                          <Tag color={theme.tagColor}>
                            {project?.project_role_isHtml ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: project.project_role || '',
                                }}
                              />
                            ) : (
                              project.project_role
                            )}
                          </Tag>
                        )}
                      </div>
                      {/* 参与度进度条：居中、85% 宽度 */}
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
                        <b>
                          <FormattedMessage id="项目描述" />：
                        </b>
                        {project.project_desc_isHtml ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: project.project_desc || '',
                            }}
                          />
                        ) : (
                          <span>{project.project_desc}</span>
                        )}
                      </div>
                      <div className="section-detail">
                        <b>
                          <FormattedMessage id="主要工作" />：
                        </b>
                        {project.project_content_isHtml ? (
                          <span
                            className="project-content"
                            dangerouslySetInnerHTML={{
                              __html: project.project_content || '',
                            }}
                          />
                        ) : (
                          <span className="project-content">
                            {project.project_content}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )
          : null}

        {/* 新增：科研经历渲染，含参与度进度条 */}
        {researchList?.length
          ? wrapper({
              id: 'research',
              title: titleNameMap?.researchList,
              color: theme.color,
            })(
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

                      {/* 参与度进度条：居中、85% 宽度 */}
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
                        <b><FormattedMessage id="项目概述" />：</b>
                        {research?.research_desc_isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: research.research_desc || '' }} />
                        ) : (
                          <span>{research.research_desc}</span>
                        )}
                      </div>
                      <div className="section-detail">
                        <b><FormattedMessage id="本人工作" />：</b>
                        {research?.research_content_isHtml ? (
                          <span className="research-content" dangerouslySetInnerHTML={{ __html: research.research_content || '' }} />
                        ) : (
                          <span className="research-content">{research.research_content}</span>
                        )}
                      </div>
                      {research.research_achievement && (
                        <div className="section-detail">
                          <b><FormattedMessage id="取得成果" />：</b>
                          {research?.research_achievement_isHtml ? (
                            <span className="research-achievement" dangerouslySetInnerHTML={{ __html: research.research_achievement || '' }} />
                          ) : (
                            <span className="research-achievement">{research.research_achievement}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            )
          : null}
      </div>
    </div>
  );
};
