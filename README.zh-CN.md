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

## 快速开始

1、安装docker和docker compose

```bash
# 以ubuntu系统为例
# 其他linux系统安装指南可参看docker官方文档：https://docs.docker.com/engine/install/

# 从仓库安装docker
# 更新软件包索引
sudo apt-get update
# 安装一些前置工具，确保docker正确安装配置
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
# 添加 Docker 的官方 GPG 密钥 
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 向 Ubuntu 系统添加 Docker 官方软件源，以便下载和安装 Docker 软件包
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包索引
sudo apt-get update
# 在 Ubuntu 系统中安装 Docker 软件包及其相关插件，以便于运行和管理 Docker 容器
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

2、docker compose部署

```bash
# 新建博客文件夹
mkdir simple_blog
# 进入文件夹
cd simple_blog
# 下载docker-compose.yml文件
curl -fsSL https://raw.githubusercontent.com/simple-is-awesome/simple/main/docker-compose.yml
# 下载.env.example文件
curl -fsSL https://raw.githubusercontent.com/simple-is-awesome/simple/main/.env.example
# 将.env.example文件重命名为.env文件
mv .env.example .env

# 编辑.env文件的内容，填写环境变量

# 使用 Docker Compose 启动和运行定义在 docker-compose.yml 文件中的服务。
# -d 标志表示以 "detached"（分离）模式运行，也就是在后台运行，不会阻塞当前终端。
docker compose up -d
```

3、更新

```bash
# 使用 Docker Compose 停止并删除在 docker-compose.yml 文件中定义的所有服务、容器、网络和卷。
docker compose down
# 从 Docker Hub 拉取名为 jaya2021/simple-blog-njxzc 的镜像。这将下载指定镜像的最新版本。
# 如果你需要特定版本，可以在镜像名后添加 :<tag>，如 jaya2021/simple-blog-njxzc:1.0.0
docker pull jaya2021/simple-blog-njxzc
# 使用 Docker Compose 启动和运行定义在 docker-compose.yml 文件中的服务。
# -d 标志表示以 "detached"（分离）模式运行，也就是在后台运行，不会阻塞当前终端。
docker compose up -d
```