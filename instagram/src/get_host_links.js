const rp = require("request-promise");

let getLinks = (username) => {
    const baselink = `https://www.instagram.com/${username}/?__a=1`;
    return new Promise((resolve, reject) => {
        rp(baselink)
        .then(res =>{
            profile = JSON.parse(res);
            recent_posts = profile.graphql.user.edge_owner_to_timeline_media.edges //12 most recent post objects, posts with multiple images, only have links of the first ones
            thumbnail_links = recent_posts.map(p => p.node.display_url) // host links of those posts
            resolve(thumbnail_links);
        })
        .catch(e => {
            reject(e);
        })
    });
}

module.exports = getLinks;