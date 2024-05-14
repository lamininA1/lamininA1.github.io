---
categories: [GitHub, GitHub-blog]
tags: [jekyll, Chirpy, ChirpyTheme, jekyll_chirpy, installation, install, Error]
author: lamininA1
pin: false
published: true
title: "Chirpy Theme 설치 시 나타날 수 있는 오류"
date: Fri May 10 2024 22:32:45 GMT-0400 (북미 동부 하계 표준시)
description: Chirpy Theme을 설치하여 나타날 수 있는 오류들을 모아놓습니다. 본 게시글은 추후 계속 수정됩니다.
---

> 본 게시글은 Chirpy Theme 7.0.0 버전, 2024년 05월 11일 기준으로 작성되었습니다.
> 해당 오류는 이후에 수정 되었을 수 있습니다.

## Build Error

### Error: tzinfo

> 선요약:
> 1. 해당 오류는 _config.yml 에서 Timezone을 설정하면 나타난다.
> 2. tzinfo gem을 설치하는 것으로는 해결할 수 없다.
> ~~3. Timezone은 설정하지 않아도 큰 문제는 없으므로 공란인 상태로 사용하자.~~
> 4. 해결 됐다. gem tzinfo-data를 설치하면 된다.
{: .prompt-tip }


*Chirpy Theme installation guide*를 보고 따라하다 보면 `_config.yml` 파일을 수정하는 단계가 존재한다. 여기에는 치명적인 오류가 있으니, `Timezone`을 설정하면 *Github action* 혹은 *jekyll*을 통한 `local` 상에서의 `page build`에서 오류가 난다는 것이다. 해당 오류는 아무래도 모든 `Timezone` 에 대해서 오류를 나타내는 것으로 보인다.

 `_config.yml` 파일의 내용을 살펴보면 아래처럼 되어있는 것을 확인할 수 있다.

```yaml
# Change to your timezone > https://kevinnovak.github.io/Time-Zone-Picker
timezone: 
```

하라는대로 [Time-Zone-Picker](https://kevinnovak.github.io/Time-Zone-Picker)에 접속하여 `Timezone`에 대한 정보(`Asia/Seoul`)를 얻어서 넣어주고 *Window PowerShell* 혹은 *명령 프롬프트* 등의 `Terminal` 에서 `bundle exec jekyll serve` 를 실행하여 `Local` 상에서 `Page building`을 진행하면 아래와 같은 결과를 얻을 수 있다.

---

```yaml
# Change to your timezone > https://kevinnovak.github.io/Time-Zone-Picker
timezone: Asia/Seoul
```

```powershell
  Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 4.3.3 | Error:  tzinfo
```

---

  읽어보면 해결법은 상당히 쉬워 보인다. `tzinfo` 라는 `gem` 이 존재하지 않아 생기는 오류이기 때문에 `Root dir`에 존재하는 `Gemfile`을 수정하면 된다고 생각된다. `Gemfile`의 맨 아래에 `gem "tzinfo"` 명령어를 추가하고 다시 `Page building` 진행해보면...

```powershell
jekyll 4.3.3 | Error:  No source of timezone data could be found.
Please refer to https://tzinfo.github.io/datasourcenotfound for help resolving this error.
```

~~여전히 오류가 뜬다. 무엇이 문제인지는 모르겠으나 `Page building`에 `Timezone`을 설정해야만 하는게 아니라면 그냥 `_config.yml`에 있는 `Timezone`을 공란으로 남겨놓는 것을 추천한다.~~

> ~~오류를 피하고 싶다면 `_config.yml` 에서 Timezone을 공란으로 남겨놓자!~~

~~우리의 시간은 소중하다. 깊은 단계까지 오류를 찾아서 수정하는 것은 개발자들의 몫으로 남겨놓도록 하자.~~

#### Error: tzinfo; Updated (해결됨)

>Chirpy Github의 issue 란에서 확인할 수 있었다! `gem "tzinfo-data"` 를 추가하자!

세상에나, 원래부터 있던 오류였다. `tzinfo` 대신에 `tzinfo-data`를 사용하면 된다. 루트 폴더에 있는 `Gemfile`을 열고 내부에 `gem "tzinfo-data"`를 추가한다. 이후 루트 폴더 경로의 `terminal`에서 `bundle install`을 입력하고 사이트를 빌드하면 문제 없이 구축된 블로그를 확인할 수 있다.

해당 문제는 Windows 10 이후에서 발생한다. 이는 `Chirpy`가 윈도우 환경에 맞게 개발되지 않았기 때문이다. Installation 문서를 따라하면 도중에 `bash tools/init`을 수행하는 단계가 있는데 여기서 파일의 문법을 읽어내는 방식이 다르기 때문에 Windows에서 수행할 수 없게 된다. WSL system을 이용해서 억지로 수행하게 되면 `tzinfo` 설치에 문제가 생기는 듯 하다. 수동으로 해결할 수 있어 다행인듯...

## Plug-in Error

### Giscus 오류 (해결됨)

![image](/assets/img/2024-05-14-Chirpy-Theme-설치-시-나타날-수-있는-오류-1/Pasted-image-20240514122921.png)

Giscus를 설치하려는 다양한 가이드를 보고 열심히 따라왔음에도 불구하고 위처럼 연결이 거부되는 경우가 있다. 구글 크롬에서 `F12` 버튼을 눌러 확인해보면 아래와 같은 경고 문구를 확인할 수 있다.

```scss
Refused to frame 'https://giscus.app/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'self'".
```

해당 문장으로 인터넷을 열심히 찾아보면 CSP (Content Security Policy)와 연관된 오류로 나타난다고 한다. 여러 곳에서 이것저것 해결방법을 알려주지만 사실 *이게 문제가 아니다.* 사실 해당 문제는 `_config.yml` 파일의 설정 오류로 나타나는 것이다.

이는 사실 `_config.yml` 파일의 `lang:` 을 설정하면서 생기는 오류다. `Chirpy` 테마는 `_data\locales` 폴더에 다양한 언어에 대한 사이트 기본 설정을 가지고 있다. 이것을 참고하여 `_config.yml`의 `lang:` 부분을 `ko-KR` 로 설정하면 `Giscus`는 오류를 나타낸다.

  **Giscus에는 ko-KR에 해당하는 모듈이 없기 때문**이다. 해결 방법으로는 `lang: ko`로만 설정하고 `data\locales`의 `ko-KR.yml`를 `ko.yml`로 바꿔도 되지만 아래처럼 `_config.yml` 파일의 댓글 관련 부분에서 따로 언어를 설정하면 된다.

```yml
# Giscus options › https://giscus.app
  giscus:
    repo: # <gh-username>/<repo>
    repo_id:
    category:
    category_id:
    mapping: # optional, default to 'pathname'
    strict: # optional, default to '0'
    input_position: # optional, default to 'bottom'
    lang: ko # optional, default to the value of `site.lang` # 이 부분을 바꾸면 된다.
    reactions_enabled: # optional, default to the value of `1`
```

