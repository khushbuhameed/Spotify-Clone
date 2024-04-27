//  console.log("javascript");

 let currentSong = new Audio();
 let songs;

 function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds < 0){
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds %60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
 }

 async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as =  div.getElementsByTagName("a")

    let songs = [];
    for(let i=0; i<as.length; i++){
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
  return songs;
}

//playmusic function

const  playMusic  =(track,pause=
    false)=>{
    // let audio = new Audio("/songs/" +track)
     currentSong.src = "/songs/" + track;
     if(!pause){
        currentSong.play(); 
     }
    
     play.src = "icons8-pause-96.png"
     document.querySelector(".songinfo").innerHTML = decodeURI(track)
     document.querySelector(".songtime").innerHTML = "00:00/00:00";
}

 async function main(){

    // let currentSong = new Audio();
    // Get the list of all songs
    songs  = await getSongs();
    playMusic(songs[0], true)
    // console.log(songs);
    
    //show all the songs in the playlist

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="image/musical-note.png" width="30px" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
            <div>KhushbuHameed</div>
        </div>
        <div class="playnow">
            <span >Play Now</span>
            <img   src="image/play-button (1).png" width="20px" alt="">
        </div> </li>`;
    }

    //attach an event listener to each songs
   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
     e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)
     })
   })
//attach an event listener to play next and previous
   play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong .play()
        play.src = "icons8-pause-96.png"
    }
    else{
        currentSong.pause();
        play.src = "play-button-arrowhead.png"
    }
   })

   //listen for time update event
   currentSong.addEventListener("timeupdate", ()=>{
      console.log(currentSong.currentTime, currentSong.duration);  
      document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/
      ${secondsToMinutesSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
   })
   //Add an event listener to seekbar
   document.querySelector(".seekbar").addEventListener("click", e=>{
    let persent = (e.offsetX / e.target.getBoundingClientRect().width) *10;  
    document.querySelector(".circle").style.left = persent + "%";
    currentSong.currentTime =((currentSong.duration) *persent) / 10;
   })

   //add event listener for hamburger
   document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = 0;
   })
  //add event listener for close button x
   document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-130%";
   })
   //add an event listener  to previous and next
   previous.addEventListener("click", ()=>{
    console.log("Previous is clicked");
    console.log(currentSong);
    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if((index-1) >= 0){
        playMusic(songs[index-1]);
    }
   })
  
   next.addEventListener("click", ()=>{
    console.log("Next is clicked");

    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if((index+1) < songs.length){
        playMusic(songs[index+1]);
    }
   
   })

   //add event listener to volume
   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    console.log(e, e.target, e.target.value);
    currentSong.volume = parseInt(e.target.value)/100;
   })
  
}   
main()



