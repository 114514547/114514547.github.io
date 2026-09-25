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
      <a href="/publications/" class="metro-nav-item"><i class="fas fa-file-lines"></i> 论文</a>
      <a href="/talks/" class="metro-nav-item"><i class="fas fa-microphone"></i> 演讲</a>
      <a href="/teaching/" class="metro-nav-item"><i class="fas fa-chalkboard"></i> 教学</a>
      <div class="metro-nav-divider"></div>
      <a href="/cv/" class="metro-nav-item"><i class="fas fa-id-card"></i> 简历</a>
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
      <div class="metro-board-controls">
        <span id="metro-board-help">滚轮或左右方向键浏览</span>
        <button type="button" data-board-direction="-1" aria-label="向左浏览磁贴" aria-controls="metro-board">←</button>
        <button type="button" data-board-direction="1" aria-label="向右浏览磁贴" aria-controls="metro-board">→</button>
      </div>
    </div>
    <div class="metro-board" id="metro-board" tabindex="0" role="region" aria-label="首页磁贴" aria-describedby="metro-board-help">
    <div class="metro-grid">

      <!-- Row 1: Stats -->
      <a href="/year-archive/" class="metro-tile metro-tile--primary">
        <div class="metro-stat">
          <span class="metro-stat__label">文章</span>
          <span class="metro-stat__value">{{ site.posts.size }}</span>
          <span class="metro-stat__detail">已发布文章</span>
        </div>
        <i class="fas fa-feather-pointed metro-tile__icon"></i>
      </a>

      <a href="/publications/" class="metro-tile metro-tile--secondary">
        <div class="metro-stat">
          <span class="metro-stat__label">论文</span>
          <span class="metro-stat__value">{{ site.publications.size }}</span>
          <span class="metro-stat__detail">学术论文</span>
        </div>
        <i class="fas fa-file-lines metro-tile__icon"></i>
      </a>

      <a href="/talks/" class="metro-tile metro-tile--accent">
        <div class="metro-stat">
          <span class="metro-stat__label">报告</span>
          <span class="metro-stat__value">{{ site.talks.size }}</span>
          <span class="metro-stat__detail">学术报告</span>
        </div>
        <i class="fas fa-microphone metro-tile__icon"></i>
      </a>

      <a href="/portfolio/" class="metro-tile">
        <div class="metro-stat">
          <span class="metro-stat__label">项目</span>
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
        <div class="metro-tile__header">最近文章</div>
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

      <a href="/changelog/" class="metro-tile metro-tile--accent">
        <div class="metro-nav-tile">
          <i class="fas fa-clock-rotate-left metro-nav-tile__icon"></i>
          <span class="metro-nav-tile__label">更新日志</span>
          <span class="metro-nav-tile__desc">版本记录与变更</span>
        </div>
      </a>

      <!-- Row 4: Changelog + Tags + Teaching timeline -->
      <div class="metro-tile metro-tile--wide">
        <div class="metro-tile__header">Changelog</div>
        <ul class="metro-post-list">
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.6</span>
              <span class="metro-post-item__title">双主题首页重构与写作工作流优化</span>
            </a>
          </li>
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.5</span>
              <span class="metro-post-item__title">Metro 风格覆盖列表页</span>
            </a>
          </li>
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.4</span>
              <span class="metro-post-item__title">Metro 磁贴主题 &amp; 双主题切换</span>
            </a>
          </li>
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.3</span>
              <span class="metro-post-item__title">教程系列上线</span>
            </a>
          </li>
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.2</span>
              <span class="metro-post-item__title">毛玻璃导航栏 &amp; 深色模式修复</span>
            </a>
          </li>
          <li>
            <a href="/changelog/" class="metro-post-item">
              <span class="metro-post-item__date">v0.1</span>
              <span class="metro-post-item__title">项目初始化</span>
            </a>
          </li>
        </ul>
        <a href="/changelog/" class="metro-view-all">查看全部 →</a>
      </div>
      <div class="metro-tile metro-tile--wide">
        <div class="metro-tile__header">主题标签</div>
        <div class="metro-tags">
          {% for tag in site.tags %}
            <a href="{{ '/tags/' | relative_url }}#{{ tag[0] | slugify }}" class="metro-tag">{{ tag[0] }}</a>
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
    </div><!-- /.metro-board -->
  </main>

</div><!-- /.metro-dashboard -->
<script src="{{ '/assets/js/metro-board.js' | relative_url }}" defer></script>

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
