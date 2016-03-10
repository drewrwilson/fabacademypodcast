//TODO:
// add npm github module, so I can check in new post

// request npm module
var request = require('request');

youtubeLink = process.argv[2]; //link to youtube, might need to be http (not https) only

var youtubedl = require('youtube-dl'); //npm module for downloading videos

var video = youtubedl(youtubeLink,
  // Optional arguments passed to youtube-dl.
  ['--format=mp4'], // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Video url', info.url);
});
