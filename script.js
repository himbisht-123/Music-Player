const musicContainer=document.getElementById('music-container');
const playBtn=document.getElementById('play');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progressContainer=document.getElementById('progress-container');
const title =document.getElementById('title');
const cover=document.getElementById('cover');


const songs=['hey','summer','ukulele','flower'];
let songIndex=3;

loadSong(songs[songIndex]);

function loadSong(songs)
{
title.innerText=songs;
audio.src=`music/${songs}.mp3`;
cover.src=`img/${songs}.jpg`;
}

//Play song//
function playSong()
{
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
//pause song//
function pauseSong()
{
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
// previous song//
function prevsong()
{
    songIndex--;
    if(songIndex<0)
    {
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//next song//
function nextsong()
{
   songIndex++;
   if(songIndex>songs.length-1)
   {
       songIndex=0;
   }
   loadSong(songs[songIndex]);
   playSong();
}
function setProgress(e)
{
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;

    audio.currentTime=(clickX/width)*duration;
}
function updateProgress(e)
{
    const{duration, currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}
playBtn.addEventListener('click',()=>
{
    const isplaying=musicContainer.classList.contains('play');
    if(isplaying)
    {
        pauseSong();
    }
    else{
        playSong();
    }
})
prevBtn.addEventListener('click',prevsong);
nextBtn.addEventListener('click',nextsong);

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);