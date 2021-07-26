
const lotus = document.querySelector(".wrapper__btn");
const startBtn = document.querySelector(".timer__btn");
const sounds = document.querySelectorAll(".list__btn");
const clock = document.querySelector(".timer__time")
const time = document.querySelector(".timer__options");
let counting
let pausedTime
let pause=true

const show = (e)=>{
    const icon = document.querySelectorAll(".list__item");
    const timer = document.querySelector(".timer");
    icon.forEach(item=>{
        const dataClass = item.dataset.sound;
        item.classList.toggle(dataClass)
    })
    e.target.classList.toggle("active")
    timer.classList.toggle("active")
    e.target.removeEventListener("click",show)
}
const start = (endTime)=>{
    timecurrent = new Date().getTime()
    let timeleft = endTime - timecurrent
    pausedTime = timeleft
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    if(timeleft<=0){
        clearInterval(counting)
    }else{
        displayTime(minutes,seconds,clock)
    }
}
const Count = (e)=>{
    let timecurrent = new Date().getTime()
    let min = time.value
    let endTime = pausedTime ? pausedTime + timecurrent: new Date().setTime(timecurrent+(60000*min))
    pause=!pause
    if(pause){
        clearInterval(counting)
        e.target.innerText="Start"
    }else{
        e.target.innerText="Pause"
        counting = setInterval(()=>start(endTime),1000)
    }
}
const displayTime = (minutes,seconds,timer)=>{
    let min = minutes>9?minutes:"0" + minutes
    let sec = seconds>9?seconds:"0"+seconds
    timer.innerText=`${min}:${sec}`
} 
const setTime = ()=>{
    pausedTime=null
}

    startBtn.addEventListener("click",Count)
    lotus.addEventListener("click",show)
    time.addEventListener("change",setTime)
