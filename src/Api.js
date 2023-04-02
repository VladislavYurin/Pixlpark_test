class Api {
    constructor() {
        this.path = "https://hacker-news.firebaseio.com/v0";
    }
    
    getNewStoriesID() {
        return fetch(`${this.path}/newstories.json?print=pretty`, {
            headers: {}
        })
    }

    getStoryByID(id) {
        return fetch(`${this.path}/item/${id}.json?print=pretty`, {
            headers: {}
        })
    }
}

export default Api;