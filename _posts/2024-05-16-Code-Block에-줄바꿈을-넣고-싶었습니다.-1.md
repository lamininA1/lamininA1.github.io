---
categories: [GitHub, GitHub-blog]
tags: [Chirpy, ChirpyTheme, 테마, jekyll_chirpy, Code-block]
author: lamininA1
pin: false
published: true
description: Code-Block에 줄바꿈을 넣고 싶지만 줄바꿈을 적용하면 줄번호를 유지할 수 없습니다. 줄바꿈을 원했던 사람의 찬란한 모험기를 기록하였습니다.
title: "Code-Block에 줄바꿈을 넣고 싶었습니다."
date: Sun May 12 2024 16:27:43 GMT-0400 (북미 동부 하계 표준시)
---

## 서론

본 글은 [Chirpy 테마](https://github.com/cotes2020/jekyll-theme-chirpy)뿐만 아니라 다른 거의 대부분의 _Jekyll_ 블로그에 적용할 수 있는 게시글일 것이다. 우선 대부분의 *Jekyll Theme*에는 루트 폴더 내부에 `_config.yml` 파일이 존재한다. 그곳에는 다양한 설정들이 들어있는데 매우 당연하게도 `Code block`에 대한 설정도 존재한다.
`Code block`은 `Kramdown`과 `highlighter`에 의해 만들어진다. 정확히는 [`Kramdown`](https://kramdown.gettalong.org/), [`Discount Markdown`](https://github.com/davidfstr/rdiscount),[`Redcarpet`](https://github.com/ged/bluecloth), [`Maruku`](https://github.com/bhollis/maruku) 같은 여러 Markdown 문법을 이용해 `.md` 파일 혹은 `.markdown` 파일을 *html 형식*으로 바꿔주는 프로그램이 만든다. 그러나 상기된 프로그램들은 애석하게도 `Code block`을 만들어주지만 그 안에 들어있는 내용들을 알록달록하게 색칠하지 못한다. 이 때 필요한 것이 바로 *highlighter*다! *highlighter*는 이름대로 각 문장들을 `token`화 하여 단어를 뽑고 기존에 저장된 규칙과 알맞으면 이것을 특별한 `class`로 처리해준다. 그리고 이 `class`에 대한 색칠 놀이를 진행할 적절한 `css` 파일이 있으면 비로소 우리가 알고 있는 `Code block`이 완성 되는 것이다!

## 문제점

문제는 바로 *highlighter*에 있다. Code block의 요소들을 판독하여 여러가지 기능을 나타내는 *highlighter*에는 줄 번호를 표시하는 기능이 내장 되어있다. 가장 대표적인 *highlighter*인 [`Rouge`](https://github.com/rouge-ruby/rouge)는 이를 구현하는 방식이 특이하다. Code block을 *Table*로 만들어 해결하는 것이다.

|        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1<br>2 | Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!<br>jekyll 4.3.3 \| Error:  tzinfo |

위 표는 Code block의 실체를 가져온 것이다. 기본적으로 *Chirpy theme*에서는 `syntax.scss` 파일에 아래와 같은 코드를 선언함으로써 사용자가 줄 번호 요소를 선택하지 못하게 막고 있다.

```scss
.lineno {
    text-align: right;
    color: var(--highlight-lineno-color);
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none; /* 이 부분을 all로 바꿔서 선택 가능하게 만들면 위 도표를 얻을 수 있다. */
  }
```

설정을 바꿔서 줄 번호 부분을 선택할 수 있도록 변경하게 되면 저 위의 도표를 볼 수 있다. 문제는 문장 마다 열이 분리된 구조가 아니란 것이다! 그렇기 때문에 줄 바꿈이 허용되면 줄 번호와 우측의 코드가 서로 어긋나게 되는 것이다. 이 문제를 해결하기 위해서 *Highlighter* 기능을 손 보고 싶었다.

## Highlighter_Rouge 속으로

  Jekyll Chirpy blog에서는 `Rouge`에 대한 설정을 `_config.yml`와 `language-alias.html`에서 정의하고 있다. 나머지는 자바스크립트 파일 내에서 설정하고 있는 것 같은데 이런 것은 건들기 어렵기 때문에 우선 저 2개의 파일을 확인해보자.

```yml
kramdown:
  footnote_backlink: "&#8617;&#xfe0e;"
  syntax_highlighter: rouge
  syntax_highlighter_opts: # Rouge Options › https://github.com/jneen/rouge#full-options
    css_class: highlight
    # default_lang: console
    span:
      line_numbers: false
    block:
      line_numbers: true
      start_line: 1
```
{: .file="_config.yml"}

`_config.yml` 파일을 살펴보면 위와 같이 되어있다. 해당 부분에서 알 수 있듯이 `Rouge`에 대한 설정을 따로 하고 싶다면 [Rouge full option](https://github.com/rouge-ruby/rouge#full-options)으로 되어있는 링크를 통해 넣고 싶은 옵션을 확인하고 아래에 추가하면 된다. 저 옵션 사이트를 살펴보면 `Wrap` 관련 기능이 있는 것으로 보이지만 이게 줄 바꿈에 대한 옵션은 아닌 것 같다. 현재까지 열심히 알아본 바로는 *줄 바꿈 기능은 따로 없는 것 같다*. `Rouge`의 설정에 관여하는 다른 파일인 `language-alias.html`에서는 각종 확장자와 그것을 코드 블럭의 헤더 부분에 표시하는 것을 담당하고 있다. 이것도 역시나 줄 바꿈과는 큰 연관이 없다.

### 다른 Highlighter를 써본다면 어떨까?

줄 번호와 줄 바꿈을 유지하기 위해서는 *Highlighter*를 바꿀 필요가 있다. 그래서 [Prism](https://prismjs.com/index.html)이라는 다른 것도 알아 봤으나 실패.. 이것도 줄 번호를 유지하지 못하는 것으로 확인됐다. 이것저것 더 알아봤지만 css 파일과의 연동에도 문제가 생기고 이미 Chirpy 블로그 테마에서 정의해 놓은 다양한 스타일들이 *Rouge* 외의 *Highlighter*에 대해서도 똑같이 적용될 것이라 장담할 수 없다. 따라서... *Highlighter*를 함부로 변경할 순 없다.

> 줄 바꿈을 적용한 채로 줄 번호를 유지하는 것은 불가능하다고 결론 내렸다!


## 빠른 포기와 줄 번호 제거

두 가지 기능을 모두 유지하는 것은 빠르게 포기했다. 그러나 줄 바꿈을 포기할 수는 없다. 코드를 이용하거나 읽으려고 할 때 너무나 가독성이 떨어지기 때문이다. 필자는 [옵시디언](https://obsidian.md/)이라는 프로그램을 이용하여 게시글을 작성하고 있는데 이 *옵시디언*에서는 코드 블럭에 줄 바꿈이 기본으로 장착 되어있다. 이미 여기에 익숙하기 때문에 나는 *Jekyll* 블로그에도 마찬가지로 코드 블럭에 줄 바꿈을 적용하기로 마음 먹었다.
줄 바꿈을 적용하려면 줄 번호를 제거 해야 한다. `_config.yml` 파일에 해당 옵션이 있기 때문에 이를 통해 줄 번호를 손 쉽게 제거할 수 있다. 그런데 줄 번호 제거를 하면 슬픈 현상이 나타난다.

![image](/assets/img/2024-05-16-Code-Block에-줄바꿈을-넣고-싶었습니다-1/Pasted-image-20240516125335.png){: .shadow .rounded-10}
_줄 번호를 제거한 코드 블럭, 폰트 사이즈도 크고 위치도 이상하다._

위처럼 폰트 스타일이나 정렬이 모두 망가지게 된다. 아래의 스크린샷을 비교해보면 차이를 알 수 있을 것이다.

![image](/assets/img/2024-05-16-Code-Block에-줄바꿈을-넣고-싶었습니다-1/Pasted-image-20240516125426.png){: .shadow .rounded-10}
_줄 번호가 있는 코드 블럭, 폰트 사이즈가 작은 것을 알 수 있다._

---

필자는 일반적인 방법으로 이를 제거하지 않았다. 스타일을 유지하기 위해서 `_config.yml`에서 건들지 않고 `css` 파일들을 이용해 제거하기로 했다. 우선은 `syntax.scss` 파일을 변경했다.

```scss
    td {
      &:first-child {
        /* 코드 블락, 줄 번호 관련 */
        display: none; /* defult set: inline-block */
        margin-left: 1rem;
        margin-right: 0.75rem;
      }
```

중간에 위치한 위 부분에서 `display:` 를 `none` 값으로 변경했다. 이렇게 되면 줄 번호는 안 보이지만 여전히 코드들의 위치가 어긋나게 된다. 이를 위해서 `syntax-dark.scss` 파일과 `syntax-light.scss` 파일을 모두 수정해 주었다.

```scss
  .highlight table pre {
    margin: 0;
    white-space: pre-wrap; /* 코드 블락의 줄바꿈 허용 */
    margin-left: 1.5rem; /* 스타일의 통일성 */
  }
```

왼쪽 여백의 크기는 임의로 설정하였다. 이렇게 하여 줄 번호는 없지만 줄 바꿈은 되고 스타일도 유지한 코드 블럭의 생성이 완료 되었다. 꽤나... 우여곡절이 많았다.