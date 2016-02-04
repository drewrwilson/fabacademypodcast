---
####################
#
# This is a layout for an iTunes-compatible video podcast feed.
# Below is sample data from the DemocracyNow video podcast. If you're making
# your own video podcast, update the info below.
#
########

title: Democracy Now! Video
rssURL: http://www.democracynow.org/podcast-video.xml
webpageURL: http://www.democracynow.org/
description: "Democracy Now! is an independent daily TV &amp; radio news program, hosted by award-winning journalists Amy Goodman and Juan Gonz&#225;lez. We provide daily global news headlines, in-depth interviews and investigative reports without any advertisements or government funding. Our programming shines a spotlight on corporate and government abuses of power and lifts up the stories of ordinary people working to make change in extraordinary times. Democracy Now! is live weekdays at 8am ET and available 24/7 through our website and podcasts."
language: en-US
webMaster: "mail@democracynow.org (Democracy Now!)"
image:
  url: http://www.democracynow.org/images/dn-logo-for-podcast.png?201601281344
  width: 144
  height: 144
itunes:
  author: Democracy Now!
  category: News &amp; Politics
  category2: Government &amp; Organizations
  category3: Non-Profit
  email: webdev@democracynow.org
  name: David Prude
  explicit: clean

---

<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{{page.title}}</title>
    <atom:link rel="self" href="{{page.rssURL}}" title="{{page.title}}" xmlns:atom="http://www.w3.org/2005/Atom"/>
    <link>{{page.webpageURL}}</link>
    <description>{{page.description}}</description>
    <language>{{page.language}}</language>
    <webMaster>{{page.webMaster}}</webMaster>
    <image>
      <url>{{page.icon.url}}</url>
      <link>{{page.webpageURL}}</link>
      <width>{{page.image.width}}</width>
      <height>{{page.image.height}}</height>
      <title>{{page.title}}</title>
    </image>
    <itunes:author>{{page.itunes.author}}</itunes:author>
    <itunes:category text="{{page.itunes.category}}"/>
    <itunes:category text="{{page.itunes.category2}}">
      <itunes:category text="{{page.itunes.category3}}"/>
    </itunes:category>
    <itunes:owner>
      <itunes:email>{{page.itunes.email}}</itunes:email>
      <itunes:name>{{page.itunes.name}}</itunes:name>
      <!-- Note: this email address is for iTunes use only; other contacts here will be ignored. -->
    </itunes:owner>
    <itunes:explicit>{{page.itunes.explicit}}</itunes:explicit>
    <itunes:image href="{{page.image.url}}"/>
    <docs>http://www.rssboard.org/rss-specification</docs>

    {% for item in site.posts %}
    <item>
      <title>{{item.title}}</title>
      <link>{{item.link}}</link>
      <description>{{item.description}}</description>
      <pubDate>{{item.pubDate}}</pubDate>
      <guid isPermaLink="false">{{item.guid}}</guid>
      <enclosure url="{{item.video.url}}" type="{{item.video.type}}" length="{{item.video.size}}"/>
      <media:thumbnail url="{{item.video.thumbnail}}"/>
      <media:content url="{{item.video.url}}" fileSize="{{item.video.size}}" expression="{{item.video.expression}}" type="{{item.video.type}}" duration="{{item.video.duration}}" lang="{{item.video.language}}" medium="{{item.video.medium}}">
        <media:title type="plain">{{item.video.title}}</media:title>
        <media:description>{{item.video.description}}</media:description>
        <media:rating scheme="urn:simple">{{item.video.ratingSimple}}</media:rating>
        <media:rating scheme="urn:v-chip">{{item.video.ratingvchip}}</media:rating>
        <media:credit role="production company">{{item.video.productionCompany}}</media:credit>
        <media:category>{{item.video.category}}</media:category>
      </media:content>
      <itunes:author>{{item.author}}</itunes:author>
      <itunes:explicit>{{item.video.explicit}}</itunes:explicit>
      <itunes:duration>{{item.video.duration}}</itunes:duration>
      <itunes:summary>
        <![CDATA[{{item.video.description}}]]>
      </itunes:summary>
      <itunes:image href="{{item.video.image}}"/>
      <content:encoded>
        <![CDATA[<h1>{{item.video.title}}</h1>
    <p>
    {{item.video.description}}
    </p>
    <p><a href="{{item.video.url}}">Download this show</a></p>]]>
      </content:encoded>
    </item>
    {% endfor %}


  </channel>
</rss>
