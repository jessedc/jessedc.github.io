---
layout: post
title: "The absolute worst misuses of localised strings"
date: 2013-03-26 21:47
comments: true
categories: cocoa
---

As a followup to posting my [Localising Cocoa Apps][1] talk I thought I'd outline some of my favourite localised string failures.

The "I heard literal strings in code are bad" kind of localisation

{% highlight objc %}
NSLocalizedString(@"Next", @"");
NSLocalizedString(@"Next", nil);
{% endhighlight %}

The "WTF is the comment for anyway" kind of localisation

{% highlight objc %}
NSLocalizedString(@"Next", @"Next");
{% endhighlight %}

The "out of sight out of mind" kind of localisation

{% highlight objc %}
#define MYBadCompanyLocalizedString(key) NSLocalizedString((key), @"")
{% endhighlight %}

> Yes, that's redefining the macro to hide the comment... 

The "entire book as a key" kind of localisation

{% highlight objc %}
NSLocalizedString(@"In order to determine your location, location services must be turned on in settings", @"In order to determine your location, location services must be turned on in settings");
{% endhighlight %}

The "key can be anything but I know what it is"  kind of localisation

{% highlight objc %}
NSString *aStringFromAPI = [response objectForKey:@"next-title"];
NSLocalizedString(aStringFromAPI, @"api resposne for `next`");
{% endhighlight %}

# The _grey area_

### Duplicating keys

This is in the grey area because good distinct comments can make duplicating keys manageable as good comments show you the key's appearances in your app in the .strings file.

{% highlight objc %}
NSLocalizedString(@"Next", @"RootViewController 'next' button title");
NSLocalizedString(@"Next", @"DetailViewController 'next page' button title");

//Localizable.strings
// DetailViewController 'next page' button title
// RootViewController 'next' button title
"Next" = "Next";
{% endhighlight %}

 * `genstrings` will warn you about duplicate keys
 * Bad/stupid/empty comments make this a *bad offender*
 * keys with `nil` or `@""` comments aren't picked up as duplicate


### Using localised strings in format strings

This is in the _grey_ area because it's inflexible and implies a structure, but can be okay for small strings. Often you should consider NSNumberFormatter for numbers

{% highlight objc %}
button.titleLabel.text = [NSString stringWithFormat:@"4 %@, 3 %@", 
                          NSLocalizedString(@"pineapples",@"plural pineapples"),
                          NSLocalizedString(@"pears",@"plural pears")];
{% endhighlight %}

### Localising the format string too

This is in the grey area because at this point we've got localised pieces everywhere. _But it's good that you're trying though..._

{% highlight objc %}
button.titleLabel.text = [NSLocalizedString stringWithFormat:
                          NSLocalizedString(@"4 %@, 3 %@", @"fruit quantities format string"),
                          NSLocalizedString(@"pineapples",@"plural pineapples"),
                          NSLocalizedString(@"pears",@"plural pears")];
{% endhighlight %}

[1]: {% post_url 2013-03-26-localising-cocoa-apps %}
