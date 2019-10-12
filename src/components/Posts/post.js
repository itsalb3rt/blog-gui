import Route from '../../libs/route';
import moment from 'moment';

var template = `
<div>
    <h1 class="text-center">{{TITLE}}</h1>
    <p class="text-secondary">{{DATE}} ~ {{USER}} &Tab; {{EMAIL}}</p>
    <p class="text-justify">{{BODY}}</p>
    <p class="text-secondary">{{TAGS}}</p>
    <div class="actions">
        <button type="button" class="btn btn-outline-primary"><i class="fa fa-heart"></i>&Tab;Like {{LIKES}}</button>
        <span class="float-right"><i class="fa fa-eye"></i>&Tab;{{VIEWS}}</span>
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
        document.getElementById('post').innerHTML = '<h3>Loading Post</h3>'
        const postId = window.location.hash.substring(window.location.hash.indexOf('/')+1);

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

        document.getElementById('post').innerHTML = temporalTemplate
    }
}

var posts = new List();
export default posts;