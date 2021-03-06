import Request from './Request'
import createPost from '../components/Posts/create';

export default class Store {

    constructor(path, token){
        this.request = new Request(token);
        this.path = path;
    }

    actions(){
        var request = this.request;
        var path = this.path;
        
        return {
            async getMe(){
                return request.get(`${path}/users/me`);
            },
            async getUser(id){
                return request.get(`${path}/users/${id}`);
            },
            async createPost(payload){
                return request.post(`${path}/post`,payload);
            },
            async getPosts() {
                return request.get(`${path}/post`);
            },        
            async getPost(id) {
                return request.get(`${path}/post/${id}`);
            },
            async setPostLike(id) {
                return request.put(`${path}/post/${id}/like`);
            },
            async getPostComments(id) {
                return request.get(`${path}/post/${id}/comment`);
            },
            async addPostComment(id,data){
                return request.post(`${path}/post/${id}/comment`,data);
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