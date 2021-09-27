const fs = require("fs");    // fs module ，用來操作實體檔案，可以同步或非同步存取檔案系統操作
const http = require("http");    // http module 提供了許多 function 以及 class 来搭建 HTTP 伺服器
const path = require("path");    // path module 用來處理與轉換路徑的方法與屬性
const port = process.env.PORT || 5000;     // 設定 Node.js 使用 heroku 的 port 或是 本地的 port 為 5000 
const dir = "./images"    // 設置圖檔位置  

function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}

function mkdir(dir){
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}
async function dirExists(dir){
    let isExists = await getStat(dir);
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){
        return false;
    }
    let tempDir = path.parse(dir).dir;
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if(status){
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}

async function fn(){
    await dirExists('./images');
}
fn();

function readdir (res){
    return new Promise((resolve,reject) =>{
        fs.readdir(res,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

function filestat (res){
    return new Promise((resolve,reject) =>{
        fs.stat(res,(err,data) =>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

function readfile (res){
    return new Promise((resolve,reject)=>{
        fs.readFile(res,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

function filename(picDir){
    return new Promise((resolve,reject)=>{
        readdir(picDir)
            .then(data=>{
            let paths = []
            let name
            data.map((name,index)=>{
                let tmpPath = path.join(picDir, name)
                filestat(tmpPath).then((stats)=>{
                    if(!stats.isDirectory() && path.extname(tmpPath).toUpperCase() === ".JPG"){                  
                        paths.push(tmpPath)
                    }
                    if(index+1 === data.length){
                        resolve(paths)
                    }
                })
                .catch((err)=>{
                    reject(err)
                })      
            })    
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

function rd(n){ 
    return Math.floor(Math.random() * (n+1))
}

function rdpic(){
    return new Promise((resolve,reject)=>{
        filename(dir)
            .then(data=>{
            let n = rd(data.length-1)
            resolve(data[n])
        })
    })
}

http.createServer(server).listen(port)

function server (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    rdpic()
    .then(data =>{
        return readfile(data)
    })
    .then(data =>{
        return data
    })
    .then(data=>{
        res.end(data)
    })
    .catch(err => {
        throw err
    })
}