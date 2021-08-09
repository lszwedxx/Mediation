
const lotus = document.querySelector(".wrapper__btn");
const startBtn = document.querySelector(".timer__btn");
const clock = document.querySelector(".timer__time");
const time = document.querySelector(".timer__options");
const noise = document.querySelectorAll(".list__sound");
const clockBorder = document.querySelector(".svg__circle");
let length = clockBorder.getTotalLength()
let counting;
let pausedTime;
let pause=true;
let sound=null

//Draw circle countdown
const drawCircle = (timeLeft) =>{
    seconds = timeLeft/1000;
    let t = length/seconds;
    clockBorder.style.strokeDashoffset=length - t;
    length = length - t;
}
//Play untill time out
const timeCheck = e =>{
    const sound = e.target;
    if(sound.currentTime>sound.duration-1){
        sound.currentTime=1;
    }
}
// Set what is playing
const setSound = e =>{
    if(!pause){
        return
    }
    const sounds = document.querySelectorAll(".list__btn");
    sound = e.target.children[1];
    sounds.forEach(item=>{
        item.classList.remove("played");
    })
    e.target.classList.toggle("played");
}
//Show icons and clock
const show = e =>{
    const icon = document.querySelectorAll(".list__item");
    const timer = document.querySelector(".timer");
    const listBtn = document.querySelectorAll(".list__btn");
    icon.forEach(item=>{
        const dataClass = item.dataset.sound;
        item.classList.add(`list__item--${dataClass}`);
    })
    listBtn.forEach(btn =>{
        btn.addEventListener("click",setSound)
    })
    noise.forEach(noise =>{
        noise.addEventListener("timeupdate",timeCheck)
    })
    e.target.classList.toggle("active");
    timer.classList.toggle("active");
    e.target.removeEventListener("click",show);
}
//Start counting
const start = (endTime,sound) =>{
    timecurrent = new Date().getTime();
    let timeleft = endTime - timecurrent;
    if(timeleft<=0){
        clearInterval(counting);
        sound.pause();
        pause=true;
    }else{
        drawCircle(timeleft);
        pausedTime = timeleft;
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        displayTime(minutes,seconds,clock);
    }
}
//start stop 
const Count = (e,sound) =>{
    if(!sound){
        return
    }
    const span = document.querySelector(".timer__text")
    let timecurrent = new Date().getTime();
    let min = time.value;
    let endTime = pausedTime ? pausedTime + timecurrent: new Date().setTime(timecurrent+(60000*min));
    pause=!pause;
    if(pause){
        clearInterval(counting);
        sound.pause();
    }else{
        counting = setInterval(()=>start(endTime,sound),1000);
        sound.play();
    }
}
//Display time
const displayTime = (minutes,seconds,timer)=>{
    let min = minutes>9?minutes:"0" + minutes;
    let sec = seconds>9?seconds:"0"+seconds;
    timer.innerText=`${min}:${sec}`;
}
//Pause flag
const setTime = ()=>{
    pausedTime=null;
    length = clockBorder.getTotalLength()
}
//Event listeners
    lotus.addEventListener("click",show);
    time.addEventListener("click",setTime);
    startBtn.addEventListener("click",(e)=>Count(e,sound));
    drawCircle(300000)