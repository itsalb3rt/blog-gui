import Route from '../../libs/route';

class List extends Route {

    constructor(){
        super('posts', { htmlName : 'public/views/Posts/List.html' });
        this.onMountCb = this.whenMounted
    }

    clickBtn2(){
        console.log("Trying btn2 on mypost route")
    }

    async whenMounted(){
        const posts = store.actions().getPosts();
        posts.then(response=>{
            console.log(response);
        })
        
        document.getElementById('btn2')
        .addEventListener('click', () =>  this.clickBtn2());
    }
}

var posts = new List();
export default posts;