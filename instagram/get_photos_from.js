const downloadPhoto = require('./src/get_photo');
const getLinks = require('./src/get_host_links');

let username = process.argv[2];

(async (username)=>{
    // first get all the links of 12 most recent posts
    let links = await getLinks(username)
                .then(
                    res => {
                        return res;
                    },
                    rej => {
                        console.log('Rejected: ' + rej);
                    }
                )
                .catch(e => console.log(e));
    // go to each of those links and download the pictures
    links.forEach( (link, index) => {
        downloadPhoto(link, username, index)
        .then(
            res => {
                console.log('1 photo downloaded');
            },
            rej => {
                console.log(rej);
            }
        )
    });
})(username);