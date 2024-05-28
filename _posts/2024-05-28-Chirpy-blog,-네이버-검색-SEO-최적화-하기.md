---
categories: [GitHub, GitHub-blog]
tags: [Chirpy, ChirpyTheme, jekyll, jekyll_chirpy, SEO]
author: lamininA1
pin: false
published: true
description: 네이버 서치어드바이저에 사이트를 등록했는데 뭔가 문제가 생긴 것 같다. Chirpy 블로그를 수정해서 SEO 검색에 최적화 될 수 있도록 변경해보자.
title: "Chirpy blog, 네이버 검색 SEO 최적화 하기"
date: Mon May 27 2024 21:22:01 GMT-0400 (북미 동부 하계 표준시)
---

[네이버 서치어드바이저](https://searchadvisor.naver.com/)에 사이트를 등록했다. 주기적으로 확인해보다가 이제서야 색인이 만들어졌다길래 한번 살펴보았다.

![image](/assets/img/2024-05-28-Chirpy-blog-네이버-검색-SEO-최적화-하기1/Pasted-image-20240528103354.png){: .shadow .rounded-10}

**SEO** 부분에서 `<H1>` 요소가 여러 개 발견 되었다는 경고 문구가 뜬다. 물론 이걸로 인해서 사이트 검색에 제한이 있거나 그런 것은 아니다. 실제로 내 블로그가 네이버에서 어떻게 검색 되는지 살펴보면 아래 처럼 나타난다.

![image](/assets/img/2024-05-28-Chirpy-blog-네이버-검색-SEO-최적화-하기1/Pasted-image-20240528103628.png){: .shadow .rounded-10}

`<H1>` 요소를 가지고 있는 **글 제목**과 **블로그 제목**이 함께 표시되는 것을 볼 수 있다. 뭐... 이렇게 나오게 되면 오히려 좋은 것 같다는 생각이 들지만 그래도 *네이버 서치어드바이저*에서 경고 문구를 띄우고 있으니까 한번 수정해주도록 하자.

문제가 되는 요소는 `_include/sidebar.html`이다. 왼쪽 패널에 있는 블로그 제목이 `<H1>`으로 선언되었기 때문이다.

```html
    <h2 class="site-title">
      <a href="{{ '/' | relative_url }}">{{ site.title }}</a>
    </h2>
```

위와 같이 `<h1>`으로 되어있던 부분들을 `<h2>`로 바꿔주면 손쉽게 해결할 수 있을 것이다. 이제 이것을 업로드하고 *네이버 서치어드바이저*에서 *페이지 수집 요청*을 다시 진행하면 해결 될 수 있을 것으로 생각된다.