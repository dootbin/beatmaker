/*
    beat_maker.js
    Author: Benjamin Miles
    Class: Programming Fundamentals
    Date: 5/9/2017
    Description: A program that allows a user to create sick beats.
*/

//Global Variables
var baseDrum = [];
var snareDrum = [];
var cowBell = [];
var rimShot = [];
var loop;
var loopBeatActive = false;
var playBeat = true;
var record = false;
var recordTimeStart = 0;
var recordTimeStop = 0;
var stopSounds = false;

/*
  startRecord() is a function to record the start time of the session.
*/
function startRecord() {
  if (record == false) {
    if (snareDrum.length == 0 && cowBell.length == 0 && rimShot.length == 0 && baseDrum.length == 0) {
    recordTimeStart = startTime();
    record = true;
    } else {
      window.alert("You already have something recorded.");
    }
  } else {
    window.alert("You are already recording!")
  }
}


/*
  stopRecord is a function to calculate the recordTimeStop
*/
function stopRecord() {
  if (recordTimeStart == 0 ) {
    window.alert("You need to record something first!");
  } else {
    recordTimeStop = stopTime(recordTimeStart);
    record = false;
  }
}


/*
  startTime is a function to get the time that the session started.
*/
function startTime(){
  var startTime = new Date().getTime();
  return startTime;
}


/*
  stopBeat will stop the beat loop.
*/
function stopBeat() {
  if (loopBeatActive == true){
    loopBeatActive = false;
    clearInterval(loop);
  } else {
    window.alert("No beat playing at this time.")
  }
}

/*
  play() is a function to step though the beat data and execute playSound.
*/
function play(){
  if (snareDrum.length == 0 && cowBell.length == 0 && rimShot.length == 0 && baseDrum.length == 0) {
    window.alert("You must record something first!")
  } else {
    var snareLength = snareDrum.length;
    for (var i = 0; i < snareLength; i++) {
        playSound(playSnare, snareDrum[i]);
    }
    var cowBellLength = cowBell.length;
    for (var i = 0; i < cowBellLength; i++) {
        playSound(playCowBell, cowBell[i]);
    }
    var baseDrumLength = baseDrum.length;
    for (var i = 0; i < baseDrumLength; i++) {
        playSound(playBaseDrum, baseDrum[i]);
    }
    var rimShotLength = rimShot.length;
    for (var i = 0; i < rimShotLength; i++) {
        playSound(playRimShot, rimShot[i]);
    }
  }
}

/*
  function to play sound on a delay (delay is in milliseconds)

  example playSound(baseDrum, 10000);
  will play a sound after 10 seconds(10,000 milliseconds)
*/
function playSound(sound, time) {
  setTimeout(sound, time)
}


/*
  loopBeat is a function that will loop the recorded beat back to the user.
*/
function loopBeat(){
  if (loopBeatActive == false) {
    if (snareDrum.length == 0 && cowBell.length == 0 && rimShot.length == 0 && baseDrum.length == 0) {
      window.alert("You need to record something first");
    } else {
      var intervalTime = stopTime - startTime;
      //must execute play once otherwise there will be a pause as long as the recordTimeStop before the loop plays.
      play();
      loop = setInterval(play, recordTimeStop);
      loopBeatActive = true;
    }
  }
  else {
    window.alert("Already playing the loop");
  }
}

/*
  stopTime is a function to determine the time that the user stopped recording.

  example: stopTime(startTime);
*/
function stopTime(startTime) {
  var stopTime = new Date().getTime();
  var calculatedTime = stopTime - startTime;
  return calculatedTime;
}

/*
  playBaseDrum is a function that will play the baseDrum sound.

  example: playBaseDrum();
*/
function playBaseDrum() {
  var baseDrumSound = new Audio('./sounds/baseDrum.mp3');
  return baseDrumSound.play();
}

/*
  playCowBell is a function that will play the cowBell sound
*/
function playCowBell() {
  var cowBellSound = new Audio('./sounds/cowBell.mp3');
  return cowBellSound.play();
}

/*
  playRimShot() executes rimShot sound.
*/
function playRimShot() {
  var rimShotSound = new Audio('./sounds/rimShot.mp3');
  return rimShotSound.play();
}

/*
  playSnare() executes snare sound.
*/
function playSnare() {
  var snareSound = new Audio('./sounds/snare.mp3');
  return snareSound.play();
}

/*
  snarePress is a function to grab the time of the snareDrum button press and record it.
*/
function snarePress() {
  if (record == true) {
    playSnare();
    var time = new Date().getTime() - recordTimeStart;
    snareDrum.push(time);
  } else {
    playSnare();
  }
}

/*
  snarePress is a function to grab the time of the snareDrum button press and record it.
*/
function baseDrumPress() {
  if (record == true){
    playBaseDrum();
    var time = new Date().getTime() - recordTimeStart;
    baseDrum.push(time);
  } else {
    playBaseDrum();
  }
}

/*
  cowBellPress is a function to grab the time of the cowBell button press and record it.
*/
function cowBellPress() {
  if (record == true) {
    playCowBell();
    var time = new Date().getTime() - recordTimeStart;
    cowBell.push(time);
  } else {
    playCowBell();
  }
}

/*
  rimShotPress is a function to grab the time of the rimShot button press and record it.
*/
function rimShotPress() {
  if (record == true){
    playRimShot();
    var time = new Date().getTime() - recordTimeStart;
    rimShot.push(time);
  } else {
  playRimShot();
  }
}

/*
  clearBeatPress is the function executed when the user presses the clear beat button.
  this will clear the variables and allow the program to be reset to its origonal state.
*/
function clearBeatPress() {
  if (loopBeatActive == true) {
    window.alert("Cannot clear beat well playing loop");
  } else if (record == true) {
    window.alert("Cannot clear beat well recording. Please stop recording and then clear the beat.");
  }   else {
    baseDrum = [];
    snareDrum = [];
    rimShot = [];
    cowBell = [];
    recordTimeStart = 0;
    recordTimeStop = 0;
  }
}
