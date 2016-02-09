//takes a youtube link as input, downloads an mp4 as output
// usage example: node https://www.youtube.com/watch?v=E1p0ffBOwHE downloads/2016-02-08-Primavera-de-Filippi-Berkman-Center-at-Harvard.mp4

youtubeLink = process.argv[2];
outputPath = process.argv[3];

var fs = require('fs');
var youtubedl = require('youtube-dl');
var video = youtubedl(youtubeLink,
  // Optional arguments passed to youtube-dl.
  ['--format=mp4'],
  ['--write-info-json'],
  ['--restrict-filenames'],
  ['--write-all-thumbnails'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Download started');
  console.log('filename: ' + info._filename);
  console.log('size: ' + info.size);
  console.log('size: ' + info.size);
});


video.pipe(fs.createWriteStream(outputPath));
