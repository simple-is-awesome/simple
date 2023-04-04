---
title: "Hugo主题simple英文版说明"
date: "2023-03-30"
tags: ["hugo","theme"]
slug: "english-readme-of-hugo-theme-simple"
summary: "关于自己开发的hugo主题—simple的英文说明文档"
showtoc: true
---


<h1 align=center>Hugo-Theme-Simple | <a href="https://hugo.njxzc.top" target="_blank">Demo</a></h1>

<p align="center">
<img src="https://vip2.loli.io/2023/03/15/9LJ1QX8kKZrRtwA.webp" alt="Simple quote">
</p>

[简体中文版本](https://github.com/simple-is-awesome/Hugo-Theme-Simple/blob/main/README.zh-CN.md)

## Introduction 

This theme is named Simple. It's built based on Bootstrap+Lightbox+jQuery. 

Confucius once said, "Life is really simple, but we insist on making it complicated." With this in mind, our goal is to return to the essence of blogging and rediscover the original charm it holds. This theme embodies simplicity and elegance, allowing you to focus on what truly matters - your content.

## Screenshot

![Screenshot](https://vip2.loli.io/2023/03/16/bRuOzHDndLXm8kT.webp)

## Pros

- Responsive

- Clean

- Fast

## Usage

  - step1

Install Hugo

you can find more information in offical Hugo docs [Installation](https://gohugo.io/installation/) or Youtuber-Mike Dane's [Tutorials about Hugo](https://www.youtube.com/playlist?list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3).

  - step2 

Create a Hugo website.

```bash
# new a Hugo website
hugo new site your_site_name
# enter the site folder
cd your_site_name
# initialize a new git repo
git init
# add an external git repo(themes/hugo-theme-simple) as a submodule to this git repo
# when a git repo contains a nested sub-git repo, use submodule has many advantages
git submodule add https://github.com/simple-is-awesome/Hugo-Theme-Simple.git themes/hugo-theme-simple
```

  - step3

Copy the exampleSite folder to your Hugo site root folder and replace the default files. Please delete the CNAME file, as it is used to customize the domain name in GitHub. I recommend using Netlify or Vercel to deploy your blog, as they are more convenient than GitHub Pages.

```bash
hugo server
```

You can see the gif below, which shows the step2 and step3:

<img src="https://github.com/simple-is-awesome/Hugo-Theme-Simple/blob/main/static/images/hugo_step2_step3.gif?raw=true" width="800px" alt="step2 and step3 demo">

  - step4

Adjust the options in config.toml.

  - step5 

There are some commands you need to know.

```bash
# create a new page
hugo new xxx.md
# create a new blog in blog folder
hugo new blog/xxx.md
```

  - step6

    - Add、Commit and Push your repo to GitHub. 

    - Import your GitHub repo to Netlify or Vercel to enjoy auto deployment. You can find more information in Hugo official docs [Hosting & Deployment](https://gohugo.io/hosting-and-deployment/) or other resources On the Internet.

Happy blogging! :blush: :blush: :blush:

## License

MIT
