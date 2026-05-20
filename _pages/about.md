---
permalink: /
title: ""
author_profile: false
redirect_from:
  - /about/
  - /about.html
comments: false
---

<!-- ========== HERO SECTION ========== -->
<section class="hero-section">
  <div class="hero-bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="glass-card hero-card reveal-scale">
    <div class="hero-avatar">
      {% if site.author.avatar contains "://" %}
        <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" />
      {% else %}
        <img src="{{ site.author.avatar | prepend: '/images/' }}" alt="{{ site.author.name }}" />
      {% endif %}
    </div>
    <h1 class="hero-name">{{ site.author.name }}</h1>
    <p class="hero-tagline">{{ site.author.bio }}</p>

    <div class="hero-meta">
      {% if site.author.location %}
        <span class="meta-chip">
          <i class="fas fa-location-dot"></i> {{ site.author.location }}
        </span>
      {% endif %}
      {% if site.author.employer %}
        <span class="meta-chip">
          <i class="fas fa-building-columns"></i> {{ site.author.employer }}
        </span>
      {% endif %}
    </div>

    <div class="hero-social">
      {% if site.author.github %}
        <a href="https://github.com/{{ site.author.github }}" class="social-link" title="GitHub" target="_blank">
          <i class="fab fa-github"></i>
        </a>
      {% endif %}
      {% if site.author.email %}
        <a href="mailto:{{ site.author.email }}" class="social-link" title="Email" target="_blank">
          <i class="fas fa-envelope"></i>
        </a>
      {% endif %}
      {% if site.author.zhihu %}
        <a href="https://www.zhihu.com/people/{{ site.author.zhihu }}" class="social-link" title="知乎" target="_blank">
          <i class="fab fa-zhihu"></i>
        </a>
      {% endif %}
      {% if site.author.bilibili %}
        <a href="https://space.bilibili.com/{{ site.author.bilibili }}" class="social-link" title="B站" target="_blank">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
        </a>
      {% endif %}
      {% if site.author.weibo %}
        <a href="https://www.weibo.com/{{ site.author.weibo }}" class="social-link" title="微博" target="_blank">
          <i class="fab fa-weibo"></i>
        </a>
      {% endif %}
      {% if site.author.twitter %}
        <a href="https://twitter.com/{{ site.author.twitter }}" class="social-link" title="Twitter" target="_blank">
          <i class="fab fa-x-twitter"></i>
        </a>
      {% endif %}
    </div>
  </div>
</section>

<!-- ========== ABOUT SECTION ========== -->
<section class="home-section">
  <div class="glass-card reveal" style="animation-delay: 0.1s">
    <h2 class="section-title">
      <i class="fas fa-user"></i> 关于我
    </h2>
    <div class="about-content">
      <p>欢迎来到我的个人主页！这里是我的博客和项目展示空间。我会在这里分享技术文章、学习笔记和个人项目。</p>
      <p>如果你对我的内容感兴趣，欢迎通过上面的社交链接与我交流。</p>
    </div>
  </div>
</section>

<!-- ========== LATEST POSTS ========== -->
<section class="home-section">
  <div class="glass-card reveal" style="animation-delay: 0.2s">
    <h2 class="section-title">
      <i class="fas fa-feather-pointed"></i> 最新文章
    </h2>
    <div class="post-list">
      {% for post in site.posts limit:5 %}
        <a href="{{ post.url }}" class="post-item">
          <div class="post-item-date">
            <span class="post-day">{{ post.date | date: "%d" }}</span>
            <span class="post-month">{{ post.date | date: "%Y.%m" }}</span>
          </div>
          <div class="post-item-info">
            <h3 class="post-item-title">{{ post.title }}</h3>
            {% if post.excerpt %}
              <p class="post-item-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% endif %}
          </div>
          <i class="fas fa-chevron-right post-item-arrow"></i>
        </a>
      {% endfor %}
    </div>
    {% if site.posts.size > 5 %}
      <a href="/year-archive/" class="view-all-link">
        查看全部文章 <i class="fas fa-arrow-right"></i>
      </a>
    {% endif %}
  </div>
</section>

<!-- ========== QUICK LINKS ========== -->
<section class="home-section">
  <div class="glass-card reveal" style="animation-delay: 0.3s">
    <h2 class="section-title">
      <i class="fas fa-compass"></i> 导航
    </h2>
    <div class="quick-links-grid">
      <a href="/year-archive/" class="quick-link-card">
        <div class="qlc-icon"><i class="fas fa-book-open"></i></div>
        <div class="qlc-text">
          <h3>文章</h3>
          <p>技术笔记与随想</p>
        </div>
      </a>
      <a href="/portfolio/" class="quick-link-card">
        <div class="qlc-icon"><i class="fas fa-code"></i></div>
        <div class="qlc-text">
          <h3>项目</h3>
          <p>作品与开源项目</p>
        </div>
      </a>
      {% if site.posts.size > 0 %}
      <a href="/tags/" class="quick-link-card">
        <div class="qlc-icon"><i class="fas fa-tags"></i></div>
        <div class="qlc-text">
          <h3>标签</h3>
          <p>按主题浏览</p>
        </div>
      </a>
      {% endif %}
      {% if site.author.github %}
      <a href="https://github.com/{{ site.author.github }}" class="quick-link-card" target="_blank">
        <div class="qlc-icon"><i class="fab fa-github"></i></div>
        <div class="qlc-text">
          <h3>GitHub</h3>
          <p>开源贡献</p>
        </div>
      </a>
      {% endif %}
    </div>
  </div>
</section>
