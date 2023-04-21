<p align="center">
<img src="https://vip2.loli.io/2023/04/17/AYctDuH2fbriGPQ.webp" alt="RSSHub" width="100">
</p>

<h1 align="center">Simple</h1>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub Repo stars](https://img.shields.io/github/stars/simple-is-awesome/simple?style=social)
![MIT](https://img.shields.io/github/license/simple-is-awesome/simple?style=plastic)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/jaya2021/simple-blog-njxzc)
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

### 1、Docker Compose部署

1、安装curl工具，以Ubuntu为例

```bash
apt install curl -y
```

2、安装docker和docker compose

```bash
curl -fsSL https://get.docker.com | sh
```

3、使用docker构建并部署

```bash
git clone https://github.com/simple-is-awesome/simple.git
# 进入文件夹
cd simple

mv .env.example .env

docker build -t blog .

docker compose up -d
```

4、更新

```bash
# 使用 Docker Compose 停止并删除在 docker-compose.yml 文件中定义的所有服务、容器、网络和卷。
docker compose down
# 从 Docker Hub 拉取名为 jaya2021/simple-blog-njxzc 的镜像。这将下载指定镜像的最新版本。
# 如果你需要特定版本，可以在镜像名后添加 :<tag>，如 jaya2021/simple-blog-njxzc:1.0.0
docker pull jaya2021/simple-blog-njxzc
# 使用 Docker Compose 启动和运行定义在 docker-compose.yml 文件中的服务。
# -d 标志表示以 "detached"（分离）模式运行，也就是在后台运行，不会阻塞当前终端。
docker compose up -d

# 注：这种方式更新，原本的旧镜像依然存在，如果你想删除旧镜像，请按照以下方式进行。
docker images
# 找到旧镜像的image id，接着使用以下命令删除旧镜像。
docker rmi old_image_id
```

### 2、Vercel 部署

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

添加以下环境变量，其中1~7必填，这7个环境变量为网站的基本信息。

8~9（Inoreader和Raindrop集成）选填。不填写，则网站首页的右侧边栏不会显示Inoreader和Raindrop分享的信息链接。

10~11选填，这部分环境变量需要你的openai key，具体详情可询问chatgpt || newbing || google。
具体功能是在每篇文章的左侧集成chatgpt总结文章摘要，帮助访客快速过滤信息。

12~13选填，这部分环境变量需要你的Cloudflare Turnstile的Site key和Secret key。功能为提供文章底部评论区评论信息提交时的人机验证，阻止机器人提交评论。

14~18选填（如果不开评论区则无需填写，开了评论区推荐填写），这部分环境变量需要你的邮箱地址和授权码。功能为当存在子评论时，向所有的父评论访客的邮箱发送评论邮件提醒。

19~21选填（如果不开评论区则无需填写），这部分环境变量可通过在Vercel的集成应用市场中集成supabase来获取，功能为链接前端和后端数据库，其中supabase提供评论区数据的存储和查询服务。

```
SITE_URL='https://exmaple.com'
SITE_TITLE='xxxxxx'
SITE_DESCRIPTION='xxxxxx'
KEYWORDS='xxxxxx'
FOOTER='xxxxxx'
POSTS_PERPAGE=x
GITHUB_REPO='xxxxxx'

INOREADER_CHANNEL='xxxxxx'
RAINDROP='xxxxxx'

# OpenAI
OPENAI_API_KEY="xxxxxx"
OPENAI_ORG_ID="xxxxxx"

# Cloudflare
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY="xxxxxx"
CLOUDFLARE_TURNSTILE_SECRET_KEY="xxxxxx"

# Email
EMAIL_UserName="xxxxxx"
EMAIL_Password="xxxxxx"
EMAIL_Host="xxxxxx"
EMAIL_Port="465"
EMAIL_Secure="true"

# Supabase
SUPABASE_SERVICE_ROLE_KEY="xxxxxx"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxxxxx"
NEXT_PUBLIC_SUPABASE_URL="xxxxxx"
```

## Todo

- [ ] 将js代码重构为ts

## 许可证

MIT