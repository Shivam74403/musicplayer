console.log("Welcome to spotify")

// Initilize the varibles

let songIndex = 0;
let audioElement = new Audio('Image/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))

let songs = [
    { songName: "Aarti", filePath: "Image/1.mp3", coverPath: "Image/1.jpeg" },
    { songName: "Taal 2.0", filePath: "Image/2.mp3", coverPath: "Image/2.jpeg" },
    { songName: "Taal 3.0", filePath: "Image/3.mp3", coverPath: "Image/3.jpeg" },
    { songName: "Zankar 2.0", filePath: "Image/4.mp3", coverPath: "Image/4.jpeg" }
]

songItems.forEach((element, i) => {
    // console.log(element, i)
    element.getElementsTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

// Handles  play/pause click:
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listens to Events:

audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    MyProgressBar.value = progress;
})

MyProgressBar.addEventListener('change', () => {
    audioElement.currentTime = MyProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Image/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Image/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Image/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})