FabAcademy 2016 Video Podcast
=====================================

**Current Status: Work in progress**

## What is this?

This project compiles video content from the 2016 [FabAcademy course](http://fabacademy.org) and publishes in an iTunes-compatible video podcast format. The result is that you can subscribe on your phone or computer and automatically download all video content from the course. Between January-June 2016, each Wednesday there will be a lecture from Neil Gershenfeld and a guest lecture every Monday ([see the schedule here](http://archive.fabacademy.org/archives/2016/master/schedule.html)).

This project allows you to subscribe to FabAcademy 2016 via iTunes or automatically download the weekly videos.

## Why?

I'm a student in [FabAcademy](http://fabacademy.org), a 5-month course on digital fabrication. Twice each week there are livestreamed lectures and afterwards they are posted online. The lectures from Professor Neil Gershenfeld are posted on [FabAcademy Vimeo account](https://vimeo.com/fabacademy/videos) every Wednesday. Separately, guest lectures are livestreamed on Google Hangouts and posted on youtube every Monday. Although I prefer to be part of the livestream, it's likely that I'll miss many of these lectures because they generally happen when I'm at work. Instead of manually checking to see when the videos are posted each week, I want to be able to subscribe to this course as a video podcast. I want to automatically download the videos when they are available and watch them on my phone.


## The Problem

There are two problems that make this tricky:
 1. *Vimeo does not offer iTunes podcast feed as a feature.* Apparently people have been asking for this feature [for](https://vimeo.com/forums/topic:1007) [years](https://vimeo.com/forums/feature_requests/topic:5609), but Vimeo still has not done it. Additionally, Vimeo does not allow hotlinking to downloads of videos hosted on their platform.
 1. *Videos for this course are posted on multiple platforms. Vimeo + YouTube* Lectures are posted on vimeo & guest lectures are posted on YouTube. Both of these weekly videos are important parts of the course, but because these videos are on two different platforms it's a little tricky to subscribe.

This project solves these two problems by mirroring the videos and generating a video podcast feed for the course.

## How does this work?

There are two components to this project:

 * *Generating the podcast feed* - We're using [Jekyll](https://jekyllrb.com) for this. Each video is a new post. We also use Jekyll to generate a simple landing page for the podcast.
 * *Hosting video files* - These go on Amazon S3 because it allows us to directly link to the files, unlike Vimeo & YouTube.
 * *Checking for new videos & adding them* - Right now this is manual, in the future it may be automated. This process involves downloading the video from vimeo or youtube, uploading to amazon s3, creating a new post on this Jekyll blog and then pushing the changes to github to regenerate the site, which is hosted on Github Pages.

### Future Improvement: Automation (maybe)

In this initial version of this project, new videos are added manually. This would need to be a backend script that periodically checks for new video files on the FabAcademy Vimeo account and on the FabAcademy youtube account. When there are new videos found, this script downloads them, uploads to Amazon S3 and creates a new post for the video.

#### Rough sketch of the algorithm for automating this

1. get link from rss feed eg `https://vimeo.com/154077397`
1. launch a browser and go to the link (eg `https://vimeo.com/154077397`)
click download button

![[]](screenshots/download-button.png)

1. on popup, click on download HD 720p (css selector: `#download_panel > table > tbody > tr:nth-child(4) > td:nth-child(3) > a`)

![[]](screenshots/download-hd720p.png)

1. do any necessary video conversion for iTunes compatibility (I think none is necessary for HD 720p videos in mp4 format)
1. upload the video file to s3 for direct linking in the podcast URL
1. get a direct link back from s3
1. add a post to the jekyll project, with the link and other metadata
1. regenerate site
1. publish new site to amazon s3 or github pages

This script will be scheduled to run periodically. Maybe every hour or every few hours.
