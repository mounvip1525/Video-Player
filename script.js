const player=document.querySelector('.container');
const video=document.querySelector('video');
const progressRange=document.querySelector('.progress-range');
const progressBar=document.querySelector('.progress-bar');
const playButton=document.getElementById('play-btn');
const volumeIcon=document.getElementById('volume-icon');
const volumeRange=document.querySelector('.volume-range');
const volumeBar=document.querySelector('.volume-bar');
const currentTime=document.querySelector('.time-elapsed');
const duration=document.querySelector('.time-duration');
const speed=document.querySelector('.player-speed');
const fullscreenButton=document.querySelector('.fullscreen');

//Play and Pause
function showPlayIcon(){
    playButton.classList.replace('fa-pause','fa-play');
    playButton.setAttribute('title','Play');
}
function togglePlay(){
    if(video.paused){
        video.play();
        playButton.classList.replace('fa-play','fa-pause');
        playButton.setAttribute('title','Pause');
    }
    else{
        video.pause();
        showPlayIcon();
    }
}

//Updating the time format for current time and total duration
function displayTime(time){
    const minutes=Math.floor(time/60);
    let seconds=Math.floor(time%60);
    seconds=seconds>9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

//Updating the progress bar and the time elements
function updateProgress(){
    // console.log('currenTime',video.currentTime,'Duration',video.duration);
    progressBar.style.width=`${(video.currentTime/video.duration)*100}%`;
    currentTime.textContent=`${displayTime(video.currentTime)} / `;
    duration.textContent=displayTime(video.duration);
}

//For jumping between different parts of video on clicking on the width of the progressbar
function setProgress(e){
    // console.log(e);
    const newTime=e.offsetX/progressBar.offsetWidth;
    // console.log(newTime);
    progressBar.style.width=`${newTime * 100}%`;
    video.currentTime=newTime*video.duration;
}

//Volume controls
function setVolume(e){
    let prevVolume=1;
    let volume=e.offsetX/volumeRange.offsetWidth;
    //console.log(volume);
    if(volume<0.1){
        volume=0;
    }
    if(volume>0.8){
        volume=1;
    }
    volumeBar.style.width=`${volume*100}%`;
    video.volume=volume;
    //change the volume icon
    volumeIcon.className='';
    if(volume>0.7){
        volumeIcon.classList.add('fas','fa-volume-up');
    }
    else if (volume<0.7 && volume >0){
        volumeIcon.classList.add('fas','fa-volume-down');
    }
    else{
        volumeIcon.classList.add('fas','fa-volume-off');
    }
    prevVolume=volume;
}

// Mute/Unmute
function toggleMute(){
    volumeIcon.className='';
    if(video.volume){
        prevVolume=video.volume;
        volumeBar.style.width=0;
        video.volume=0;
        volumeIcon.classList.add('fas','fa-volume-mute');
        volumeIcon.setAttribute('title','Unmute');
    } else {
        video.volume=prevVolume;
        volumeBar.style.width=`${prevVolume*100}%`;
        volumeIcon.classList.add('fas','fa-volume-up');
        volumeIcon.setAttribute('title','Mute');
    }
}

//Play back speed
function setPlaySpeed(){
    // console.log('Video Playback rate',video.playbackRate);
    // console.log('Selected value',speed.value);
    video.playbackRate=speed.value;
}

//Full screen
 /* Open fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

  let fullscreen=false;
// Toggle fullscreen
function toggleFullscreen(){
    if(!fullscreen){
        openFullscreen(player);
    }
    else{
        closeFullscreen();
    }
    fullscreen=!fullscreen;
}

playButton.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('ended',showPlayIcon);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',setVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change',setPlaySpeed);
fullscreenButton.addEventListener('click',toggleFullscreen);