<p align="center">
<img src="https://vip2.loli.io/2023/04/17/AYctDuH2fbriGPQ.webp" alt="RSSHub" width="100">
</p>

<h1 align="center">Simple</h1>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub Repo stars](https://img.shields.io/github/stars/simple-is-awesome/simple?style=social)
![MIT](https://img.shields.io/github/license/simple-is-awesome/simple?style=plastic)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fdemo.njxzc.top)

[Demo Website](https://demo.njxzc.top) | For more details, please see the documentation：[simple blog docs](https://docs.njxzc.top).

## TL;DR

A minimalist blogging system built specifically for bloggers. Technology stack: Next.js + Tailwind CSS + Supabase.

[Demo](https://demo.njxzc.top) | [中文说明](https://github.com/simple-is-awesome/simple/README.zh-CN.md)

## Screenshots

![screenshots](https://vip2.loli.io/2023/04/17/oKfPLRXCM58rHZA.webp)

## Features

- Home Features

    - View article list

    - Search Articles

    - Browse Recent Articles

    - Browse Inoreader broadcasts

    - Browse Raindrop bookmark shares

    - Filter articles by tags

    - Return to top of page

    - Paginator limits the number of entries per page of article list

- Article page features

    - View article table of contents (controlled by showtoc parameter)

    - Summarize article summary using ChatGPT

    - Comment on article/reply to comment, if a child comment exists, all its parent comments will receive email alerts

- Gallery to display images

- Provide RSS feeds

- Support night mode

## Get Started

### 1、Vercel Deploy

a. Click on the vercel one-click deployment button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/simple-is-awesome/simple)

Note: You can choose a GitHub account to log in, after which you will need your cell phone number to verify.

- b. Uncheck Create private repository, enter the repository name, and click Create.

![vercel deploy img 1](https://vip2.loli.io/2023/04/17/IVoHfv7rPwyMTDu.webp)

- c.vercel will automatically recognize the project and perform automatic deployment, wait patiently for the deployment to complete.

![vercel deploy img 2](https://vip2.loli.io/2023/04/17/c9mHiUlIoTNbLOK.webp)

- d.Set the environment variables

Come to the setting screen of the project just now and set the environment variables.

![vercel deploy img 3](https://vip2.loli.io/2023/04/17/JKz71vhsGtpMQfe.webp)

Add the following environment variables, where 1~8 are required, these 7 environment variables are the basic information of the website.

9~10 (Inoreader and Raindrop integration) are optional. If you don't fill them in, the right sidebar of the homepage of the website will not show the information links shared by Inoreader and Raindrop.

11~13 optional, this part of the environment variables need your openai key, ask chatgpt || newbing || google for specific details.
The specific function is to integrate chatgpt summary article summary on the left side of each article to help visitors quickly filter information.

14~15 optional, this part of the environment variables need your Cloudflare Turnstile Site key and Secret key. function to provide the article at the bottom of the comment section comment information submitted when the human verification, to prevent robots to submit comments.

16~20 optional (if not open the comment section then no need to fill in, open the comment section recommended to fill in), this part of the environment variables need your email address and authorization code. The function is to send comment email alerts to all parent comment visitors' emails when there are child comments.

21~23 optional (not required if the comments section is not open), this part of the environment variables can be obtained by integrating supabase in Vercel's integrated application marketplace, the function is to provide comment section data storage and query services.

```
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

- e.Set custom domain name

Click Settings->Domains in the vercel project, fill in the corresponding domain name, and just do the resolution of cname records in the domain hosting platform.

### 2、Docker Compose deployment

1、Install curl tool, take Debian as an example

```bash
apt install curl -y
```

2、安装docker和docker compose

```bash
curl -fsSL https://get.docker.com | sh
```

3、Self-hosted supabase (for storing comment data)

See [supabase docker deployment documentation](https://supabase.com/docs/guides/self-hosting/docker) for more details
Or see this youtube instructional video [Self host Supabase with an Ubuntu Server on Digital Ocean](https://www.youtube.com/watch?v=0bqxrm4PnMA)

[Notes version](https://gist.github.com/real-jiakai/868f3a1c0aed5493d1c4dafc27d5cff8)

Note: The notes version adds the installation of caddy, reverse proxy supabase, process of protecting supabase studio, recommended reading.

4. Build and deploy with docker

> Why don't you provide a dockerhub image and pull it directly for deployment?

Because next.js will inline environment variables starting with `NEXT_PUBLIC_` into the docker image when building the docker image, which will cause the .env environment variables to not load into the docker container at all. Although there are solutions on the web such as adding entrypoint.sh, these solutions are either tedious or require sacrificing the performance of next.js (which converts static generation to server-side rendering), so it is safer to build your own docker image and deploy it with docker compose.

```bash
# Clone git repository
git clone https://github.com/simple-is-awesome/simple.git
# Go to the folder
cd simple
# Rename the file
mv .env.example .env
# Build a docker image named "blog"
docker build -t blog .
# Start and run the docker container as defined in the docker-compose.yml file
docker compose up -d
```

5、Update

```bash
# Stop and delete the services (containers) and their related resources defined by the docker-compose.yml file
docker compose down

# Modify .env or secondary development (see below for explanation of modification process)

# Re-create a docker image named "blog"
docker build -t blog .
# Start and run the docker container as defined in the docker-compose.yml file
docker compose up -d
# Delete all images that are not referenced by a container
docker image prune -a
```

- Parameters of the .env file

Just replace xxxxxxx directly, don't add extra symbols.

```
# Basic config
# Website url (e.g. https://a.exmaple.com)
NEXT_PUBLIC_SITE_URL=xxxxxx
# Title of the website (e.g. Xiaoming's blog)
NEXT_PUBLIC_SITE_TITLE=xxxxxx
# Description information of the website (e.g., record your study, life, entertainment)
NEXT_PUBLIC_SITE_DESCRIPTION=xxxxxx
# Keywords for the website (e.g. blog, life, xiaoming)
NEXT_PUBLIC_KEYWORDS=xxxxxx
# Bottom information of the website (e.g. © 2023 Made with ❤️ By Xiaoming.)
NEXT_PUBLIC_FOOTER=xxxxxx
# of articles per page of the site (e.g., 10)
NEXT_PUBLIC_POSTS_PERPAGE=xxxxxx
# github repository address of the site (e.g. https://github.com/simple-is-awesome/simple)
NEXT_PUBLIC_GITHUB_REPO=xxxxxx
# Whether the site displays comments (e.g. true)
NEXT_PUBLIC_SHOW_COMMENT=xxxxxx

# Third-party In Integration
# json link to Inoreader's public channel (e.g. https://www.innoreader.com/stream/user/1005341682/tag/user-broadcasted/view/json)
NEXT_PUBLIC_INOREADER_CHANNEL=xxxxxx
# rss link to Raindrop's shared collection (e.g. https://bg.raindrop.io/rss/public/32937900)
NEXT_PUBLIC_RAINDROP=xxxxxx

# OpenAI
# Whether the OpenAI API is accessible (e.g. true)
NEXT_PUBLIC_OPENAI_API_KEY_AVAILABLE=xxxxxx
# API KEY of OpenAI
OPENAI_API_KEY=xxxxxx
# Organization ID of OpenAI
OPENAI_ORG_ID=xxxxxx

# Cloudflare
# Can be created through the Cloudflare backend administration panel of the Turnstile option to get
# Cloudflare Turnstile's site key
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=xxxxxx
# Cloudflare Turnstile's secret key
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxxx

# Email
# Can be used for comment reply email notifications
# Mailbox username (如xxx@qq.com)
EMAIL_USERNAME=xxxxxx
# Mailbox authorization code (can be obtained by opening smtp service inside the mailbox settings)
EMAIL_PASSWORD=xxxxxx
# Mailbox SMTP server address (such as: smtp.qq.com)
EMAIL_HOST=xxxxxx
# mailbox port (such as: 465)
EMAIL_PORT=xxxxxx
# Whether to encrypt the mailbox when it sends emails (e.g. true)
EMAIL_SECURE=xxxxxx

# Supabase
# Service role key for Supabase project (see SERVICE_ROLE_KEY in supabase/docker/.env)
SUPABASE_SERVICE_ROLE_KEY=xxxxxx
# Anonymous role key for Supabase project (see ANON_KEY in supabase/docker/.env)
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
# API URL for Supabase project (e.g. https://api.supabase.exmaple.com, see the tutorial in self-hosted supabase)
NEXT_PUBLIC_SUPABASE_URL=xxxxxx
```

## Todo

- [ ] refactor js code to ts

## License

[MIT](https://github.com/simple-is-awesome/simple/blob/main/LICENSE)