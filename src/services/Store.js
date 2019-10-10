import Request from './Request'

export default class Store {

    constructor(path, token){
        this.request = new Request(token);
        this.path = path;
    }

    actions(){
        var request = this.request;
        var path = this.path;
        
        return {
            async getPosts() {
                return request.get(`${path}/post`);
            },        
            async getPost(id) {
                return request.get(`${path}/post/${id}`);
            },
            isLoged(){
                const token = window.localStorage.getItem('token');

                if (token === null || token === undefined){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }

}