import Route from '../../libs/route';

class CreatePost extends Route {

    constructor() {
        super('create-post', {
            htmlName: './views/Posts/Create.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        document.getElementById('create-post-form').addEventListener('submit',submitPost);
    }
}

function submitPost(){
    let submitPostBtn = document.getElementById('create-post-btn');
    submitPostBtn.setAttribute('disabled','true');
    submitPostBtn.textContent = 'Loading...';
    let post = {
        title:document.getElementById('title').value,
        body:document.getElementById('body').value,
    }

    store.actions().createPost(post)
    .then(response=>{
        location.href = '/#profile/me';
    })
    .catch(error=>{
        console.log(error);
    })
}

var createPost = new CreatePost();
export default createPost;