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
    let timerContainer = document.querySelector('#timer-container')
    let s = (ms/1000).toFixed(0);//秒
    let ss = s % 60
    let mm = (s/60).toFixed(0)
    timerContainer.innerText = `${mm.toString().padStart(2,0)}:${ss.toString().padStart(2,0)}`;
}
async function notification(){
    let res = await ipcRenderer.invoke('work-notification')
    if(res === 'rest'){
    }else if(res === 'work'){
        startWork()
    }
}
window.onload = function(){
    let timerBtn = document.querySelector('#timer-btn')
    let timerInput = document.querySelector('#timer-input')
    timerBtn.onclick = ()=>{
        // console.log(timerInput.value)
        startWork(timerInput.value)
    }
};

// startWork(3);


