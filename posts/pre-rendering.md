---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
tags: ['nextjs']
slug: 'pre-rendering'
summary: 'introduce two forms of pre-rendering'
showtoc: true
---

## 1、Two Forms of Pre-rendering

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.


## 2、next.js中的ssr和ssg的区别与联系

Next.js 是一个流行的 React 框架，用于构建服务器渲染（SSR）和静态生成（SSG）网站。以下是 SSR 和 SSG 之间的主要区别和联系：

- 服务器渲染（SSR，Server-Side Rendering）：

    每次页面请求时，服务器都会实时生成 HTML 内容，并将其发送给客户端。
    可以实现动态数据获取，更适用于需要实时更新数据的应用。
    对于 SEO（搜索引擎优化）和首屏加载性能有很好的支持。
    服务器负载较高，因为每个页面请求都需要服务器生成 HTML。
    可以通过使用缓存策略来减轻服务器负载，但需要额外的配置和管理。

- 静态生成（SSG，Static Site Generation）：

    在构建时生成页面的 HTML，部署时将这些静态文件发送给客户端。
    适用于内容不经常更新的网站，如博客、文档等。
    对于 SEO（搜索引擎优化）和首屏加载性能有很好的支持。
    服务器负载较低，因为页面已经预先生成，无需在请求时生成。
    如果网站内容发生变化，需要重新构建并部署静态文件。

- 联系：

    Next.js 支持在同一个应用程序中同时使用 SSR 和 SSG。可以根据每个页面的需求选择合适的渲染策略。
    两种方法都使用 React 进行页面的渲染，只是渲染的时间和地点有所不同。
    Next.js 提供了一些内置的函数（如 getStaticProps 和 getServerSideProps），以便在页面中获取数据并传递给组件。

- 总结：Next.js 的 SSR 和 SSG 分别针对不同的应用场景。SSR 更适用于需要实时更新数据的应用，而 SSG 更适用于内容相对固定的网站。根据项目需求，可以灵活选择适合的渲染策略。