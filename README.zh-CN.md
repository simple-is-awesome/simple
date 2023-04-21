<p align="center">
<img src="https://vip2.loli.io/2023/04/17/AYctDuH2fbriGPQ.webp" alt="RSSHub" width="100">
</p>

<h1 align="center">Simple</h1>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub Repo stars](https://img.shields.io/github/stars/simple-is-awesome/simple?style=social)
![MIT](https://img.shields.io/github/license/simple-is-awesome/simple?style=plastic)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fdemo.njxzc.top)

[演示网站](https://demo.njxzc.top) | 更多详情请见文档：[simple blog docs](https://docs.njxzc.top).

## 简要说明

一个专为博客爱好者打造的简约博客系统。技术栈：Next.js + Tailwind CSS + Supabase。

## 屏幕截图

![屏幕截图](https://vip2.loli.io/2023/04/17/oKfPLRXCM58rHZA.webp)

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

    - 评论文章/回复评论，存在子评论，则其所有父评论均会收到邮件提醒

- 画廊展示图片

- 提供RSS订阅

- 支持夜色模式

## 快速开始

### 1、Vercel 部署

- a.点击vercel一键部署按钮

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/simple-is-awesome/simple)

注：可以选择GitHub账号登录，之后会需要手机号码验证。

- b.取消勾选创建私有仓库，输入仓库名，点击创建。

![vercel部署图一](https://vip2.loli.io/2023/04/17/IVoHfv7rPwyMTDu.webp)

- c.vercel会自动识别项目，并进行自动部署，耐心等待部署完成。

![vercel部署图二](https://vip2.loli.io/2023/04/17/c9mHiUlIoTNbLOK.webp)

- d.设置环境变量

来到刚才项目的设置界面，设置环境变量。

![vercel部署图三](https://vip2.loli.io/2023/04/17/JKz71vhsGtpMQfe.webp)

添加以下环境变量，其中1~8必填，这7个环境变量为网站的基本信息。

9~10（Inoreader和Raindrop集成）选填。不填写，则网站首页的右侧边栏不会显示Inoreader和Raindrop分享的信息链接。

11~13选填，这部分环境变量需要你的openai key，具体详情可询问chatgpt || newbing || google。
具体功能是在每篇文章的左侧集成chatgpt总结文章摘要，帮助访客快速过滤信息。

14~15选填，这部分环境变量需要你的Cloudflare Turnstile的Site key和Secret key。功能为提供文章底部评论区评论信息提交时的人机验证，阻止机器人提交评论。

16~20选填（如果不开评论区则无需填写，开了评论区推荐填写），这部分环境变量需要你的邮箱地址和授权码。功能为当存在子评论时，向所有的父评论访客的邮箱发送评论邮件提醒。

21~23选填（如果不开评论区则无需填写），这部分环境变量可通过在Vercel的集成应用市场中集成supabase来获取，功能为提供评论区数据的存储和查询服务。

```
# Basic config
NEXT_PUBLIC_SITE_URL=xxxxxx
NEXT_PUBLIC_SITE_TITLE=xxxxxx
NEXT_PUBLIC_SITE_DESCRIPTION=xxxxxx
NEXT_PUBLIC_KEYWORDS=xxxxxx
NEXT_PUBLIC_FOOTER=xxxxxx
NEXT_PUBLIC_POSTS_PERPAGE=xxxxxx
NEXT_PUBLIC_GITHUB_REPO=xxxxxx
NEXT_PUBLIC_SHOW_COMMENT=xxxxxx

# Third-party In Integration
NEXT_PUBLIC_INOREADER_CHANNEL=xxxxxx
NEXT_PUBLIC_RAINDROP=xxxxxx

# OpenAI
NEXT_PUBLIC_OPENAI_API_KEY_AVAILABLE=xxxxxx
OPENAI_API_KEY=xxxxxx
OPENAI_ORG_ID=xxxxxx

# Cloudflare
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=xxxxxx
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxxx

# Email
EMAIL_USERNAME=xxxxxx
EMAIL_PASSWORD=xxxxxx
EMAIL_HOST=xxxxxx
EMAIL_PORT=xxxxxx
EMAIL_SECURE=xxxxxx

# Supabase
SUPABASE_SERVICE_ROLE_KEY=xxxxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
NEXT_PUBLIC_SUPABASE_URL=xxxxxx
```

- e.设置自定义域名

点击vercel项目中的Settings—>Domains，填写相应域名，并在域名托管平台做好cname记录的解析即可。

### 2、Docker Compose部署

1、安装curl工具，以Debian为例

```bash
apt install curl -y
```

2、安装docker和docker compose

```bash
curl -fsSL https://get.docker.com | sh
```

3、自托管supabase（用于存储评论数据）

详情见[supabase docker部署文档](https://supabase.com/docs/guides/self-hosting/docker)
或者见此youtube教学视频[Self host Supabase with an Ubuntu Server on Digital Ocean](https://www.youtube.com/watch?v=0bqxrm4PnMA)

[笔记版本](https://gist.github.com/real-jiakai/868f3a1c0aed5493d1c4dafc27d5cff8)

注：笔记版本中添加了caddy的安装，反向代理supabase、保护supabase studio的流程，建议阅读。

4、使用docker构建并部署

> 为什么不提供dockerhub镜像，直接拉取部署不更好吗？

因为next.js在构建docker镜像时，会将以`NEXT_PUBLIC_`开头的环境变量内联至docker镜像，这会导致.env环境变量根本载入不进docker容器。虽然网上有添加entrypoint.sh等解决方案，但是这些方案要么较为繁琐，要么需要牺牲next.js的性能（将静态生成全盘转为服务器端渲染），因此自己构建属于自己的docker镜像，并用docker compose部署较为稳妥。

```bash
# 克隆git仓库
git clone https://github.com/simple-is-awesome/simple.git
# 进入文件夹
cd simple
# 重命名文件
mv .env.example .env
# 构建一个名为 "blog" 的docker镜像
docker build -t blog .
# 根据 docker-compose.yml 文件中的定义启动并运行docker容器
docker compose up -d
```

5、更新

```bash
# 停止并删除由 docker-compose.yml 文件定义的服务（容器）及其相关资源
docker compose down

# 修改.env或者二次开发（修改过程可见下方解释）

# 重新创建一个名为"blog"的docker镜像
docker build -t blog .
# 根据 docker-compose.yml 文件中的定义启动并运行docker容器
docker compose up -d
# 删除所有未被容器引用的镜像
docker image prune -a
```

- .env文件的参数

直接替换xxxxxx即可，不要添加多余的符号。

```
# Basic config
# 网站的url（如：https://a.exmaple.com)
NEXT_PUBLIC_SITE_URL=xxxxxx
# 网站标题（如：小明的博客）
NEXT_PUBLIC_SITE_TITLE=xxxxxx
# 网站的描述信息（如：记录自己的学习、生活、娱乐）
NEXT_PUBLIC_SITE_DESCRIPTION=xxxxxx
# 网站的关键词（如blog, life, xiaoming)
NEXT_PUBLIC_KEYWORDS=xxxxxx
# 网站的底部信息（如：© 2023 Made with ❤️ By Xiaoming.）
NEXT_PUBLIC_FOOTER=xxxxxx
# 网站每一页的文章数量（如：10）
NEXT_PUBLIC_POSTS_PERPAGE=xxxxxx
# 网站的github仓库地址（如：https://github.com/simple-is-awesome/simple）
NEXT_PUBLIC_GITHUB_REPO=xxxxxx
# 网站是否显示评论（如：true）
NEXT_PUBLIC_SHOW_COMMENT=xxxxxx

# Third-party In Integration
# Inoreader的公开频道的json链接（如：https://www.innoreader.com/stream/user/1005341682/tag/user-broadcasted/view/json）
NEXT_PUBLIC_INOREADER_CHANNEL=xxxxxx
# Raindrop分享集合的rss链接（如：https://bg.raindrop.io/rss/public/32937900）
NEXT_PUBLIC_RAINDROP=xxxxxx

# OpenAI
# OpenAI API是否可以获取（如：true）
NEXT_PUBLIC_OPENAI_API_KEY_AVAILABLE=xxxxxx
# OpenAI的API KEY
OPENAI_API_KEY=xxxxxx
# OpenAI的Organization ID
OPENAI_ORG_ID=xxxxxx

# Cloudflare
# 可通过Cloudflare后台管理面板的Turnstile选项创建获取
# Cloudflare Turnstile的site key
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=xxxxxx
# Cloudflare Turnstile的secret key
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxxx

# Email
# 可用于评论回复邮件通知
# 邮箱用户名（如xxx@qq.com）
EMAIL_USERNAME=xxxxxx
# 邮箱授权码（可通过邮箱设置里面开启smtp服务获取）
EMAIL_PASSWORD=xxxxxx
# 邮箱SMTP服务器地址（如：smtp.qq.com）
EMAIL_HOST=xxxxxx
# 邮箱端口（如：465）
EMAIL_PORT=xxxxxx
# 邮箱发邮件时，是否对其进行加密（如：true）
EMAIL_SECURE=xxxxxx

# Supabase
# Supabase 项目的服务角色密钥（可见supabase/docker/.env中的SERVICE_ROLE_KEY）
SUPABASE_SERVICE_ROLE_KEY=xxxxxx
# Supabase 项目的匿名角色密钥（可见supabase/docker/.env中的ANON_KEY）
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
# Supabase 项目的 API URL（如：https://api.supabase.exmaple.com，可见自托管supabase中的教程）
NEXT_PUBLIC_SUPABASE_URL=xxxxxx
```

6、反向代理博客docker与宿主机对应的端口

- 编辑/etc/caddy/Caddyfile

```
demo.example.com {
	reverse_proxy localhost:3001
}
```

- 重载caddy

```bash
systemctl reload caddy
```

7、撰写博客

在simple文件夹下的posts文件夹中新建md或mdx文件。

遵循如下所示的frontmatter：

```
---
title: "GitHub Flavored Markdown语法"
date: "2023-03-30"
tags: ["github","markdown"]
slug: "github-flavored-markdown"
summary: "总结GitHub Flavored Markdown语法"
---
```

保存后，访问`https://demo.exmaple.com`，即可访问到包含你最新文章的博客。

## Todo

- [ ] 将js代码重构为ts

## 许可证

[MIT](https://github.com/simple-is-awesome/simple/blob/main/LICENSE)