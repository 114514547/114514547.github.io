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
      <a href="/publications/" class="metro-nav-item"><i class="fas fa-file-lines"></i> 论文</a>
      <a href="/talks/" class="metro-nav-item"><i class="fas fa-microphone"></i> 演讲</a>
      <a href="/teaching/" class="metro-nav-item"><i class="fas fa-chalkboard"></i> 教学</a>
      <div class="metro-nav-divider"></div>
      <a href="/cv/" class="metro-nav-item"><i class="fas fa-id-card"></i> 简历</a>
      <a href="/about/" class="metro-nav-item"><i class="fas fa-user"></i> 关于</a>
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
    <h1 class="metro-page-title">Dashboard</h1>
    <p class="metro-page-subtitle">{{ site.author.bio }}</p>

    <div class="metro-grid">

      <!-- Row 1: Stats -->
      <a href="/year-archive/" class="metro-tile metro-tile--primary">
        <div class="metro-stat">
          <span class="metro-stat__label">Articles</span>
          <span class="metro-stat__value">{{ site.posts.size }}</span>
          <span class="metro-stat__detail">已发布文章</span>
        </div>
        <i class="fas fa-feather-pointed metro-tile__icon"></i>
      </a>

      <a href="/publications/" class="metro-tile metro-tile--secondary">
        <div class="metro-stat">
          <span class="metro-stat__label">Publications</span>
          <span class="metro-stat__value">{{ site.publications.size }}</span>
          <span class="metro-stat__detail">学术论文</span>
        </div>
        <i class="fas fa-file-lines metro-tile__icon"></i>
      </a>

      <a href="/talks/" class="metro-tile metro-tile--accent">
        <div class="metro-stat">
          <span class="metro-stat__label">Talks</span>
          <span class="metro-stat__value">{{ site.talks.size }}</span>
          <span class="metro-stat__detail">学术报告</span>
        </div>
        <i class="fas fa-microphone metro-tile__icon"></i>
      </a>

      <a href="/portfolio/" class="metro-tile">
        <div class="metro-stat">
          <span class="metro-stat__label">Projects</span>
          <span class="metro-stat__value">{{ site.portfolio.size }}</span>
          <span class="metro-stat__detail">项目作品</span>
        </div>
        <i class="fas fa-code metro-tile__icon"></i>
      </a>

      <!-- Row 2: User + Calendar + Latest Posts -->
      <div class="metro-tile metro-tile--primary metro-tile--tall">
        <div class="metro-user-tile">
          {% if site.author.avatar contains "://" %}
            <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" class="metro-user-tile__avatar" />
          {% else %}
            <img src="{{ site.author.avatar | prepend: '/images/' }}" alt="{{ site.author.name }}" class="metro-user-tile__avatar" />
          {% endif %}
          <div class="metro-user-tile__name">{{ site.author.name }}</div>
          <div class="metro-user-tile__bio">{{ site.author.location }} · {{ site.author.employer }}</div>
          <div class="metro-user-tile__links">
            {% if site.author.github %}
              <a href="https://github.com/{{ site.author.github }}" class="metro-user-tile__link" target="_blank"><i class="fab fa-github"></i></a>
            {% endif %}
            {% if site.author.email %}
              <a href="mailto:{{ site.author.email }}" class="metro-user-tile__link"><i class="fas fa-envelope"></i></a>
            {% endif %}
            {% if site.author.zhihu %}
              <a href="https://www.zhihu.com/people/{{ site.author.zhihu }}" class="metro-user-tile__link" target="_blank"><i class="fab fa-zhihu"></i></a>
            {% endif %}
            {% if site.author.bilibili %}
              <a href="https://space.bilibili.com/{{ site.author.bilibili }}" class="metro-user-tile__link" target="_blank"><i class="fab fa-bilibili"></i></a>
            {% endif %}
          </div>
        </div>
      </div>

      <div class="metro-tile metro-tile--wide">
        <div class="metro-tile__header">Latest Articles</div>
        <ul class="metro-post-list">
          {% for post in site.posts limit:5 %}
          <li>
            <a href="{{ post.url }}" class="metro-post-item">
              <span class="metro-post-item__date">{{ post.date | date: "%m.%d" }}</span>
              <span class="metro-post-item__title">{{ post.title }}</span>
            </a>
          </li>
          {% endfor %}
        </ul>
        <a href="/year-archive/" class="metro-view-all">查看全部 →</a>
      </div>

      <div class="metro-tile metro-tile--light">
        <div class="metro-calendar">
          <span class="metro-calendar__month" id="metro-month"></span>
          <span class="metro-calendar__day" id="metro-day"></span>
          <span class="metro-calendar__weekday" id="metro-weekday"></span>
        </div>
      </div>

      <!-- Row 3: Navigation tiles -->
      <a href="/year-archive/" class="metro-tile metro-tile--accent">
        <div class="metro-nav-tile">
          <i class="fas fa-book-open metro-nav-tile__icon"></i>
          <span class="metro-nav-tile__label">文章</span>
          <span class="metro-nav-tile__desc">技术笔记与随想</span>
        </div>
      </a>

      <a href="/portfolio/" class="metro-tile">
        <div class="metro-nav-tile">
          <i class="fas fa-code metro-nav-tile__icon"></i>
          <span class="metro-nav-tile__label">项目</span>
          <span class="metro-nav-tile__desc">作品与开源项目</span>
        </div>
      </a>

      <a href="/cv/" class="metro-tile metro-tile--secondary">
        <div class="metro-nav-tile">
          <i class="fas fa-id-card metro-nav-tile__icon"></i>
          <span class="metro-nav-tile__label">简历</span>
          <span class="metro-nav-tile__desc">教育与工作经历</span>
        </div>
      </a>

      {% if site.author.github %}
      <a href="https://github.com/{{ site.author.github }}" class="metro-tile" target="_blank">
        <div class="metro-nav-tile">
          <i class="fab fa-github metro-nav-tile__icon"></i>
          <span class="metro-nav-tile__label">GitHub</span>
          <span class="metro-nav-tile__desc">开源贡献</span>
        </div>
      </a>
      {% endif %}

      <!-- Row 4: Tags + Teaching timeline -->
      <div class="metro-tile metro-tile--wide">
        <div class="metro-tile__header">Tags</div>
        <div class="metro-tags">
          {% for tag in site.tags %}
            <a href="{{ tag[1].first.url | append: '#' | append: tag[0] | relative_url }}" class="metro-tag">{{ tag[0] }}</a>
          {% endfor %}
        </div>
      </div>

      <div class="metro-tile metro-tile--wide">
        <div class="metro-tile__header">Teaching</div>
        <div class="metro-timeline">
          {% for item in site.teaching reversed %}
          <div class="metro-timeline-item">
            <div class="metro-timeline-item__date">{{ item.date | date: "%Y" }}</div>
            <div class="metro-timeline-item__title">{{ item.title }}</div>
            <div class="metro-timeline-item__venue">{{ item.venue }}</div>
          </div>
          {% endfor %}
        </div>
      </div>

      <!-- Row 5: Publications -->
      <div class="metro-tile metro-tile--full">
        <div class="metro-tile__header">Publications</div>
        <ul class="metro-post-list">
          {% for pub in site.publications reversed %}
          <li>
            <a href="{{ pub.url }}" class="metro-post-item">
              <span class="metro-post-item__date">{{ pub.date | date: "%Y" }}</span>
              <span class="metro-post-item__title">{{ pub.title | strip_html }}</span>
            </a>
          </li>
          {% endfor %}
        </ul>
        <a href="/publications/" class="metro-view-all">查看全部 →</a>
      </div>

    </div><!-- /.metro-grid -->
  </main>

</div><!-- /.metro-dashboard -->

<!-- Metro dashboard calendar script -->
<script>
(function() {
  var now = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var m = document.getElementById('metro-month');
  var d = document.getElementById('metro-day');
  var w = document.getElementById('metro-weekday');
  if (m) m.textContent = months[now.getMonth()];
  if (d) d.textContent = now.getDate();
  if (w) w.textContent = weekdays[now.getDay()];
})();
</script>
