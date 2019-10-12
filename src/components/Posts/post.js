import Route from '../../libs/route';
import moment from 'moment';

var template = `
<div>
    <h1 class="text-center">{{TITLE}}</h1>
    <p class="text-secondary">{{DATE}} ~ {{USER}} &Tab; {{EMAIL}}</p>
    <p class="text-justify">{{BODY}}</p>
    <p class="text-secondary">{{TAGS}}</p>
    <div class="actions">
        <button type="button" class="btn btn-outline-primary" id="btn-like" data-liked="{{LIKED}}">
            <i class="fa fa-heart"></i>&Tab;Like {{LIKES}}
        </button>
        <span class="float-right"><i class="fa fa-eye"></i>&Tab;{{VIEWS}}</span>
    </div>
</div>
<hr>
<div>
`;
class List extends Route {

    constructor() {
        super('post', {
            htmlName: './views/Posts/Post.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
        document.getElementById('post').innerHTML = '<h3>Loading Post</h3>'

        let temporalTemplate = '';

        const post = await store.actions().getPost(postId);

        temporalTemplate += template
            .replace('{{TITLE}}', post.title)
            .replace('{{DATE}}', moment(post.createdAt).format('DD/MM/YYYY h:mm:ss a'))
            .replace('{{USER}}', post.userName)
            .replace('{{EMAIL}}', post.userEmail)
            .replace('{{BODY}}', post.body)
            .replace('{{TAGS}}', post.tags)
            .replace('{{VIEWS}}', post.views)
            .replace('{{LIKES}}', post.likes)
            .replace('{{LIKED}}', post.liked)

        document.getElementById('post').innerHTML = temporalTemplate
        document.getElementById('btn-like').addEventListener('click', like);
        likeButtonModificationIsUserLikePost();
    }
}

async function like(event) {
    const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
    let btn = event.target;
    if (btn.getAttribute('data-liked') === 'true') {
        //remove like
        const unLike = await store.actions().removePostLike(postId);
        if (unLike.status === 200) {
            document.getElementById('btn-like').classList.remove('btn-primary');
            document.getElementById('btn-like').classList.add('btn-outline-primary');
        }
    } else {
        //add like
        const likePost = await store.actions().setPostLike(postId);
        if (likePost.status === 200) {
            document.getElementById('btn-like').classList.remove('btn-outline-primary');
            document.getElementById('btn-like').classList.add('btn-primary');
        }
    }
}

const likeButtonModificationIsUserLikePost = () => {
    let btn = document.getElementById('btn-like');
    if (btn.getAttribute('data-liked') === 'true') {
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-primary');
    }
}

var posts = new List();
export default posts;