import Route from '../../libs/route';
import moment from 'moment';
import Miscellany from '../Miscellany/Loading';

var template = `
<div>
    <h1 class="text-center">{{TITLE}}</h1>
    <p class="text-secondary">{{DATE}} ~ {{USER}} &Tab; {{EMAIL}}</p>
    <p class="text-justify">{{BODY}}</p>
    <p class="text-secondary">{{TAGS}}</p>
    <div class="actions">
        <button type="button" class="btn btn-outline-primary" id="btn-like" data-liked="{{LIKED}}">
            <i class="fa fa-heart"></i>&Tab;Like <span id="likes-count">{{LIKES}}</span>
        </button>
        <span class="float-right"><i class="fa fa-eye"></i>&Tab;{{VIEWS}}</span>
    </div>
</div>
<hr>
<div>
    {{COMMENTS}} sobre <strong>"{{TITLE}}"</strong>
</div
`;

var commentsTemplate = `
<div class="card mt-3 mb-3">
  <div class="card-header">
    <p>{{NAME}} ~ {{EMAIL}}</p>
    <p>{{DATE}}</p>
  </div>
  <div class="card-body">
    <p class="card-text">{{BODY}}</p>
  </div>
</div>
`;

class List extends Route {

    constructor() {
        super('post', {
            htmlName: './views/Posts/Post.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        this.getPost();
        this.getPostComments();
    }

    async getPost() {
        const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
        document.getElementById('post').innerHTML = Miscellany.loading;

        let temporalTemplate = '';

        const post = await store.actions().getPost(postId);

        temporalTemplate += template
            .replace(/{{TITLE}}/gi, post.title)
            .replace('{{DATE}}', moment(post.createdAt).format('DD/MM/YYYY h:mm:ss a'))
            .replace('{{USER}}', post.userName)
            .replace('{{EMAIL}}', post.userEmail)
            .replace('{{BODY}}', post.body)
            .replace('{{TAGS}}', this.getFormatterTags(post.tags))
            .replace('{{VIEWS}}', post.views)
            .replace('{{LIKES}}', post.likes)
            .replace('{{LIKED}}', post.liked)
            .replace('{{COMMENTS}}', post.comments)
            

        document.getElementById('post').innerHTML = temporalTemplate;
        document.getElementById('btn-like').addEventListener('click', like);
        likeButtonModificationIsUserLikePost();

        document.getElementById('btn-comment').addEventListener('click', addPostComment);
    }

    async getPostComments() {
        const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);

        let temporalTemplate = '';

        const comments = await store.actions().getPostComments(postId);

        comments.forEach(comment => {
            temporalTemplate += commentsTemplate
                .replace('{{NAME}}', comment.userName)
                .replace('{{EMAIL}}', comment.userEmail)
                .replace('{{DATE}}', moment(comment.createdAt).format('DD/MM/YYYY h:mm:ss a'))
                .replace('{{BODY}}', comment.body)

        });

        document.getElementById('comments').innerHTML = temporalTemplate
    }

    getFormatterTags(tags){
        let result = '';
        for(let i in tags){
            result += `<span class="badge badge-info mr-2 px-2 py-2">${tags[i]}</span>`
        }
        return result;
    }
}


async function like(event) {
    const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
    let btn = event.target;
    if (btn.getAttribute('data-liked') === 'true') {
        //remove like
        btn.setAttribute('data-liked','false');
        const unLike = await store.actions().removePostLike(postId);
        if (unLike.status === 200) {
            document.getElementById('likes-count').textContent = parseInt(document.getElementById('likes-count').textContent) - 1;
            document.getElementById('btn-like').classList.remove('btn-primary');
            document.getElementById('btn-like').classList.add('btn-outline-primary');
        }
    } else {
        //add like
        btn.setAttribute('data-liked','true');
        const likePost = await store.actions().setPostLike(postId);
        if (likePost.status === 200) {
            document.getElementById('likes-count').textContent = parseInt(document.getElementById('likes-count').textContent) + 1;
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

async function addPostComment(event) {
    event.target.setAttribute('disabled', 'true');
    const postId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
    const comment = document.getElementById('comment-body').value;
    if (comment.length < 1) {
        alert('add a comment please');
        event.target.removeAttribute('disabled');
    } else {
        await store.actions().addPostComment(postId, {
            'body': comment
        });
        window.location.reload();
    }
}

var posts = new List();
export default posts;