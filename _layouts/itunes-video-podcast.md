---
####################
#
# This is a layout for an iTunes-compatible video podcast feed.
# Below is sample data from the DemocracyNow video podcast. If you're making
# your own video podcast, update the info below.
#
########

---

<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{{site.title}}</title>
    <atom:link rel="self" href="{{site.domain}}{{site.rssURL}}" title="{{site.title}}" xmlns:atom="http://www.w3.org/2005/Atom"/>
    <link>{{site.webpageURL}}</link>
    <description>{{site.description}}</description>
    <language>{{site.language}}</language>
    <webMaster>{{site.webMaster}}</webMaster>
    <image>
      <url>{{site.domain}}{{site.image.url}}</url>
      <link>{{site.webpageURL}}</link>
      <width>{{site.image.width}}</width>
      <height>{{site.image.height}}</height>
      <title>{{site.title}}</title>
    </image>
    <itunes:author>{{site.itunes.author}}</itunes:author>
    <itunes:category text="{{site.itunes.category}}"/>
    <itunes:category text="{{site.itunes.category2}}">
      <itunes:category text="{{site.itunes.category3}}"/>
    </itunes:category>
    <itunes:owner>
      <itunes:email>{{site.itunes.email}}</itunes:email>
      <itunes:name>{{site.itunes.name}}</itunes:name>
      <!-- Note: this email address is for iTunes use only; other contacts here will be ignored. -->
    </itunes:owner>
    <itunes:explicit>{{site.itunes.explicit}}</itunes:explicit>
    <itunes:image href="{{site.domain}}{{site.image.url}}"/>
    <docs>http://www.rssboard.org/rss-specification</docs>

    {% for item in site.posts %}
    <item>
      <title>{{item.title}}</title>
      <link>{{item.link}}</link>
      <description>{{item.description}}</description>
      <pubDate>{{item.pubDate}}</pubDate>
      <guid isPermaLink="false">{{item.guid}}</guid>
      <enclosure url="{{site.downloadsDirectoryURL}}{{item.video.url}}" type="{{item.video.type}}" length="{{item.video.size}}"/>
      <media:thumbnail url="{{site.domain}}{{item.video.thumbnail}}"/>
      <media:content url="{{site.downloadsDirectoryURL}}{{item.video.url}}" fileSize="{{item.video.size}}" expression="{{item.video.expression}}" type="{{item.video.type}}" duration="{{item.video.duration}}" lang="{{item.video.language}}" medium="{{item.video.medium}}">
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
      <itunes:image href="{{site.domain}}{{item.video.image}}"/>
      <content:encoded>
        <![CDATA[<h1>{{item.video.title}}</h1>
    <p>
    {{item.video.description}}
    </p>
    <p><a href="{{site.downloadsDirectoryURL}}{{item.video.url}}">Download this show</a></p>]]>
      </content:encoded>
    </item>
    {% endfor %}


  </channel>
</rss>
