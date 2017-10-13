---
layout: post
title: "Adding a 'pull to refresh' control to a UITableView"
date: 2010-07-01 23:00 +1000
comments: true
categories: [open source]
---

Today I was tooling around with some interface concepts and playing with apps like foursquare and Twitter (previously Tweetie) and I wondered if I could implement something similar to the now famous 'pull down to refresh' method of initialising a refresh of the content within a UITableView.

As it turns out it wasn't as difficult as I thought; There were already a couple of elegant solutions out and about. The first example I found was by [Oliver Dropnik][1], which talked about altering an existing solution posted on git hub by user devindoty called [EGOTablePullViewRefresh][1].

Oliver's code looked like it was a good addition to devindoty's because he had decided to subclass UITableViewController which leads to a much more complete solution that's easier to move between projects. My only issue with Oliver's code was that it refactored a lot of the underlying implementation, where I didn't see too much wrong with it.

I decided to come up with a half way measure. I moved the majority of the grunt work into a subclass of UITableViewController, cleaned up the Xcode demo project included with the source code and pushed it all back up to github. If you're at at all interested in this, I'd suggest checking out [my fork][3] of the EGOTablePullViewRefresh project.

![pull-to-refresh effect like Tweetie 2 and foursuare](/images/pull-to-refresh.png)

**Update 23/2/2013:** Apple has implemented this functionality in iOS 6 with UIRefreshControl, I would use that instead.

[1]: http://www.drobnik.com/touch/2009/12/how-to-make-a-pull-to-reload-tableview-just-like-tweetie-2
[2]: http://github.com/enormego/EGOTableViewPullRefresh
[3]: http://github.com/jessedc/EGOTableViewPullRefresh
