import React from 'react';
import _ from 'lodash-es';
import {
  BankFilled,
  BookFilled,
  ExperimentFilled,
  GithubFilled,
  IdcardFilled,
  MailFilled,
  MedicineBoxFilled,
  PhoneFilled,
  ProjectFilled,
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
  variant?: 'official' | 'classic';
};

type SectionProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const ASSET_BASE = '/sdfmu-template';

const TEXT = {
  resume: 'RESUME',
  school: '\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\uff08\u5c71\u4e1c\u7701\u533b\u5b66\u79d1\u5b66\u9662\uff09',
  schoolEn:
    'Shandong First Medical University & Shandong Academy of Medical Sciences',
  profile: '\u4e2a\u4eba\u4fe1\u606f',
  name: '\u59d3\u540d',
  position: '\u6c42\u804c\u65b9\u5411',
  birth: '\u51fa\u751f\u5e74\u6708',
  political: '\u653f\u6cbb\u9762\u8c8c',
  workExp: '\u5de5\u4f5c\u7ecf\u9a8c',
  city: '\u671f\u671b\u57ce\u5e02',
  present: '\u81f3\u4eca',
  techStack: '\u6280\u672f\u6808\uff1a',
  education: '\u6559\u80b2\u80cc\u666f',
  research: '\u79d1\u7814\u6210\u679c',
  projects: '\u9879\u76ee\u7ecf\u5386',
  work: '\u5de5\u4f5c\u7ecf\u5386',
  skills: '\u6280\u80fd\u7279\u957f',
  about: '\u81ea\u6211\u4ecb\u7ecd',
  honors: '\u8363\u8a89\u5956\u9879',
  competition: '\u7ade\u8d5b\u5956\u9879',
  studentWork: '\u5b66\u751f\u5de5\u4f5c',
  awards: '\u66f4\u591a\u4fe1\u606f',
  works: '\u4f5c\u54c1\u5c55\u793a',
};

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function hasText(value?: string | number | null): boolean {
  return value !== undefined && value !== null && `${value}`.trim().length > 0;
}

function splitLines(value?: string): string[] {
  return `${value || ''}`
    .split(/\r?\n|\\n|<br\s*\/?>/gi)
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
        className="sdfmu-rich-text"
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
    return [start, end || TEXT.present].filter(Boolean).join(' - ');
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
    <section className={`sdfmu-section ${className || ''}`}>
      <div className="sdfmu-section-title">
        <span className="sdfmu-section-icon">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="sdfmu-section-body">{children}</div>
    </section>
  );
};

export const SdfmuTemplate: React.FC<Props> = props => {
  const { value } = props;
  const isClassic = props.variant === 'classic';
  const sectionIconStyle = { color: isClassic ? '#155199' : '#801879' };
  const profile: any = _.get(value, 'profile') || {};
  const hiddenMap: any = _.get(value, 'moduleHiddenMap', {}) || {};
  const titleNameMap =
    _.get(value, 'titleNameMap') ||
    getDefaultTitleNameMap({
      intl: { formatMessage: ({ id }) => id },
    });

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

  const positionTitle = profile.positionTitle || profile.job_title;
  const contactItems = [
    profile.mobile && {
      icon: <PhoneFilled />,
      text: profile.mobile,
    },
    profile.email && {
      icon: <MailFilled />,
      text: profile.email,
    },
    profile.github && {
      icon: <GithubFilled />,
      text: profile.github,
    },
  ].filter(Boolean) as Array<{ icon: React.ReactNode; text: string }>;

  const profileRows = [
    { label: TEXT.birth, value: profile.birth_date },
    { label: TEXT.political, value: profile.political_status },
    { label: TEXT.workExp, value: profile.workExpYear },
    { label: TEXT.city, value: profile.workPlace },
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
    <div
      className={`sdfmu-resume resume-content ${
        isClassic ? 'sdfmu-resume-classic' : 'sdfmu-resume-official'
      }`}
    >
      <header className="sdfmu-header">
        <div className="sdfmu-header-band" />
        <div className="sdfmu-logo-panel">
          <img
            className="sdfmu-header-logo"
            src={`${ASSET_BASE}/images/sdfmu-logo-horizontal.png`}
            alt={TEXT.school}
          />
        </div>
        <div className="sdfmu-header-caption">
          <span>{TEXT.resume}</span>
          <strong>{TEXT.schoolEn}</strong>
        </div>
      </header>

      {watermarkVisible && (
        <img
          className="sdfmu-watermark"
          src={`${ASSET_BASE}/images/sdfmu-emblem.png`}
          alt=""
        />
      )}

      <main className="sdfmu-main">
        {!hiddenMap.profile && (
          <section className="sdfmu-profile">
            <div className="sdfmu-profile-main">
              <span className="sdfmu-profile-kicker">{TEXT.resume}</span>
              <h1>{profile.name || TEXT.resume}</h1>
              {hasText(positionTitle) && <p>{positionTitle}</p>}
              <div className="sdfmu-contact-strip">
                {contactItems.map((item, index) => (
                  <span key={`${item.text}-${index}`}>
                    {item.icon}
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {!value?.avatar?.hidden && (
              <div className="sdfmu-photo">
                {value?.avatar?.src ? (
                  <img src={value.avatar.src} alt={profile.name || 'avatar'} />
                ) : (
                  <IdcardFilled />
                )}
              </div>
            )}
          </section>
        )}

        {!hiddenMap.profile && profileRows.length > 0 && (
          <Section
            title={titleNameMap.profile || TEXT.profile}
            icon={<BankFilled style={sectionIconStyle} />}
            className="sdfmu-profile-section"
          >
            <div className="sdfmu-profile-grid">
              {profileRows.map(item => (
                <div className="sdfmu-profile-field" key={item.label}>
                  <b>{item.label}</b>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {hasEducation && (
          <Section
            title={titleNameMap.educationList || TEXT.education}
            icon={<BookFilled style={sectionIconStyle} />}
          >
            <div className="sdfmu-plain-block">
              {renderHtmlText(
                educationList.education_desc,
                educationList.education_desc_isHtml
              )}
            </div>
          </Section>
        )}

        {hasResearch && (
          <Section
            title={titleNameMap.researchList || TEXT.research}
            icon={<ExperimentFilled style={sectionIconStyle} />}
          >
            {researchList.map((research, index) => (
              <div
                className="sdfmu-item"
                key={`${research.research_name}-${index}`}
              >
                <div className="sdfmu-item-heading">
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
                  <div className="sdfmu-item-subtitle">
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

        {hasProjects && (
          <Section
            title={titleNameMap.projectList || TEXT.projects}
            icon={<ProjectFilled style={sectionIconStyle} />}
          >
            {projectList.map((project, index) => (
              <div className="sdfmu-item" key={`${project.project_name}-${index}`}>
                <div className="sdfmu-item-heading">
                  <b>
                    {renderHtmlText(
                      project.project_name,
                      project.project_name_isHtml
                    )}
                  </b>
                  {hasText(project.project_time) && (
                    <span>
                      {renderHtmlText(
                        project.project_time,
                        project.project_time_isHtml
                      )}
                    </span>
                  )}
                </div>
                {hasText(project.project_role) && (
                  <div className="sdfmu-item-subtitle">
                    {renderHtmlText(
                      project.project_role,
                      project.project_role_isHtml
                    )}
                  </div>
                )}
                {renderBullets(project.project_desc, project.project_desc_isHtml)}
                {renderBullets(
                  project.project_content,
                  project.project_content_isHtml
                )}
                {hasText(project.project_tech_stack) && (
                  <p>
                    <b>{TEXT.techStack}</b>
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
          </Section>
        )}

        {hasWorkExp && (
          <Section
            title={titleNameMap.workExpList || TEXT.work}
            icon={<MedicineBoxFilled style={sectionIconStyle} />}
          >
            {workExpList.map((work, index) => (
              <div className="sdfmu-item" key={`${work.company_name}-${index}`}>
                <div className="sdfmu-item-heading">
                  <b>
                    {renderHtmlText(work.company_name, work.company_name_isHtml)}
                  </b>
                  {hasText(getTimeRange(work.work_time)) && (
                    <span>{getTimeRange(work.work_time)}</span>
                  )}
                </div>
                {hasText(work.department_name) && (
                  <div className="sdfmu-item-subtitle">
                    {renderHtmlText(
                      work.department_name,
                      work.department_name_isHtml
                    )}
                  </div>
                )}
                {renderBullets(work.work_desc, work.work_desc_isHtml)}
              </div>
            ))}
          </Section>
        )}

        <div className="sdfmu-two-columns">
          {hasSkills && (
            <Section
              title={titleNameMap.skillList || TEXT.skills}
              icon={<ToolFilled style={sectionIconStyle} />}
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
              title={titleNameMap.aboutme || TEXT.about}
              icon={<StarFilled style={sectionIconStyle} />}
            >
              {renderBullets(aboutme.aboutme_desc, aboutme.aboutme_isHtml)}
            </Section>
          )}
        </div>

        <div className="sdfmu-two-columns">
          {hasHonors && (
            <Section
              title={titleNameMap.honorList || TEXT.honors}
              icon={<TrophyFilled style={sectionIconStyle} />}
            >
              {renderBullets(honorList.honor_desc, honorList.honor_desc_isHtml)}
            </Section>
          )}

          {hasCompetitionAwards && (
            <Section
              title={titleNameMap.competitionAwardList || TEXT.competition}
              icon={<TrophyFilled style={sectionIconStyle} />}
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
            title={titleNameMap.workList || TEXT.works}
            icon={<ProjectFilled style={sectionIconStyle} />}
          >
            {workList.map((work, index) => (
              <div className="sdfmu-item" key={`${work.work_name}-${index}`}>
                <div className="sdfmu-item-heading">
                  <b>{renderHtmlText(work.work_name, work.work_name_isHtml)}</b>
                </div>
                {renderBullets(work.work_desc, work.work_desc_isHtml)}
              </div>
            ))}
          </Section>
        )}

        {hasStudentWork && (
          <Section
            title={titleNameMap.studentWorkList || TEXT.studentWork}
            icon={<ProjectFilled style={sectionIconStyle} />}
          >
            {renderBullets(
              studentWorkList.student_work_desc,
              studentWorkList.student_work_desc_isHtml
            )}
          </Section>
        )}

        {hasAwards && (
          <Section
            title={titleNameMap.awardList || TEXT.awards}
            icon={<StarFilled style={sectionIconStyle} />}
          >
            {renderBullets(awardList.award_desc, awardList.award_desc_isHtml)}
          </Section>
        )}
      </main>

      <div className="sdfmu-footer" role="contentinfo">
        <div className="sdfmu-footer-title">{TEXT.school}</div>
        <div className="sdfmu-footer-contact">
          {contactItems.map((item, index) => (
            <span key={`${item.text}-${index}`}>
              {item.icon}
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SdfmuClassicTemplate: React.FC<Props> = props => (
  <SdfmuTemplate {...props} variant="classic" />
);
