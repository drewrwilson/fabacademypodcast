//TODO:
// add npm github module, so I can check in new post

var scpText = process.env.SCPTEXT;


var postsDir = '_posts/';
var assetsImgDir = 'assets/img/';

//npm module that converts JSON to YAML
YAML = require('yamljs');

//npm module that generates a unique ID based on the current time
UUID = require('uuid');

// request npm module
var request = require('request');

var exec = require('child_process').exec;

var scp = require('scp'); //module for ssh transferring to server

youtubeLink = process.argv[2]; //link to youtube, might need to be http (not https) only
outputPath = process.argv[3]; //path for new file

var newPost = {};
var blogPostFilename = '';

var fs = require('fs'); //npm module for filesystem stuff
var youtubedl = require('youtube-dl'); //npm module for downloading videos
var filename = 'new-video.mp4'; //default filename

var video = youtubedl(youtubeLink,
  // Optional arguments passed to youtube-dl.
  ['--format=mp4'], // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });

//generate a new guid
var uuid = UUID.v1();

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Starting video download');

  //convert filename to no whitespace and dashes:
  filename = info._filename.replace('/:/','').replace(/\s\s+/g, '-').replace(/ +/g, '-').replace(/-+/g, '-');

  //download the thumbnail and save it
  //or generate it, not sure yet. download it now, generate it later.

  var thumbnailImg = filename + '-thumbnail.jpg';

  //for now make full image the same as thumbnail
  var fullImg = thumbnailImg;

  //generate a publish date based on the video date
  // var pubDate = new Date(info.upload_date);

  //make a JSON of all the data related to a new video post
  var todayDate = new Date();
  todayDate = todayDate.toGMTString();

  newPost = {
  "published": "true",
  "title": info.fulltitle,
  "link": info.webpage_url,
  "description": info.description,
  pubDate: todayDate,
  guid: uuid,
  video: {
      url: filename,
      type: "video/mp4",
      size: info.size,
      thumbnail: assetsImgDir + thumbnailImg,
      expression: "full",
      language: "en",
      medium: "video",
      ratingSimple: "nonadult",
      ratingvchip: "tv-g",
      productionCompany: "FabAcademy",
      category: "Technology",
      explicit: "clean",
      duration: info.duration,
      image: assetsImgDir + fullImg
    }
  };
  // console.log('Video info:');
  // console.log(video);

  //convert video JSON to YAML
  var vimeoYAML = '--- \n'; //add to indicate to Jekyll that this is front matter
  vimeoYAML += YAML.stringify(newPost);
  vimeoYAML += '--- \n'; //add to indicate to Jekyll that this is front matter

  //download the thumbnail of the Video
  request(info.thumbnails[0]).pipe(fs.createWriteStream(assetsImgDir + thumbnailImg));

  //output video data as a YAML filename
  blogPostFilename = info.upload_date.substring(0,4) + '-' + info.upload_date.substring(4,6) + '-' + info.upload_date.substring(6,8) + '-' + filename + '.md';
  blogPostFilename = postsDir + blogPostFilename;

  fs.writeFile(blogPostFilename, vimeoYAML, 'utf8', function () {
    console.log('Wrote new blog post: ' + postsDir + blogPostFilename);
  });

});

var fileOutput = outputPath + filename;
video.pipe(yo = fs.createWriteStream(fileOutput));

yo.addListener('finish', function () {

  console.log('Saved video file: ' + filename);
  console.log();
  console.log('****************************************');
  console.log('***');
  console.log('***   Now you need to upload the file and commit the blog post');
  console.log('***');
  console.log('*** scp ' + filename +' ' + scpText);
  console.log('***');
  console.log('***');
  console.log('*** now commit this post to github:');
  console.log('***');
  console.log('*** git add ' + newPost.video.thumbnail + ' ' + postsDir + blogPostFilename);
  console.log('*** git commit -m \'Add new video post: ' + filename + '\'');
  console.log('***');
  console.log('****************************************');

});
