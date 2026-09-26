---
layout: splash
permalink: /
title: ""
author_profile: false
redirect_from:
  - /about/
  - /about.html
comments: false
---

{% include glass-dashboard.html %}
<!-- ========== METRO DASHBOARD (hidden by default, shown when data-style="metro") ========== -->
<div class="metro-dashboard">

  <!-- Left Sidebar -->
  <aside class="metro-sidebar">
    <div class="metro-sidebar__brand">
      <h1>{{ site.title }}</h1>
      <span>Dashboard</span>
    </div>
    <nav class="metro-sidebar__nav">
      <a href="/" class="metro-nav-item active"><i class="fas fa-home"></i> 首页</a>
      <a href="/year-archive/" class="metro-nav-item"><i class="fas fa-book-open"></i> 文章</a>
      <a href="/portfolio/" class="metro-nav-item"><i class="fas fa-code"></i> 项目</a>
      <div class="metro-nav-divider"></div>
      <a href="/changelog/" class="metro-nav-item"><i class="fas fa-clock-rotate-left"></i> 更新日志</a>
      <div class="metro-nav-divider"></div>
      {% if site.author.github %}
      <a href="https://github.com/{{ site.author.github }}" class="metro-nav-item" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      {% endif %}
    </nav>
    <div class="metro-sidebar__user">
      {% if site.author.avatar contains "://" %}
        <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" class="metro-sidebar__user-avatar" />
      {% else %}
        <img src="{{ site.author.avatar | prepend: '/images/' }}" alt="{{ site.author.name }}" class="metro-sidebar__user-avatar" />
      {% endif %}
      <div class="metro-sidebar__user-info">
        <div class="metro-sidebar__user-name">{{ site.author.name }}</div>
        <div class="metro-sidebar__user-role">{{ site.author.employer }}</div>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="metro-content">
    <div class="metro-board-heading">
      <div>
        <h1 class="metro-page-title">学习与记录</h1>
        <p class="metro-page-subtitle">{{ site.author.bio }}</p>
      </div>
    </div>
    <div class="metro-board" id="metro-board" tabindex="0" role="region" aria-label="首页磁贴，可用左右方向键浏览">
    <div class="metro-track">
      <section class="metro-home-group" aria-label="首页概览">
        <div class="metro-tile metro-tile--primary metro-profile-card">
          {% if site.author.avatar contains '://' %}{% assign metro_avatar = site.author.avatar %}{% else %}{% assign metro_avatar = site.author.avatar | prepend: '/images/' | relative_url %}{% endif %}
          <img src="{{ metro_avatar }}" alt="{{ site.author.name | escape }}">
          <div><h2>{{ site.author.name }}</h2><p>{{ site.author.location }} · {{ site.author.employer }}</p>
          <div class="metro-profile-links">
            <a href="{{ '/year-archive/' | relative_url }}">{{ site.posts.size }} 篇文章 ↗</a>
            <a href="{{ '/portfolio/' | relative_url }}">{{ site.portfolio.size }} 个项目 ↗</a>
          </div></div>
        </div>
        <section class="metro-tile metro-tile--light metro-clock-card" aria-label="北京时间与郑州天气">
          <div><span data-clock="date">日期加载中</span> · <span data-clock="weekday"></span></div>
          <time data-clock="time">--:--</time>
          <small>北京时间 · 郑州</small>
          {% include local-weather.html %}
        </section>
        {% for project in site.portfolio limit:2 %}
        <a class="metro-tile metro-project-card metro-project-card--{{ forloop.index }}" href="{{ project.url | relative_url }}">
          <i class="fas fa-code" aria-hidden="true"></i>
          <small>项目 / 0{{ forloop.index }}</small>
          <h2>{{ project.title | escape }}</h2>
          <p>{{ project.description | default: project.excerpt | strip_html | normalize_whitespace | truncate: 68 }}</p>
          <span>查看项目 ↗</span>
        </a>
        {% endfor %}
        {% assign changelog = site.pages | where: 'permalink', '/changelog/' | first %}
        <a class="metro-tile metro-update-card" href="{{ '/changelog/' | relative_url }}">
          <small>最近更新 · {{ changelog.latest_date }}</small>
          <h2>{{ changelog.latest_title }}</h2>
          <span>查看更新日志 ↗</span>
        </a>
        {% if site.author.github %}
        <a class="metro-tile metro-contact-card metro-contact-card--github" href="https://github.com/{{ site.author.github }}" aria-label="访问 GitHub">
          <i class="fab fa-github" aria-hidden="true"></i><span>GitHub ↗</span>
        </a>
        {% endif %}
        {% if site.author.email %}
        <a class="metro-tile metro-contact-card metro-contact-card--email" href="mailto:{{ site.author.email }}" aria-label="发送邮件">
          <i class="far fa-envelope" aria-hidden="true"></i><span>邮箱 ↗</span>
        </a>
        {% endif %}
      </section>
      <section class="metro-article-group" aria-label="文章浏览">
        <div class="metro-article-links"><a href="{{ '/year-archive/' | relative_url }}">全部文章 ↗</a><a href="{{ '/tags/' | relative_url }}">按标签浏览 ↗</a></div>
        <div class="metro-article-grid">
          {% for post in site.posts %}
          {% assign title_length = post.title | size %}
          <a class="metro-tile metro-article-card{% if title_length > 26 %} metro-article-card--wide{% endif %}" href="{{ post.url | relative_url }}">
            <small>{{ post.date | date: '%Y.%m.%d' }} · {{ post.categories | first | default: '学习记录' }}</small>
            <h2>{{ post.title | escape }}</h2>
            {% assign summary = post.description | default: post.excerpt %}
            {% assign summary_length = summary | size %}
            {% if summary_length < 18 %}{% assign summary = post.excerpt %}{% endif %}
            <p>{{ summary | strip_html | normalize_whitespace | truncate: 78 }}</p>
            <span>阅读 ↗</span>
          </a>
          {% endfor %}
        </div>
      </section>
    </div>
    </div><!-- /.metro-board -->
  </main>

</div><!-- /.metro-dashboard -->
<script src="{{ '/assets/js/metro-board.js' | relative_url }}" defer></script>
