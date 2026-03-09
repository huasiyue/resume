# Resume Generator

一个基于 React + Ant Design 的简历生成器，用于在浏览器中编辑简历内容、选择模板与主题，并输出适合 A4 打印的简历页面。

## 目的
- 让简历搭建流程可视化、模块化，减少排版与样式维护成本
- 提供多模板与主题能力，快速生成不同风格的简历
- 支持打印与分享，便于快速交付最终 PDF 或纸质版本

## 安装
- 环境要求：Node.js 16+，推荐使用 Chrome/Edge 浏览器
- 安装依赖：

```bash
npm install
```

## 本地启动

```bash
npm run start
```

启动后访问：
- 查看模式：http://localhost:8000/
- 编辑模式：http://localhost:8000/?mode=edit&template=template1

## 使用
- 编辑模式下可在顶部操作区与右侧配置抽屉中进行内容编辑、模块开关、模板与主题切换
- 打印时会自动隐藏头部与按钮区，保证 A4 版面简洁
- 支持导入/导出配置（JSON），便于迁移与备份

## 构建

```bash
npm run build
```

## 适配与限制
- 移动端仅提供预览，不支持在线编辑
- 自动备份依赖文件系统访问 API，Safari 不支持
