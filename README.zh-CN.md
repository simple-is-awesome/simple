[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## 简要说明

一个专为博客爱好者打造的简约博客主题，技术栈：Next.js + Tailwind CSS + Supabase + Vercel。

## 屏幕截图

## 功能说明

- 首页功能

    - 查看文章列表

    - 搜索文章

    - 浏览近期文章

    - 浏览Inoreader广播

    - 浏览Raindrop书签分享

    - 根据标签筛选文章

    - 返回页面顶部

    - 分页器限制每一页文章列表的条目数

- 文章页功能

    - 查看文章目录（通过showtoc参数控制）

    - 使用ChatGPT总结文章摘要

    - 评论文章/回复评论，所有父评论均会收到邮件提醒

- 画廊展示图片

- 提供RSS订阅

- 支持夜色模式

## 使用说明

```bash
mkdir simple_blog

cd simple_blog

curl -fsSL https://raw.githubusercontent.com/simple-is-awesome/simple/main/docker-compose.yml

curl -fsSL https://raw.githubusercontent.com/simple-is-awesome/simple/main/.env.example

mv .env.example .env

docker compose up -d
```