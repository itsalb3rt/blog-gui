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
            async setPostLike(id) {
                return request.put(`${path}/post/${id}/like`);
            },
            async removePostLike(id){
                return request.delete(`${path}/post/${id}/like`);
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