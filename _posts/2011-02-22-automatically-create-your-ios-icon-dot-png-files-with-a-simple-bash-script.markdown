---
layout: post
title: "Automatically create your iOS Icon.png files with a simple bash script"
date: 2011-02-22 13:00
comments: true
categories: [open source]
---

I was recently made aware of the very handy [sips(1) command line tool][1]. Sips is short for *Scriptable Image Processing System*; it is more or less a command line front end to some of Apple's processing abilities.

My problem that day was *How can I automatically resize my Icon.png artwork* and all of a sudden with the knowledge of sips' existence it was easy to write a small bash script to rename and resize my large 512x512 pixel artwork down to the various names and sizes required by iOS. (Thanks [Mark][2]!)

The script is simple. Give it an input PNG image at least 1024x1024 pixels and it will create your Icon.png and derivatives nicely. The sizes required at any one time are all outlined in the [Application Icons][3] section of the iOS Application Programming Guide.

This script should save you at least a dollar on the similar GUI apps on the app store that do the same thing..

Checkout the [gist][4]

{% gist 837916 %}

**Update 2013** updated with new image sizes.

[1]: http://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/sips.1.html "sips documentation at Apple"
[2]: http://twitter.com/markbate "@markbate on Twitter""
[3]: http://developer.apple.com/library/ios/#documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/App-RelatedResources/App-RelatedResources.html "Application Icon Sizes as documented by Apple"
[4]: https://gist.github.com/jessedc/837916#file-ios-icon-png-bash-script
