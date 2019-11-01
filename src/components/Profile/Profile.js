import Route from '../../libs/route';
import moment from 'moment';
import Miscellany from '../Miscellany/Loading';

var template = `
<div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="./images/profile-placeholder.jpg" class="card-img" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{USERNAME}}</h5>
          <p class="card-text">
              <div class="mt-1"><strong>Email:</strong> {{EMAIL}}</div>
              <div class="mt-4"><strong>Post:</strong> {{POSTS}} - <a href="/#posts/{{USERID}}">View All</a></div>
              <div class="mt-4"><strong>Register at:</strong> {{REGISTERAT}}</div>
          </p>
        </div>
      </div>
    </div>
`

class Profile extends Route {

    constructor() {
        super('profile', {
            htmlName: './views/Profile/Profile.html'
        });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {

        document.getElementById('profile').innerHTML = Miscellany.loading;

        let temporalTemplate = '';
        const userId = window.location.hash.substring(window.location.hash.indexOf('/') + 1);
        let user;

        if (userId == 'me') {
            user = await window.me;
        } else {
            user = await store.actions().getUser(userId);
        }

        temporalTemplate += template
            .replace('{{POSTS}}', user.posts)
            .replace('{{USERID}}',user.id)
            .replace('{{USERNAME}}', user.name)
            .replace('{{EMAIL}}', user.email)
            .replace('{{REGISTERAT}}', moment(user.createdAt).format('DD/MM/YYYY h:mm:ss'));

        document.getElementById('profile').innerHTML = temporalTemplate;

    }
}

export default new Profile();