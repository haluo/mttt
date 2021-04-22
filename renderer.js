const Timer = require('timer.js')
const {ipcRenderer} = require('electron')

function startWork(sec){
    let workTimer = new Timer({
        tick:1,
        ontick:(ms)=>{
            updateTime(ms)
        },
        onend:()=>{
            notification();
        }
    })
    workTimer.start(sec);
}

function updateTime(ms){
    ms = ms/1000;
    let timerContainer = document.querySelector('#timer-container')
    let second = Math.floor(ms % 60); // 秒
    let minute = Math.floor(ms % 3600 / 60); // 分
    let hour = Math.floor(ms / 3600); // 时
    timerContainer.innerText = `${hour.toString().padStart(2,0)}:${minute.toString().padStart(2,0)}:${second.toString().padStart(2,0)}`;
}
async function notification(){
    let res = await ipcRenderer.invoke('work-notification')
    if(res === 'rest'){
    }else if(res === 'work'){
        let timerInput = document.querySelector('#timer-input')
        startWork(timerInput.value*60)
    }
}
window.onload = function(){
    let timerBtn = document.querySelector('#timer-btn')
    let timerInput = document.querySelector('#timer-input')
    timerBtn.onclick = ()=>{
        // console.log(timerInput.value)
        startWork(timerInput.value*60)
    }
};

// startWork(3);


