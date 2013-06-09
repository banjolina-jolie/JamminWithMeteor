var Tracks = new Meteor.Collection("tracks");


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to HopeYouLikeJamminToo.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.sound.trackaroonies = function(){
    return Tracks.find();
  }

  var streaming;
  // var elRecordo;

  // var insertIntoDatabase = function() {
  //   recorder.exportWAV(function(blob) {
  //     Tracks.insert({
  //       blob: blob
  //     });
  //   });
  // };

  var createDownloadLink = function() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }


  Template.sound.events({
    'click button': function() {
      if(streaming){
      	recorder.stop();
      	console.log(recorder);
        // streaming.stop();

        
        createDownloadLink();
        // insertIntoDatabase();

        recorder.clear();

        streaming = false;
      } else {

      	recorder.record();
      	console.log(recorder);
      	streaming = true;


        // window.URL = window.URL || window.webkitURL;
        // navigator.getMedia = navigator.getUserMedia ||
        //                       navigator.webkitGetUserMedia ||
        //                       navigator.mozGetUserMedia ||
        //                       navigator.msGetUserMedia;
        // navigator.getMedia(
        //   { video: false, audio: true, toString: function() {return "audio";} },

        // function(localMediaStream){
        //   // streaming = localMediaStream;
        //   // var audio = document.querySelector('audio');
        //   // audio.src = window.URL.createObjectURL(localMediaStream);
        //   // elRecordo = new Recorder(localMediaStream);
        //   // recorder.record();
        //   localMediaStream.onended = function(e){
        //     console.log("onended e", e);
        //   };

        // },
        // function(err){ console.log("error: ", err); }
        // );
      }
    }
  });
};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}