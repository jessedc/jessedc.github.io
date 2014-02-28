---
layout: post
title: "A lot of transport apps are confusing and inconsistent"
date: 2009-12-03 17:54
comments: true
categories: [design]
---

There's no shortage of apps that will let you sift through lists of stations or tap on a map and work out a way for you to get from A to B in your given city.

I've been working with a pile of transport apps while developing Seoul City Metro and I've noticed a lot of apps fall into the trap of implementing too many non standard UI elements or offer too many different ways to do the same thing at the cost of consistency.

Non standard UI elements are quite common. A lot of developers decide not to adhere to the apple Human Interface Guidelines and instead create their own half baked UI elements. I have found some great examples of non-scalable, non standard implementations that are so bland and basic (or inversely crazy and complex) that it's hard to know what you're doing or what you just did. The time required to lean these UIs can be quite frustrating.

 ![Great example of very non-standard UI](/images/IMG_0982.jpg)

Another issue with the current state of transport apps is the compromise made to consistency in order to offer multiple ways of accessing the same functionality.

Most transport apps provide you with a list of stations you can select via searching or scrolling through via a 'Stations' Tab Bar icon. This interface is then repeated via a 'Routes' Tab bar icon and quite often you can also access the 'Stations' via the 'Lines' Tab Bar icon. My problem with this solution is when the selection of a station name in a list looks the same and behaves differently.

![London Tube App](/images/IMG_0984.jpg)

As is often the case, selecting a station from the 'Stations' tab gives you a detailed overview of the station. In the case of the 'Route' tab it skips the details and provides you with the same interface over again to select another station.

A lot of apps have about 3 ways you can enter into the 'route calculation loop' and I find this overlap pointless and confusing.

Another example is when applications let you tap on a map and use the selection as a 'route start' or 'route end' and then take you to a list or an overlay of the route you've selected. This can be a great feature except when you can get to the same map that behaves differently via three other Tab Bar icons.

In the case of applications with a tab bar interface you can end up with the same screen of information appearing on all or most of the tabs at once by navigating through each Tab Bar icon independently. This is not a good user experience because clicking on a tab bar icon saying 'Stations' can be showing a map if thats how the user haphazardly left it.

My approach to a transport app focuses on the soul purpose of directing the user towards selecting stations. The user will be given ways to select a station by map, name, or nearby then be presented with the detailed view of the station in order to decide what to do with it. After the user has completed an action their selected station (set as route start, or route end), the user navigates back to the main menu to select a second station. Only when a route has been completed are they presented with a 'view route' option.

![Straight forward navigation structure](/images/SeoulCityMetroV1_eng-1.jpg)

So rather than a Tab Bar I have used a single navigation structure to direct the user down a single path at a time to select a station. This provides the user with a linear way of working, keeping them from getting confused between 5 or more tabs that all do similar, overlapping things (and could all be displaying a map at that particular point in time).

I think it saves the user mental processing too. The maximum menu depth a user can get to to view a calculated route is only three screens deep, and if they have used a route before they can get to the calculated route in only two steps. The worst case in the application above (London Tube) can require you to navigate through 5 different screens to view a route and then you need to go back through the whole 5 to start again.

I think simplifying transport apps is the way to go, working and thinking about how to do this all the time.

Seoul City Metro should be hitting the App Store around December 14th, 2011.

[1]: http://twitter.com/seoulmetroapp "Seoul City Metro on Twitter"
