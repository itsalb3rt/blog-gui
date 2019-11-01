export const getFormatterTags = (tags) => {
    let result = '';
    for (let i in tags) {
        result += `<span class="badge badge-info mr-2 px-2 py-2">${tags[i]}</span>`
    }
    return result;
}

export async function like(event) {
    let btn = event.target;
    const postId = btn.getAttribute('data-post-id');

    if (postId === null)
        return false;

    if (btn.getAttribute('data-liked') === 'true') {
        //remove like
        btn.setAttribute('data-liked', 'false');
        const unLike = await store.actions().removePostLike(postId);
        if (unLike.status === 200) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
        }
    } else {
        //add like
        btn.setAttribute('data-liked', 'true');
        const likePost = await store.actions().setPostLike(postId);
        if (likePost.status === 200) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
        }
    }
}


document.addEventListener('likes', (e) => {
    const likeCount = document.getElementById(`likes-count-${e.detail.postId}`);
    const likeBtn = document.getElementById(`like-btn-${e.detail.postId}`);

    if (likeCount !== null && likeBtn !== null) {
        if (e.detail.likeType === 'like') {
            likeBtn.classList.remove('btn-outline-primary');
            likeBtn.classList.add('btn-primary');
            likeCount.textContent = e.detail.likes;
        } else {
            likeBtn.classList.remove('btn-primary');
            likeBtn.classList.add('btn-outline-primary');
            likeCount.textContent = e.detail.likes;
        }
    }

});

document.addEventListener('view-post', (e) => {
    const data = e.detail;
    const viewsCount = document.getElementById(`views-count-${data.postId}`);

    if (viewsCount !== null) {
        viewsCount.textContent = data.views;
    }

});

document.addEventListener('new-comment', (e) => {
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
    let commentsContainer = document.getElementById(`comments-of-post-${e.detail.postId}`);
    let temporalTemplate = '';

    if (commentsContainer !== null) {
        temporalTemplate += commentsTemplate
            .replace('{{NAME}}', e.detail.userName)
            .replace('{{EMAIL}}', e.detail.userEmail)
            .replace('{{DATE}}', 'Some seconds')
            .replace('{{BODY}}', e.detail.commentBody);
        commentsContainer.innerHTML += temporalTemplate;
    }
})

export default {
    getFormatterTags,
    like
}