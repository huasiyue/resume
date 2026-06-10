import React from 'react';
import _ from 'lodash-es';
import {
  ExperimentFilled,
  GithubFilled,
  IdcardFilled,
  MailFilled,
  PhoneFilled,
  ProjectFilled,
  ReadFilled,
  StarFilled,
  ToolFilled,
  TrophyFilled,
} from '@ant-design/icons';
import { getDefaultTitleNameMap } from '@/data/constant';
import type { ResumeConfig, ThemeConfig } from '../../types';
import './index.less';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

type SectionProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const ASSET_BASE = '/nbu-template';
const SECTION_ICON_STYLE = { color: '#9c272d' };

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function hasText(value?: string | number | null): boolean {
  return value !== undefined && value !== null && `${value}`.trim().length > 0;
}

function splitLines(value?: string): string[] {
  return `${value || ''}`
    .split(/\r?\n|；|;/)
    .map(item => item.trim())
    .filter(Boolean);
}

function renderHtmlText(value?: string, isHtml?: boolean) {
  if (!hasText(value)) return null;
  if (isHtml) {
    return <span dangerouslySetInnerHTML={{ __html: value || '' }} />;
  }
  return <span>{value}</span>;
}

function renderBullets(value?: string, isHtml?: boolean) {
  if (!hasText(value)) return null;
  if (isHtml) {
    return (
      <div
        className="nbu-rich-text"
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    );
  }

  const lines = splitLines(value);
  if (lines.length <= 1) return <p>{value}</p>;

  return (
    <ul>
      {lines.map((line, index) => (
        <li key={`${line}-${index}`}>{line}</li>
      ))}
    </ul>
  );
}

function getTimeRange(value: any): string {
  if (Array.isArray(value)) {
    const [start, end] = value;
    return [start, end || '至今'].filter(Boolean).join(' - ');
  }
  return value || '';
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  className,
  children,
}) => {
  if (!children) return null;

  return (
    <section className={`nbu-section ${className || ''}`}>
      <div className="nbu-section-title">
        <span className="nbu-section-icon">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="nbu-section-body">{children}</div>
    </section>
  );
};

export const NbuTemplate: React.FC<Props> = props => {
  const { value } = props;
  const profile: any = _.get(value, 'profile') || {};
  const hiddenMap: any = _.get(value, 'moduleHiddenMap', {}) || {};
  const titleNameMap =
    _.get(value, 'titleNameMap') || getDefaultTitleNameMap({ intl: { formatMessage: ({ id }) => id } });

  const educationList: any = _.get(value, 'educationList');
  const workExpList: any[] = asArray(_.get(value, 'workExpList'));
  const projectList: any[] = asArray(_.get(value, 'projectList'));
  const researchList: any[] = asArray(_.get(value, 'researchList'));
  const workList: any[] = asArray(_.get(value, 'workList'));
  const skillList: any = _.get(value, 'skillList');
  const awardList: any = _.get(value, 'awardList');
  const honorList: any = _.get(value, 'honorList');
  const competitionAwardList: any = _.get(value, 'competitionAwardList');
  const studentWorkList: any = _.get(value, 'studentWorkList');
  const aboutme: any = _.get(value, 'aboutme');

  const contactItems = [
    profile.email && {
      icon: <MailFilled />,
      text: profile.email,
    },
    profile.mobile && {
      icon: <PhoneFilled />,
      text: profile.mobile,
    },
    profile.github && {
      icon: <GithubFilled />,
      text: profile.github,
    },
  ].filter(Boolean) as Array<{ icon: React.ReactNode; text: string }>;

  const profileRows = [
    { label: '姓名', value: profile.name },
    { label: '求职方向', value: profile.positionTitle || profile.job_title },
    { label: '出生年月', value: profile.birth_date },
    { label: '政治面貌', value: profile.political_status },
    { label: '工作经验', value: profile.workExpYear },
    { label: '期望城市', value: profile.workPlace },
  ].filter(item => hasText(item.value));

  const hasEducation =
    !hiddenMap.educationList && hasText(educationList?.education_desc);
  const hasResearch = !hiddenMap.researchList && researchList.length > 0;
  const hasProjects = !hiddenMap.projectList && projectList.length > 0;
  const hasWorkExp = !hiddenMap.workExpList && workExpList.length > 0;
  const hasSkills =
    !hiddenMap.skillList &&
    (Array.isArray(skillList)
      ? skillList.length > 0
      : hasText(skillList?.skill_desc));
  const hasAbout = !hiddenMap.aboutme && hasText(aboutme?.aboutme_desc);
  const hasWorkList = !hiddenMap.workList && workList.length > 0;
  const hasAwards = !hiddenMap.awardList && hasText(awardList?.award_desc);
  const hasHonors = !hiddenMap.honorList && hasText(honorList?.honor_desc);
  const hasCompetitionAwards =
    !hiddenMap.competitionAwardList &&
    hasText(competitionAwardList?.competition_award_desc);
  const hasStudentWork =
    !hiddenMap.studentWorkList && hasText(studentWorkList?.student_work_desc);
  const watermarkVisible =
    _.get(value, ['templateOptions', 'watermarkVisible']) !== false;

  return (
    <div className="nbu-resume resume-content">
      <header className="nbu-header">
        <img
          className="nbu-header-pattern"
          src={`${ASSET_BASE}/images/head.png`}
          alt=""
        />
        <img
          className="nbu-header-logo"
          src={`${ASSET_BASE}/images/nbu_logo.png`}
          alt="Ningbo University"
        />
        <div className="nbu-school">
          宁波大学 | Ningbo University
        </div>
      </header>

      {watermarkVisible && (
        <img
          className="nbu-watermark"
          src={`${ASSET_BASE}/images/nbu_logo2.png`}
          alt=""
        />
      )}

      <main className="nbu-main">
        {!hiddenMap.profile && (
          <section className="nbu-profile">
            <div className="nbu-profile-content">
              <Section
                title={titleNameMap.profile || '个人信息'}
                icon={<IdcardFilled style={SECTION_ICON_STYLE} />}
                className="nbu-profile-section"
              >
                <div className="nbu-profile-grid">
                  {profileRows.map(item => (
                    <div className="nbu-profile-field" key={item.label}>
                      <b>{item.label}</b>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {!value?.avatar?.hidden && (
              <div className="nbu-photo">
                {value?.avatar?.src ? (
                  <img src={value.avatar.src} alt={profile.name || 'avatar'} />
                ) : (
                  <IdcardFilled />
                )}
              </div>
            )}
          </section>
        )}

        {hasEducation && (
          <Section
            title={titleNameMap.educationList}
            icon={<ReadFilled style={SECTION_ICON_STYLE} />}
          >
            <div className="nbu-plain-block">
              {renderHtmlText(
                educationList.education_desc,
                educationList.education_desc_isHtml
              )}
            </div>
          </Section>
        )}

        {hasResearch && (
          <Section
            title={titleNameMap.researchList || '科研成果'}
            icon={<ExperimentFilled style={SECTION_ICON_STYLE} />}
          >
            {researchList.map((research, index) => (
              <div className="nbu-item" key={`${research.research_name}-${index}`}>
                <div className="nbu-item-heading">
                  <b>
                    {renderHtmlText(
                      research.research_name,
                      research.research_name_isHtml
                    )}
                  </b>
                  {hasText(research.research_time) && (
                    <span>
                      {renderHtmlText(
                        research.research_time,
                        research.research_time_isHtml
                      )}
                    </span>
                  )}
                </div>
                {hasText(research.research_role) && (
                  <div className="nbu-item-subtitle">
                    {renderHtmlText(
                      research.research_role,
                      research.research_role_isHtml
                    )}
                  </div>
                )}
                {renderBullets(
                  research.research_desc,
                  research.research_desc_isHtml
                )}
                {renderBullets(
                  research.research_content,
                  research.research_content_isHtml
                )}
                {renderBullets(
                  research.research_achievement,
                  research.research_achievement_isHtml
                )}
              </div>
            ))}
          </Section>
        )}

        {(hasProjects || hasWorkExp) && (
          <Section
            title={hasProjects ? titleNameMap.projectList : titleNameMap.workExpList}
            icon={<ProjectFilled style={SECTION_ICON_STYLE} />}
          >
            {projectList.map((project, index) => (
              <div className="nbu-item" key={`${project.project_name}-${index}`}>
                <div className="nbu-item-heading">
                  <b>{renderHtmlText(project.project_name, project.project_name_isHtml)}</b>
                  {hasText(project.project_time) && (
                    <span>
                      {renderHtmlText(project.project_time, project.project_time_isHtml)}
                    </span>
                  )}
                </div>
                {hasText(project.project_role) && (
                  <div className="nbu-item-subtitle">
                    {renderHtmlText(project.project_role, project.project_role_isHtml)}
                  </div>
                )}
                {renderBullets(project.project_desc, project.project_desc_isHtml)}
                {renderBullets(project.project_content, project.project_content_isHtml)}
                {hasText(project.project_tech_stack) && (
                  <p>
                    <b>技术栈：</b>
                    {renderHtmlText(
                      project.project_tech_stack,
                      project.project_tech_stack_isHtml
                    )}
                  </p>
                )}
                {renderBullets(
                  project.project_achievement,
                  project.project_achievement_isHtml
                )}
              </div>
            ))}

            {workExpList.map((work, index) => (
              <div className="nbu-item" key={`${work.company_name}-${index}`}>
                <div className="nbu-item-heading">
                  <b>{renderHtmlText(work.company_name, work.company_name_isHtml)}</b>
                  {hasText(getTimeRange(work.work_time)) && (
                    <span>{getTimeRange(work.work_time)}</span>
                  )}
                </div>
                {hasText(work.department_name) && (
                  <div className="nbu-item-subtitle">
                    {renderHtmlText(work.department_name, work.department_name_isHtml)}
                  </div>
                )}
                {renderBullets(work.work_desc, work.work_desc_isHtml)}
              </div>
            ))}
          </Section>
        )}

        <div className="nbu-two-columns">
          {hasSkills && (
            <Section
              title={titleNameMap.skillList}
              icon={<ToolFilled style={SECTION_ICON_STYLE} />}
            >
              {Array.isArray(skillList) ? (
                <ul>
                  {skillList.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                renderBullets(skillList.skill_desc, skillList.skill_desc_isHtml)
              )}
            </Section>
          )}

          {hasAbout && (
            <Section
              title={titleNameMap.aboutme}
              icon={<StarFilled style={SECTION_ICON_STYLE} />}
            >
              {renderBullets(aboutme.aboutme_desc, aboutme.aboutme_isHtml)}
            </Section>
          )}
        </div>

        <div className="nbu-two-columns">
          {hasHonors && (
            <Section
              title={titleNameMap.honorList}
              icon={<TrophyFilled style={SECTION_ICON_STYLE} />}
            >
              {renderBullets(honorList.honor_desc, honorList.honor_desc_isHtml)}
            </Section>
          )}

          {hasCompetitionAwards && (
            <Section
              title={titleNameMap.competitionAwardList}
              icon={<TrophyFilled style={SECTION_ICON_STYLE} />}
            >
              {renderBullets(
                competitionAwardList.competition_award_desc,
                competitionAwardList.competition_award_desc_isHtml
              )}
            </Section>
          )}
        </div>

        {hasWorkList && (
          <Section
            title={titleNameMap.workList}
            icon={<ProjectFilled style={SECTION_ICON_STYLE} />}
          >
            {workList.map((work, index) => (
              <div className="nbu-item" key={`${work.work_name}-${index}`}>
                <div className="nbu-item-heading">
                  <b>{renderHtmlText(work.work_name, work.work_name_isHtml)}</b>
                </div>
                {renderBullets(work.work_desc, work.work_desc_isHtml)}
              </div>
            ))}
          </Section>
        )}

        {hasStudentWork && (
          <Section
            title={titleNameMap.studentWorkList}
            icon={<ProjectFilled style={SECTION_ICON_STYLE} />}
          >
            {renderBullets(
              studentWorkList.student_work_desc,
              studentWorkList.student_work_desc_isHtml
            )}
          </Section>
        )}

        {hasAwards && (
          <Section
            title={titleNameMap.awardList}
            icon={<StarFilled style={SECTION_ICON_STYLE} />}
          >
            {renderBullets(awardList.award_desc, awardList.award_desc_isHtml)}
          </Section>
        )}
      </main>

      <footer className="nbu-footer">
        <img
          className="nbu-footer-pattern"
          src={`${ASSET_BASE}/images/foot.png`}
          alt=""
        />
        <div className="nbu-contact">
          {contactItems.map((item, index) => (
            <span key={`${item.text}-${index}`}>
              {item.icon}
              {item.text}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};
