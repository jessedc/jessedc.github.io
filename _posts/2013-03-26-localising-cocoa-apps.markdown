---
layout: post
title: "Localising Cocoa Apps - Melbourne Cocoaheads August 2012"
date: 2013-03-26 20:48 +1000
comments: true
categories: [presentations]
---

{% highlight objc %}
/* No comment provided by engineer. */
"Next" = "Next";
{% endhighlight %}

> If your Localizable.strings file looks like this then you're probably doing it wrong...

Back in August I presented some best practices for localising your cocoa apps. The presentation centred around my experiences localising my own apps and the realestate.com.au app. I highlighted how using NSLocalizedString properly (or it's more useful cousin NSLocalizedStringFromTable) can make localisation a lot easier and logical.

<img class="center" src="/images/LocalisingApps-August2012.jpg" title="Localising Cocoa Apps - Melbourne Cocoaheads August 2012" alt="Localising Cocoa Apps - Melbourne Cocoaheads August 2012">

The first part of the presentation touched on something most people in the audience could relate too... the [most notorious misuses of NSLocalizedString][5] that I've seen.

I then went onto explain how NSLocalizedString works.

Towards the end I touched on a custom implementation of NSLocalizedString I had been working on aptly named JCLocalizedString that had a compatible interface with NSLocalizedString but would allow switching the active localisation at run time. [JCLocalizedString exists on github][2] in it's early stages.

The presentation slides are up on [github][1] and the video is on [vimeo][3]. The [presentation notes][4] are included with the slides and may be a good reference.

<iframe src="//player.vimeo.com/video/62207569" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/62207569">Localising iOS Apps - Jesse Collis</a> from <a href="http://vimeo.com/user10513709">Melbourne Cocoaheads</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

[1]: https://github.com/jessedc/JCLocalizedStringPreso
[2]: https://github.com/jessedc/JCLocalizedString
[3]: https://vimeo.com/62207569 "Localising iOS Apps - Jesse Collis"
[4]: https://github.com/jessedc/JCLocalizedStringPreso/blob/master/README.md
[5]: {% post_url 2013-03-26-the-worst-misuses-of-localized-strings %}
