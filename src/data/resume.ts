import type { ResumeConfig } from '@/components/types';

export const RESUME_INFO: ResumeConfig = {
  titleNameMap: {
    profile: '\u4e2a\u4eba\u4fe1\u606f',
    educationList: '\u6559\u80b2\u80cc\u666f',
    workExpList: '\u5b9e\u4e60\u7ecf\u5386',
    projectList: '\u9879\u76ee\u4e0e\u5b9e\u8df5',
    researchList: '\u79d1\u7814\u7ecf\u5386',
    skillList: '\u6280\u80fd\u7279\u957f',
    awardList: '\u66f4\u591a\u4fe1\u606f',
    workList: '\u4f5c\u54c1\u5c55\u793a',
    aboutme: '\u81ea\u6211\u8bc4\u4ef7',
    honorList: '\u8363\u8a89\u5956\u9879',
    competitionAwardList: '\u7ade\u8d5b\u5956\u9879',
    studentWorkList: '\u5b66\u751f\u5de5\u4f5c',
  },
  avatar: {
    src: undefined,
    hidden: false,
    shape: 'square',
  },
  profile: {
    name: '\u59d3\u540d',
    mobile: '17861512581',
    email: 'student@email.sdfmu.edu.cn',
    birth_date: '2005.01',
    political_status: '\u4e2d\u5171\u9884\u5907\u515a\u5458',
    github: 'https://github.com/yourname',
    zhihu: '',
    workExpYear: '',
    workPlace: '\u5c71\u4e1c\u6d4e\u5357',
    positionTitle: '\u533b\u5b66\u6570\u636e\u4e0e\u524d\u7aef\u5f00\u53d1\u5b9e\u4e60\u751f',
  },
  educationList: {
    education_desc:
      '\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\uff08\u5c71\u4e1c\u7701\u533b\u5b66\u79d1\u5b66\u9662\uff09\uff0c\u8ba1\u7b97\u673a\u79d1\u5b66\u4e0e\u6280\u672f / \u533b\u5b66\u4fe1\u606f\u65b9\u5411\uff0c\u672c\u79d1\n\u6240\u5728\u5b66\u9662\uff1a\u533b\u5b66\u4fe1\u606f\u4e0e\u5de5\u7a0b\u5b66\u9662\n\u4e3b\u4fee\u8bfe\u7a0b\uff1a\u6570\u636e\u7ed3\u6784\u3001\u8ba1\u7b97\u673a\u7f51\u7edc\u3001\u6570\u636e\u5e93\u7cfb\u7edf\u3001Web \u524d\u7aef\u5f00\u53d1\u3001\u533b\u5b66\u6570\u636e\u5206\u6790\u7b49\nGPA\uff1a3.8 / 4.0\uff08\u4e13\u4e1a\u524d 10%\uff09',
    education_desc_isHtml: false,
  },
  researchList: [
    {
      research_name:
        '\u9762\u5411\u6821\u56ed\u533b\u5b66\u670d\u52a1\u573a\u666f\u7684\u667a\u80fd\u95ee\u7b54\u539f\u578b',
      research_role: '\u9879\u76ee\u6210\u5458 / \u524d\u7aef\u4e0e\u6570\u636e\u6574\u7406',
      research_time: '2023.09 - 2024.06',
      research_desc:
        '\u56f4\u7ed5\u9ad8\u6821\u533b\u5b66\u670d\u52a1\u4e0e\u5b66\u751f\u4e8b\u52a1\u6d41\u7a0b\u6784\u5efa\u77e5\u8bc6\u5e93\uff0c\u5b8c\u6210\u95ee\u9898\u5206\u7c7b\u3001\u68c0\u7d22\u589e\u5f3a\u4e0e\u524d\u7aef\u95ee\u7b54\u754c\u9762\u8054\u8c03\u3002',
      research_content:
        '\u8d1f\u8d23\u95ee\u7b54\u9875\u9762\u4ea4\u4e92\u3001\u540e\u53f0\u914d\u7f6e\u5165\u53e3\u4e0e\u6587\u6863\u7ed3\u6784\u5316\u6807\u6ce8\uff0c\u6574\u7406 300+ \u6761\u9ad8\u9891\u4e1a\u52a1\u95ee\u7b54\u3002',
      research_achievement:
        '\u9879\u76ee\u6210\u679c\u7528\u4e8e\u5b66\u9662\u5185\u90e8\u6f14\u793a\uff0c\u652f\u6491\u540e\u7eed\u667a\u6167\u6821\u56ed\u5e94\u7528\u539f\u578b\u8fed\u4ee3\u3002',
    },
  ],
  projectList: [
    {
      project_name:
        '\u5728\u7ebf\u7b80\u5386\u751f\u6210\u5668\u9ad8\u6821\u6a21\u677f\u5e93',
      project_role: '\u524d\u7aef\u5f00\u53d1',
      project_time: '2024.03 - 2024.06',
      project_desc:
        '\u57fa\u4e8e Gatsby \u4e0e React \u6784\u5efa\u9759\u6001\u7b80\u5386\u7f16\u8f91\u5668\uff0c\u652f\u6301\u6a21\u677f\u5207\u6362\u3001\u914d\u7f6e\u5bfc\u5165\u5bfc\u51fa\u4e0e Netlify \u9759\u6001\u90e8\u7f72\u3002',
      project_content:
        '\u5b9e\u73b0\u5c71\u4e1c\u7b2c\u4e00\u533b\u79d1\u5927\u5b66\u4e2d\u6587\u7b80\u5386\u6a21\u677f\u3001\u6a21\u677f\u9009\u62e9\u5165\u53e3\u3001A4 \u6253\u5370\u6837\u5f0f\u4e0e\u9759\u6001\u8d44\u6e90\u6253\u5305\u6d41\u7a0b\u3002',
      project_tech_stack: 'React, TypeScript, Gatsby, Less, Ant Design',
      project_achievement:
        '\u5b8c\u6210\u53ef\u62d6\u62fd\u4e0a\u4f20 Netlify \u7684\u9759\u6001\u7ad9\u70b9\u4ea7\u7269\uff0c\u964d\u4f4e\u975e\u5f00\u53d1\u7528\u6237\u90e8\u7f72\u95e8\u69db\u3002',
      participation_percent: 80,
      completion_percent: 100,
    },
    {
      project_name: '\u6821\u56ed\u6d3b\u52a8\u62a5\u540d\u4e0e\u7edf\u8ba1\u5e73\u53f0',
      project_role: '\u524d\u7aef\u8d1f\u8d23\u4eba',
      project_time: '2023.10 - 2024.01',
      project_desc:
        '\u4e3a\u5b66\u751f\u7ec4\u7ec7\u642d\u5efa\u6d3b\u52a8\u62a5\u540d\u3001\u7b7e\u5230\u7edf\u8ba1\u4e0e\u6570\u636e\u5bfc\u51fa\u5de5\u5177\u3002',
      project_content:
        '\u8d1f\u8d23\u8868\u5355\u914d\u7f6e\u3001\u5217\u8868\u7b5b\u9009\u3001Excel \u5bfc\u51fa\u548c\u79fb\u52a8\u7aef\u62a5\u540d\u9875\u9002\u914d\u3002',
      project_tech_stack: 'Vue, TypeScript, ECharts',
      project_achievement:
        '\u51cf\u5c11\u4eba\u5de5\u6c47\u603b\u65f6\u95f4\uff0c\u652f\u6301\u591a\u573a\u6d3b\u52a8\u5e76\u884c\u7ba1\u7406\u3002',
    },
  ],
  workExpList: [
    {
      work_time: ['2024.07', '\u81f3\u4eca'],
      company_name: '\u67d0\u533b\u7597\u79d1\u6280\u516c\u53f8',
      department_name: '\u524d\u7aef\u7814\u53d1\u5b9e\u4e60\u751f',
      work_desc:
        '\u53c2\u4e0e\u533b\u7597\u4e1a\u52a1\u540e\u53f0\u7ec4\u4ef6\u5f00\u53d1\uff0c\u7ef4\u62a4\u8868\u683c\u3001\u8868\u5355\u3001\u6743\u9650\u5165\u53e3\u7b49\u9ad8\u9891\u9875\u9762\uff1b\u8865\u5145\u7ec4\u4ef6\u6587\u6863\u5e76\u4f18\u5316\u6784\u5efa\u544a\u8b66\u3002',
      work_desc_isHtml: false,
    },
  ],
  skillList: {
    skill_desc:
      '\u719f\u6089 React\u3001TypeScript\u3001Ant Design \u4e0e\u5e38\u89c1\u524d\u7aef\u5de5\u7a0b\u5316\u6d41\u7a0b\n\u719f\u6089 HTML/CSS \u54cd\u5e94\u5f0f\u5e03\u5c40\uff0c\u80fd\u591f\u5b8c\u6210 A4 \u6253\u5370\u3001\u9759\u6001\u90e8\u7f72\u4e0e\u8de8\u6d4f\u89c8\u5668\u6837\u5f0f\u9002\u914d\n\u4e86\u89e3 Node.js\u3001Git\u3001Netlify \u7b49\u5de5\u5177\u94fe\uff0c\u5177\u5907\u8f7b\u91cf\u5e94\u7528\u72ec\u7acb\u4ea4\u4ed8\u80fd\u529b',
    skill_desc_isHtml: false,
  },
  aboutme: {
    aboutme_desc:
      '\u5b66\u4e60\u4e3b\u52a8\uff0c\u91cd\u89c6\u4ea4\u4e92\u7ec6\u8282\u4e0e\u5de5\u7a0b\u53ef\u7ef4\u62a4\u6027\u3002\u5e0c\u671b\u5728\u533b\u5b66\u4fe1\u606f\u5316\u3001\u6570\u636e\u5e94\u7528\u4e0e\u524d\u7aef\u5f00\u53d1\u65b9\u5411\u6301\u7eed\u6df1\u8015\u3002',
    aboutme_isHtml: false,
  },
  honorList: {
    honor_desc:
      '\u6821\u7ea7\u4f18\u79c0\u5b66\u751f\u5e72\u90e8\n\u6821\u7ea7\u4e8c\u7b49\u5956\u5b66\u91d1\n\u4f18\u79c0\u5171\u9752\u56e2\u5458',
    honor_desc_isHtml: false,
  },
  competitionAwardList: {
    competition_award_desc:
      '\u4e2d\u56fd\u5927\u5b66\u751f\u8ba1\u7b97\u673a\u8bbe\u8ba1\u5927\u8d5b\u7701\u7ea7\u4e8c\u7b49\u5956\n\u4e92\u8054\u7f51+ \u5927\u5b66\u751f\u521b\u65b0\u521b\u4e1a\u5927\u8d5b\u6821\u7ea7\u94f6\u5956',
    competition_award_desc_isHtml: false,
  },
  studentWorkList: {
    student_work_desc:
      '\u62c5\u4efb\u5b66\u9662\u5b66\u751f\u4f1a\u6280\u672f\u90e8\u6210\u5458\uff0c\u8d1f\u8d23\u6d3b\u52a8\u62a5\u540d\u7cfb\u7edf\u7ef4\u62a4\u3001\u63a8\u6587\u6392\u7248\u652f\u6301\u548c\u6570\u636e\u6c47\u603b\u5de5\u4f5c\u3002',
    student_work_desc_isHtml: false,
  },
  awardList: {
    award_desc:
      '\u82f1\u8bed CET-6\uff1b\u719f\u6089 Word\u3001Excel\u3001PowerPoint \u4e0e LaTeX \u57fa\u7840\u6392\u7248\u3002',
    award_desc_isHtml: false,
  },
  workList: [],
  moduleHiddenMap: {
    avatar: false,
    profile: false,
    educationList: false,
    workExpList: false,
    projectList: false,
    researchList: false,
    skillList: false,
    awardList: false,
    workList: true,
    aboutme: false,
    honorList: false,
    competitionAwardList: false,
    studentWorkList: false,
  },
  moduleOrderBasic: [
    'educationList',
    'researchList',
    'projectList',
    'workExpList',
    'skillList',
    'aboutme',
    'honorList',
    'competitionAwardList',
    'studentWorkList',
    'awardList',
  ],
  moduleOrderMain: [],
  templateOptions: {
    watermarkVisible: true,
  },
  template: 'template1',
};
