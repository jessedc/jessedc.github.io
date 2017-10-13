---
layout: post
title: Automatically Generating your Swift API Client with Swagger and Swagger Codegen
date: 2017-04-13 18:45 +1000
comments: true
categories: presentations
---

At the April 2017 Melbourne CocoaHeads meetup I presented on using [Swagger Codegen][swagger codegen] to automatically generate a Swift 3 API client based on a Swagger spec. 

I started with an introduction to Swagger using a spec for the Melbourne CocoaHeads [Events API spec][events api] and implemented a basic [CocoaHeads iOS project][cocoaheads ios].

At the September "Swift 4" meetup I presented a quick five minute demo generating Swift 4 code from swagger codegen. The main purpose was to show the reduction in the amount of boilerplate code generated for Swift 4.

<iframe id="ytplayer1" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/EzKwi-u9jQo"
  frameborder="0"></iframe>

<iframe id="ytplayer2" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/An47kIMpdjo"
  frameborder="0"></iframe>

[events api]: https://github.com/melbournecocoa/events-api-spec
[swagger codegen]: https://github.com/swagger-api/swagger-codegen
[cocoaheads ios]: https://github.com/melbournecocoa/cocoaheads-ios