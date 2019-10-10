import Route from '../../libs/route';
import moment from 'moment';

var template = `
<div class="card" style="margib-top: 10px">
  <div class="card-body">
    <h5 class="card-title">
        <span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>
        <a href="#post/1" class="card-link">{{TITLE}}</a>
    </h5>
    <h6 class="card-subtitle mb-2 text-muted">by: {{NAME}} - {{EMAIL}}, <span style='color: grey'> {{DATE}}</span></h6>
    <p class="card-text">{{BODY}}</p>
    <div>
        <span class="mr-3"><i class="fa fa-eye"></i> {{VIEWS}}</span>
        <span class="mr-3"><i class="fa fa-comments"></i> {{COMMENTS}}</span>
        <span><i class="fa fa-heart"></i> {{LIKES}}</span>
    </div>
    <a href="#post/1" class="card-link float-right">Read more...</a>
  </div>
</div>
`

class List extends Route {

    constructor() {
        super('posts', {
            htmlName: 'public/views/Posts/List.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        document.getElementById('posts').innerHTML = '<h3>Loading Posts</h3>'
        let temporalTemplate = '';

        const posts = await store.actions().getPosts();

        posts.forEach(post => {
            temporalTemplate += template
                .replace('{{TITLE}}', post.title)
                .replace('{{BODY}}', post.body.substring(0, 100))
                .replace('{{NAME}}', post.userName)
                .replace('{{EMAIL}}', post.userEmail)
                .replace('{{VIEWS}}', post.views)
                .replace('{{COMMENTS}}', post.comments)
                .replace('{{LIKES}}', post.likes)
                .replace('{{DATE}}', moment(post.createdAt).format('DD/MM/YYYY h:mm:ss a'))
        });

        document.getElementById('posts').innerHTML = temporalTemplate
    }
}

var posts = new List();
export default posts;