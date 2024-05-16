---
categories: [GitHub, GitHub-blog]
tags: [테마, ChirpyTheme, Chirpy, jekyll_chirpy, jekyll]
author: lamininA1
pin: false
published: true
description: TOC를 바꾸는 간단한 예제입니다. Javascript를 건드려야 하는 경우 특별히 주의점이 필요하기 때문에 작성한 게시글 입니다.
title: "Chirpy Theme-TOC를 바꾸고 싶습니다."
date: Mon May 13 2024 15:49:56 GMT-0400 (북미 동부 하계 표준시)
---

## TOC란 무엇인가?

*A Table of Contents*는 목차다. Chirpy에서는 *TOCBOT*을 이용해서 본문에 있는 *Heading*을 읽고 2단계부터 4단계까지 표현하도록 설계 되어 있다. 아래처럼 말이다.

![image](/assets/img/2024-05-16-Chirpy-Theme-TOC를-바꾸고-싶습니다/Pasted-image-20240514165224.png){: .shadow .rounded-10 .width "230" height "500"}
_TOC는 상당히 이쁘게 잘 뽑힌 것 같다._

그런데 상당히 거슬리는 점은 이것이 **접혀있다**는 것이다! 괘씸하지 않을 수 없다. 여간 거슬리는 것이 아니다! 따라서 이것을 고쳐주도록 하겠다. 방법은 간단하다. *TOC*는 *자바스크립트*를 기반으로 동작하고 있기 때문에 이 자바스크립트 파일을 변경해주면 된다. 해당 파일의 위치는 `_javascript/modules/components/toc.js`이다. 해당 부분에서 아래처럼 코드 한 줄만 더 추가해주면 된다.

```java
export function toc() {
  if (document.querySelector('main h2, main h3')) {
    // see: https://github.com/tscanlin/tocbot#usage
    tocbot.init({
      tocSelector: '#toc',
      contentSelector: '.content',
      ignoreSelector: '[data-toc-skip]',
      headingSelector: 'h2, h3, h4',
      orderedList: false,
      scrollSmooth: false,
      collapseDepth: 5 // 이 부분을 추가하면 된다.
    });
  
    document.getElementById('toc-wrapper').classList.remove('d-none');
  }
}
```

 `collapseDepth` 옵션은 우측에 지정된 숫자 이후부터는 접어놓으라는 명령을 내린다. 어차피 여기는 3 단계의 하위 카테고리만 쓸 수 있게 했기 때문에 3 이상의 숫자면 상관은 없을 것이다. 참고로 해당 옵션은 1~6까지만 지원한다. 자, 이렇게 변경 내용을 적용하고 블로그를 빌드하면!

> 아무런 변화가 나타나지 않는다.

그렇다. 아무런 변화가 나타나지 않는다. 이것은 사실 *Jekyll* 블로그의 작동 방식을 이해해야 하는 부분이다. 다소 어려울 수 있기 때문에 아주 **간략하게 정리**하자면 *Jekyll은 정적인 사이트*만을 만들어낸다. 실시간으로 변화를 반영하지 않는다. 따라서 소스 코드들을 토대로 `_site` 라는 폴더에 `html`으로 **변환한** 파일들을 만들고 이를 보내준다. 특히나 *자바스크립트*의 경우는 최적화를 위해서 인지는 모르겠지만 `*.min.js`라는 꼴로 다시 만들어서 이를 활용한다.
우리가 일반적으로 사용하는 `build exec jekyll serve` 명령어는 `*.min.js` 파일을 다시 만들어내지 않는다. 이는 `Node.js`가 담당하고 있다. 우리는 `Node.js`를 이용해서 다시 한번 `*.min.js`들을 빌드할 필요가 있다.

## Node.js로 자바스크립트 빌드

Jekyll 블로그를 이미 만든 사람이라면 아마 눈치챘을지 모르겠지만 *Windows* 운영체제에서는 Jekyll에 대한 Node.js가 제대로 작동하지 않는다. 이것을 해결하기 위해서 우리는 `WSL` 시스템을 활성화해서 이것으로 사용해야 한다. 이 과정은 상당히 고되고 힘든 작업이다. ~~이미 필자는 많은 부분을 넘어갔다.~~

> 세상에나, 누군가가 자바스크립트를 건들지 않고 해결하는 방법을 알고 있었다. 우측 TOC에서 확인하도록 하자.

필자는 이미 WSL2 를 활성화 하였고 이 또한 VS code와 연동 시켜놨기 때문에 이를 이용해서 손쉽게 자바스크립트를 다시 빌드할 수 있었다. 루트 폴더까지 이동한 뒤에 `npm run build`를 입력하면 제대로 빌드가 될 것이다. 이후에 다시 포스팅을 확인하면 변경 사항이 적용된 아름다운 포스트를 확인할 수 있다!

### 누군가는 Gulp을 사용하라고 하더라.

[Gulp](https://github.com/gulpjs/gulp)은 자동화 프로그램이다. 여러가지 설정 파일을 제공하면 해당 파일에 있는 지시대로 자동 작업을 진행한다고 한다. 이것을 이용하면 *자바스크립트* 파일을 *변경할 때마다* 알아서 빌드를 하고 자동으로 반영하게 된다고 하더라. 그런데... 솔직히 어떻게 쓰는지도 모르겠고 자바스크립트는 빌드 시 시간 소요가 꽤 길어서 딱히 매번 다시 빌드하면서까지 쓰고 싶진 않다.

---

## 훨씬 쉬운 방법으로 TOC를 펼쳐놓기

세상에나, 그런데 훨씬 쉬운 방법이 있었다. 진작에 Chirpy 레포의 디스커션이나 이슈란을 확인할 것을... 하여튼 방법은 아래와 같다. `scss` 파일에 단 한 줄의 코드만 더 작성해주면 되는 것 같다.

```scss
.is-collapsed { max-height: none !important; }
```
{: file='assets/css/jekyll-theme-chirpy.scss'}

참고 링크: [Github discussions page](https://github.com/cotes2020/jekyll-theme-chirpy/discussions/1706)

시간 낭비한 기분... 슬프다.
