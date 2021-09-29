const fs = require("fs")    // fs module ，用來操作實體檔案，可以同步或非同步存取檔案系統操作
const http = require("http")    // http module 提供了許多 function 以及 class 来搭建 HTTP 伺服器
const path = require("path")    // path module 用來處理與轉換路徑的方法與屬性

const port = process.env.PORT || 8763     // 設定 Node.js 使用 heroku 的 port 或是 本地的 port 為 8763
const dir = "./images"    // 設置圖片位置  

// 讀取圖片路徑
function getPic(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err) resolve(false)
            else resolve(stats)
        })
    })
}

// 創建路徑
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err) resolve(false)
            else resolve(true)
        })
    })
}

// 判斷路徑是否存在，不存在則創建
async function dirExists(dir) {
    let filePath = await getPic(dir)    // 取得路徑

    if(filePath && filePath.isDirectory()) return true;
    else if(filePath) return false

    let status = await dirExists(path.parse(dir).dir)   // 遞迴判斷，如果上層資料夾不存在，則會在此處繼續循環執行，直到目錄存在
    let mkdirStatus

    if(status) mkdirStatus = await mkdir(dir);

    return mkdirStatus
}

dirExists("./images")

// 讀取圖片資料夾內的文件和子資料夾
function readdir(res) {
    return new Promise((resolve, reject) => {
        fs.readdir(res, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 讀取圖片屬性
function fileAttribute(res) {
    return new Promise((resolve, reject) => {
        fs.stat(res,(err,data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 讀取圖片內容
function readFile(res) {
    return new Promise((resolve, reject) => {
        fs.readFile(res, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 讀取圖片名稱
function fileName(picDir) {
    return new Promise((resolve, reject) => {
        readdir(picDir)
        .then(data => {
            let paths = []

            data.map((name, index) => {
                let tmpPath = path.join(picDir, name)

                fileAttribute(tmpPath).then(stats => {
                    if(!stats.isDirectory() && path.extname(tmpPath).toUpperCase() === ".JPG") paths.push(tmpPath)
                    if(index+1 === data.length) resolve(paths)
                })
                .catch(err => reject(err))      
            })    
        })
        .catch(err => reject(err))
    })
}

// 隨機取得圖片路徑
function rdPic() {
    return new Promise((resolve, reject) => {
        fileName(dir)
            .then(data => {
            let n = Math.floor(Math.random() * (data.length))   // 取得 0 到 n 的隨機數字
            resolve(data[n])
        })
    })
}

// 啟動伺服器
http.createServer(server).listen(port)

function server (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"})
    rdPic()
    .then(data => {return readFile(data)})
    .then(data => {return data})
    .then(data => {res.end(data)})
    .catch(err => {throw err})
}