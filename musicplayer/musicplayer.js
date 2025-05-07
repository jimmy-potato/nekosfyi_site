// initiate variables
let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

//imagetest
let track_image = document.querySelector(".track-image");
//track list container
let track_list_container = document.querySelector('.track-list-container');

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// create new audio element
let curr_track = document.getElementById("music");

// ADD SONGS HERE
// UPLOAD FILES TO catbox.moe OR STORE LOCALLY

/* ADD SONG TEMPLATE

{
    name: "songname",
    artist:"artistname",
    image:"imageurl",
    path: "mp3url",
},

*/
let track_list = [
    {
        name:"Misty Memory (Day Version)",
        artist:"Monster Siren Records",
        image:"https://files.catbox.moe/uvw3gd.jpg",
        path:"https://files.catbox.moe/z9zuz6.mp3"
    },
    {
        name:"mede:mede",
        artist:"Reol",
        image:"https://files.catbox.moe/lec80s.jpg",
        path:"https://files.catbox.moe/hhiitv.mp3"
    },
    {
        name:"SloWMoTIoN",
        artist:"PinocchioP",
        image:"https://files.catbox.moe/bfcs3n.jpg",
        path:"https://files.catbox.moe/37kvor.mp3"
    },
    {
        name: "ひとり旅",
        artist:"瀬名航 ft. 鎖那",
        image:"https://files.catbox.moe/l41i1m.jpg",
        path: "https://files.catbox.moe/sbb6v2.mp3",
    },
    {
        name: "虹を編めたら",
        artist:"Fhana",
        image:"https://files.catbox.moe/whawa9.jpg",
        path: "https://files.catbox.moe/q1ioeo.mp3",
    },
    {
        name: "しあわせになんてならないで",
        artist:"Aiobahn ft. ナナヲアカリ",
        image:"https://files.catbox.moe/vx4ord.jpg",
        path: "https://files.catbox.moe/8g8qul.mp3",
    },
    {
        name: "Sebatas Video Call",
        artist:"Kobo Kanaeru",
        image:"https://files.catbox.moe/ue2cwb.jpg",
        path: "https://files.catbox.moe/e6da8x.mp3",
    },
    {
        name: "Routine",
        artist:"Silent Siren",
        image:"https://files.catbox.moe/gtdalz.jpg",
        path: "https://files.catbox.moe/unjgu9.mp3",
    },
    {
        name: "Drop Pop Candy",
        artist:"Reol",
        image:"https://files.catbox.moe/g0v380.jpg",
        path: "https://files.catbox.moe/oamv16.mp3",
    },
    {
        name: "Divinity",
        artist:"Porter Robinson ft. Amy Millan",
        image:"https://files.catbox.moe/zn43fb.jpg",
        path: "https://files.catbox.moe/7u2hew.mp3",
    },
];


function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    // load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // update details of the track
    track_image.src = track_list[track_index].image;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "Playing " + (track_index + 1) + " of " + track_list.length;

    // set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // move to the next track if the current one finishes playing
    curr_track.addEventListener("ended", nextTrack);

}

// reset values
function resetValues(){
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
}

// load the first track in the tracklist
loadTrack(track_index);

// checks if song is playing
function playpauseTrack(){
    if (!isPlaying) playTrack();
    else pauseTrack();
}

// plays track when play button is pressed
function playTrack(){
    curr_track.play();
    isPlaying = true;

    // replace icon with the pause icon
    playpause_btn.innerHTML = '<span class="material-icons" style="font-size:40px;">pause</span>';
}

// pauses track when pause button is pressed
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<span class="material-icons" style="font-size:40px;">play_arrow</span>';
}

// moves to the next track
function nextTrack(){
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

// moves to the previous track
function prevTrack(){
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

// seeker slider
function seekTo(){
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

// volume slider
function setVolume(){

    //use expoential volume instead
    curr_track.volume = Math.pow(volume_slider.value / 300, 2);
    //curr_track.volume = volume_slider.value / 100;
}

setVolume();

function seekUpdate(){
    let seekPosition = 0;

    // check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // adding a zero to the single digit time values
        if (currentSeconds < 10){ currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10){ durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10){ currentMinutes = currentMinutes; }
        if (durationMinutes < 10){ durationMinutes = durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function listToTable() {
    const trackTable = document.createElement('table');
    track_list.forEach((track, index) => {

        // create row and cell for each song
        const trackRow = document.createElement('tr');
        const trackCell = document.createElement('td');
        trackCell.classList.add('track-item');  // class to change style
        trackCell.innerHTML = (index + 1) + ') ' + track.name;  // adds name and number to cells

        // change song when clicked
        trackCell.addEventListener('click', () => {
            track_index = index;
            loadTrack(track_index);  // Load the selected track
            playTrack();             // Start playing the track
        });

        trackRow.appendChild(trackCell);
        trackTable.appendChild(trackRow);
    });
    track_list_container.appendChild(trackTable);
}

listToTable();