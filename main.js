
const lotus = document.querySelector(".wrapper__btn");
const startBtn = document.querySelector(".timer__btn");
const sounds = document.querySelectorAll(".list__btn");
const clock = document.querySelector(".timer__time");
const time = document.querySelector(".timer__options");
const noise = document.querySelectorAll(".list__sound")
let counting;
let pausedTime;
let pause=true;
let sound=null

const timeCheck = (e) =>{
    const sound = e.target
    if(sound.currentTime>sound.duration-1){
        sound.currentTime=1
    }
}
const setSound = e=>{
    if(!pause){
        return
    }
    sound = e.target.children[1];
    sounds.forEach(item=>{
        item.classList.remove("played")
    })
    e.target.classList.toggle("played");
}
const show = e=>{
    const icon = document.querySelectorAll(".list__item");
    const timer = document.querySelector(".timer");
    const listBtn = document.querySelectorAll(".list__btn");
    icon.forEach(item=>{
        const dataClass = item.dataset.sound;
        item.classList.toggle(dataClass);
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
const start = (endTime,sound)=>{
    timecurrent = new Date().getTime();
    let timeleft = endTime - timecurrent;
    pausedTime = timeleft;
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    if(timeleft<=0){
        clearInterval(counting);
        sound.pause();
    }else{
        displayTime(minutes,seconds,clock);
    }
}
const Count = (e,sound)=>{
    if(!sound){
        return
    }
    console.log(sound.duration)
    let timecurrent = new Date().getTime();
    let min = time.value;
    let endTime = pausedTime ? pausedTime + timecurrent: new Date().setTime(timecurrent+(60000*min));
    pause=!pause;
    if(pause){
        clearInterval(counting);
        sound.pause();
        e.target.innerText="Start";
    }else{
        e.target.innerText="Pause";
        counting = setInterval(()=>start(endTime,sound),1000);
        sound.play();
    }
}
const displayTime = (minutes,seconds,timer)=>{
    let min = minutes>9?minutes:"0" + minutes;
    let sec = seconds>9?seconds:"0"+seconds;
    timer.innerText=`${min}:${sec}`;
} 
const setTime = ()=>{
    pausedTime=null;
}
    lotus.addEventListener("click",show);
    time.addEventListener("click",setTime);
    startBtn.addEventListener("click",(e)=>Count(e,sound));
