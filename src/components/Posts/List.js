import Route from '../../libs/route';
import moment from 'moment';
import Miscellany from '../Miscellany/Loading';
import {
    like
} from '../Miscellany/PostsUtil';

var template = `
<div class="card mt-2 mb-2">
  <div class="card-body">
    <h5 class="card-title">
        <span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>
        <a href="#post/{{POSTID}}" class="card-link">{{TITLE}}</a>
    </h5>
    <h6 class="card-subtitle mb-2 text-muted">by:<a href="/#profile/{{USERID}}"> {{NAME}} - {{EMAIL}}</a>, <span style='color: grey'> {{DATE}}</span></h6>
    <p class="card-text">{{BODY}}</p>
    <div>
        <button type="button" class="btn btn-outline-primary btn-like" id="like-btn-{{POSTID}}" data-liked="{{LIKED}}" data-post-id="{{POSTID}}">
            <i class="fa fa-heart"></i>&Tab;Like <span id="likes-count-{{POSTID}}">{{LIKES}}</span>
        </button>
        <span class="mr-3 float-right"><i class="fa fa-eye"></i> <span id="views-count-{{POSTID}}">{{VIEWS}}</span></span>
        <span class="mr-3 float-right"><i class="fa fa-comments"></i> {{COMMENTS}}</span>
    </div>
    <a href="#post/{{POSTID}}" class="card-link float-right">Read more...</a>
  </div>
</div>
`

class List extends Route {

    constructor() {
        super('posts', {
            htmlName: './views/Posts/List.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        document.getElementById('posts').innerHTML = Miscellany.loading;
        let temporalTemplate = '';

        const userId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
        let posts = await store.actions().getPosts();

        if (Number.isInteger(parseInt(userId))) {
            posts = posts.filter(post => post.userId == userId);
        }

        posts.forEach(post => {
            temporalTemplate += template
                .replace(/{{POSTID}}/gi, post.id)
                .replace('{{TITLE}}', post.title)
                .replace('{{BODY}}', post.body.substring(0, 100))
                .replace('{{NAME}}', post.userName)
                .replace('{{USERID}}', post.userId)
                .replace('{{EMAIL}}', post.userEmail)
                .replace('{{VIEWS}}', post.views)
                .replace('{{COMMENTS}}', post.comments)
                .replace('{{LIKES}}', post.likes)
                .replace('{{LIKED}}', post.liked)
                .replace('{{DATE}}', moment(post.createdAt).format('DD/MM/YYYY h:mm:ss a'))
        });


        if (posts.length === 0) {
            document.getElementById('posts').innerHTML = '<h1>This user no have posts</h1>';
        } else {
            document.getElementById('posts').innerHTML = temporalTemplate;
        }

        const likeBtn = document.getElementsByClassName('btn-like');
        likeBtn.forEach(btn => {
            btn.addEventListener('click', like);
            if (btn.getAttribute('data-liked') === 'true') {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            }
        });
    }
}

var posts = new List();
export default posts;