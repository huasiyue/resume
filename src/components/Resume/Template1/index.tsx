import React from 'react';
import { Rate, Tag } from 'antd';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  ZhihuCircleFilled,
  TrophyFilled,
  CheckCircleFilled,
  ScheduleFilled,
  CrownFilled,
  EnvironmentFilled,
  HeartFilled,
} from '@ant-design/icons';
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

const wrapper = ({ id, title, color }) => WrappedComponent => {
  return (
    <section>
      <div className="section-header">
        {id && (
          <img src={`images/${id}.png`} alt="" width="26px" height="26px" />
        )}
        <h1 style={{ background: color }}>{title}</h1>
      </div>
      <div className="section-body">{WrappedComponent}</div>
    </section>
  );
};

/**
 * @description 简历内容区
 */
export const Template1: React.FC<Props> = props => {
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

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 更多信息 */
  const awardList = _.get(value, 'awardList');

  /** 作品 */
  const workList = _.get(value, 'workList');

  /** 自我介绍 */
  const aboutmeObj = _.get(value, 'aboutme');
  const aboutmeLines = _.split(_.get(aboutmeObj, 'aboutme_desc'), '\n');

  return (
    <div className="template1-resume resume-content">
      <div className="basic-info">
        {/* 头像 */}
        {!value?.avatar?.hidden && (
          <Avatar
            avatarSrc={value?.avatar?.src}
            className="avatar"
            shape={value?.avatar?.shape}
            size={value?.avatar?.size}
          />
        )}
        {/* 个人信息 */}
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
              <div className="email">
                <MobileFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.mobile_isHtml ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: profile.mobile || '' }}
                  />
                ) : (
                  profile.mobile
                )}
              </div>
            )}
            {profile?.email && (
              <div className="email">
                <MailFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.email_isHtml ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: profile.email || '' }}
                  />
                ) : (
                  profile.email
                )}
              </div>
            )}
            {profile?.github && (
              <div className="github">
                <GithubFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile?.github_isHtml ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: profile.github || '' }}
                  />
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
                  <span
                    dangerouslySetInnerHTML={{ __html: profile.zhihu || '' }}
                  />
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
                      dangerouslySetInnerHTML={{
                        __html: profile.workExpYear || '',
                      }}
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
                      dangerouslySetInnerHTML={{
                        __html: profile.workPlace || '',
                      }}
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
        {/* 自我介绍 */}
        {!!_.trim(_.join(aboutmeLines, '')) && (
          <section className="section section-aboutme">
            <div className="section-title" style={{ color: theme.color }}>
              <FormattedMessage id="自我介绍" />
            </div>
            {aboutmeObj?.aboutme_isHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: aboutmeObj.aboutme_desc }}
              />
            ) : (
              aboutmeLines.map((d, idx) => <div key={`${idx}`}>{d}</div>)
            )}
          </section>
        )}
        {/* 教育背景 */}
        {educationList?.length ? (
          <section className="section section-education">
            <div className="section-title" style={{ color: theme.color }}>
              {titleNameMap?.educationList}
            </div>
            {educationList.map((education, idx) => {
              const [start, end] = education.edu_time;
              return (
                <div key={idx.toString()} className="education-item">
                  <div>
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
                    <span className="sub-info" style={{ float: 'right' }}>
                      {start}
                      {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                    </span>
                  </div>
                  <div>
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
                      <span className="sub-info" style={{ marginLeft: '4px' }}>
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
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}
        {/* 作品 */}
        {workList?.length ? (
          <section className="section section-work">
            <div className="section-title" style={{ color: theme.color }}>
              {titleNameMap?.workList}
            </div>
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
          </section>
        ) : null}
        {/* 专业技能 */}
        {skillList?.length ? (
          <section className="section section-skill">
            <div className="section-title" style={{ color: theme.color }}>
              {titleNameMap?.skillList}
            </div>
            {skillList.map((skill, idx) => {
              return skill ? (
                <React.Fragment key={`${idx}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                    }}
                    key={`${idx}`}
                  >
                    <b className="info-name">
                      {skill?.skill_name_isHtml ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: skill.skill_name || '',
                          }}
                        />
                      ) : (
                        skill.skill_name
                      )}
                    </b>
                    <Rate
                      allowHalf
                      disabled
                      value={skill.skill_level / 20}
                      className="skill-rate"
                    />
                  </div>
                  {skill?.skill_desc_isHtml ? (
                    <div
                      className="skill-detail-item"
                      dangerouslySetInnerHTML={{
                        __html: skill.skill_desc || '',
                      }}
                    />
                  ) : (
                    _.split(skill.skill_desc, '\n').map((d, i2) =>
                      d ? (
                        <div className="skill-detail-item" key={`${i2}`}>
                          <CheckCircleFilled
                            style={{ color: '#ffc107', marginRight: '8px' }}
                          />
                          {d}
                        </div>
                      ) : null
                    )
                  )}
                </React.Fragment>
              ) : null;
            })}
          </section>
        ) : null}
        {/* 更多信息 */}
        {awardList?.length ? (
          <section className="section section-award">
            <div className="section-title" style={{ color: theme.color }}>
              {titleNameMap?.awardList}
            </div>
            {awardList.map((award, idx) => {
              return (
                <div key={idx.toString()}>
                  <TrophyFilled
                    style={{ color: '#ffc107', marginRight: '8px' }}
                  />
                  <b className="info-name">
                    {award?.award_info_isHtml ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: award.award_info || '',
                        }}
                      />
                    ) : (
                      award.award_info
                    )}
                  </b>
                  {award.award_time && (
                    <span className="sub-info award-time">
                      {award?.award_time_isHtml ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: award.award_time || '',
                          }}
                        />
                      ) : (
                        <>({award.award_time})</>
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </section>
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
      </div>
    </div>
  );
};
