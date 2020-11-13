const video=document.querySelector('video');
const progressRange=document.querySelector('.progress-range');
const progressBar=document.querySelector('.progress-bar');
const playButton=document.getElementById('play-btn');
const volumeIcon=document.getElementById('volume-icon');
const volumeRange=document.querySelector('.volume-range');
const volumeBar=document.querySelector('.volume-bar');
const currentTime=document.querySelector('.time-elapsed');
const duration=document.querySelector('.time-duration');
const fullscreenButton=document.querySelector('.fullscreen-btn');

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

playButton.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('ended',showPlayIcon);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);