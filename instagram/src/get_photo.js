const request = require('request');
const fs = require('fs');

let downloadPhoto = (img_link, label, sequence) => {
    //if the path doesnt exist, create one
    let path = `./downloads/${label}`;
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    //stream image to file
    let ws = fs.createWriteStream(`${path}/${label}-${sequence}.jpg`);
    return new Promise((resolve, reject)=>{
        request({
            uri: img_link
        })
        .pipe(ws)
        .on('finish', ()=>{
            resolve();
        })
        .on('error', e =>{
            reject(e);
        })
    })
}

module.exports = downloadPhoto;