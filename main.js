const {app,BrowserWindow,Notification,dialog,ipcMain} = require('electron')
let win = null;
app.whenReady().then(()=>{
    win = new BrowserWindow({
        width:300,
        height:400,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            enableRemoteModule:true,
        }
    });
    // win.webContents.openDevTools()
    win.loadFile("./index.html")
    win.on('close',()=>{win = null});
    handleIPC();
});

function handleIPC(){
    ipcMain.handle('work-notification',async ()=>{
        let notification  = new Notification({
            title:'任务结束',
            body:'可以休息啦',
        });
        notification.show();
        let boxres =await dialog.showMessageBox({
            title:'任务结束',
            message:"是否开始休息",
            buttons:['休息','继续工作']
        })
        if(boxres.response ==0){
            return 'rest'
        }else{
            return 'work'
        }
    });
}