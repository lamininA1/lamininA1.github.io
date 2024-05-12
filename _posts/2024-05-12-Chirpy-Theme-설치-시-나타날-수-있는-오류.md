---
categories: [Github blog 만들기, Chirpy Theme]
tags: [jekyll, Chirpy, ChirpyTheme, jekyll_chirpy, installation, install, Error]
author: lamininA1
pin: false
published: true
title: "Chirpy Theme 설치 시 나타날 수 있는 오류"
date: Fri May 10 2024 22:32:45 GMT-0400 (북미 동부 하계 표준시)
---

> 본 게시글은 Chirpy Theme 7.0.0 버전, 2024년 05월 11일 기준으로 작성되었습니다.
> 해당 오류는 이후에 수정 되었을 수 있습니다.

## Build Error

### Error: tzinfo

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

여전히 오류가 뜬다. 무엇이 문제인지는 모르겠으나 `Page building`에 `Timezone`을 설정해야만 하는게 아니라면 그냥 `_config.yml`에 있는 `Timezone`을 공란으로 남겨놓는 것을 추천한다.

> 오류를 피해가는 방법으로 `_config.yml` 에서 Timezone을 설정하지 않도록 하자.

우리의 시간은 소중하다. 깊은 단계까지 오류를 찾아서 수정하는 것은 개발자들의 몫으로 남겨놓도록 하자.