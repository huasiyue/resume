/** 简历配置内容 */
export type ResumeConfig = {
  /** 头像 */
  avatar?: {
    src?: string;
    shape?: string;
    size?: string;
    hidden?: boolean;
  };

  /** 个人信息 */
  profile?: {
    name: string;
    mobile?: string;
    email?: string;
    github?: string;
    zhihu?: string;
    /** 工作经验 xx 年 */
    workExpYear?: string;
    /** 期望工作地 */
    workPlace?: string;
    /** 职位 */
    positionTitle?: string;

    job_title?: string; // 添加这一行
    birth_date?: string; // 新增：出生年月
    political_status?: string; // 新增：政治面貌

    /** HTML 模式开关 */
    name_isHtml?: boolean;
    mobile_isHtml?: boolean;
    email_isHtml?: boolean;
    github_isHtml?: boolean;
    zhihu_isHtml?: boolean;
    workExpYear_isHtml?: boolean;
    workPlace_isHtml?: boolean;
    positionTitle_isHtml?: boolean;
  };

  /** 标题名称映射 */
  titleNameMap?: {
    /** 默认: 教育背景 */
    educationList?: string;
    /** 默认: 工作经历 */
    workExpList?: string;
    /** 默认: 项目经历 */
    projectList?: string;
    /** 默认: 科研经历 */
    researchList?: string;
    /** 默认: 个人技能 */
    skillList?: string;
    /** 默认: 更多信息 */
    awardList?: string;
    /** 默认: 荣誉奖项 */
    honorList?: string;
    /** 默认: 竞赛奖项 */
    competitionAwardList?: string;
    /** 默认: 作品 */
    workList?: string;
    /** 默认: 学生工作 */
    studentWorkList?: string;
    /** 自我介绍 */
    aboutme?: string;
  };

  /** 模块显示/隐藏映射：true 表示隐藏 */
  moduleHiddenMap?: {
    [moduleKey: string]: boolean;
  };

  /** 模块排序（Template2 两列布局） */
  moduleOrderBasic?: string[]; // 左列（basic-info）：educationList, workList, aboutme, skillList, awardList
  moduleOrderMain?: string[];  // 右列（main-info）：workExpList, projectList

  /** 教育背景：单文本 */
  educationList?: {
    /** 单文本描述 */
    education_desc?: string;
    /** HTML 模式开关 */
    education_desc_isHtml?: boolean;
  };

  /** 工作经历 */
  workExpList?: Array<{
    company_name: string;
    department_name: string;
    work_time?: [string | undefined, string | number];
    work_desc: string;

    /** HTML 模式开关 */
    company_name_isHtml?: boolean;
    department_name_isHtml?: boolean;
    work_desc_isHtml?: boolean;
  }>;

  /** 项目经历 */
  projectList?: Array<{
    /** 项目名称 */
    project_name: string;
    /** 担任角色 */
    project_role: string;
    /** 描述 */
    project_desc?: string;
    /** 项目内容，负责内容 */
    project_content?: string;
    /** 项目时间 */
    project_time?: string;
    /** 技术栈 */
    project_tech_stack?: string;
    /** 取得成果 */
    project_achievement?: string;

    /** HTML 模式开关 */
    project_name_isHtml?: boolean;
    project_role_isHtml?: boolean;
    project_desc_isHtml?: boolean;
    project_content_isHtml?: boolean;
    project_time_isHtml?: boolean;
    project_tech_stack_isHtml?: boolean;
    project_achievement_isHtml?: boolean;
    /** 参与度（百分比） */
    participation_percent?: number;
  }>;

  /** 科研经历 */
  researchList?: Array<{
    /** 科研项目名称 */
    research_name: string;
    /** 担任角色 */
    research_role: string;
    /** 描述 */
    research_desc?: string;
    /** 科研内容，负责内容 */
    research_content?: string;
    /** 科研时间 */
    research_time?: string;
    research_achievement?: string;

    /** HTML 模式开关 */
    research_name_isHtml?: boolean;
    research_role_isHtml?: boolean;
    research_desc_isHtml?: boolean;
    research_content_isHtml?: boolean;
    research_time_isHtml?: boolean;
    research_achievement_isHtml?: boolean;
    /** 参与度（百分比） */
    participation_percent?: number;
  }>;
  /** 个人技能 */
  skillList?: {
    /** 单文本描述（新模式） */
    skill_desc: string;
    /** HTML 模式开关 */
    skill_desc_isHtml?: boolean;
  };
  /** 更多信息：单文本模式 */
  awardList?: {
      award_desc?: string;
      award_desc_isHtml?: boolean;
  };

  /** 竞赛奖项：单文本模式 */
  competitionAwardList?: {
      competition_award_desc?: string;
      competition_award_desc_isHtml?: boolean;
  };

  /** 荣誉奖项 */
  honorList?: {
    honor_desc?: string;
    /** HTML 模式开关 */
    honor_desc_isHtml?: boolean;
  };

  /** 作品 */
  workList?: Array<{
    work_name?: string;
    work_desc?: string;
    // visit_link?: string;

    /** HTML 模式开关 */
    work_name_isHtml?: boolean;
    work_desc_isHtml?: boolean;
    visit_link_isHtml?: boolean;
  }>;

  /** 学生工作 */
  studentWorkList?: {
    student_work_desc?: string;
    /** HTML 模式开关 */
    student_work_desc_isHtml?: boolean;
  };
  /** 自我介绍 */
  aboutme?: {
    aboutme_desc: string;
    /** 按 HTML 渲染自我介绍 */
    aboutme_isHtml?: boolean;
  };

  /** 增加国际化 */
  locales?: {
    [key: string]: ResumeConfig;
  };

  template?: string;
};

/**
 * 主题配置，暂时只支持主题色
 */
export type ThemeConfig = {
  /** 主题色 */
  color: string;
  /** Tag 标签色 */
  tagColor: string;
};
