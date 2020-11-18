const { email, password, posts } = JSON.parse(
  localStorage.getItem('userdetails')
);
console.log({ email, posts, password });

function createPostElem(post) {
  const div = document.createElement('div');
  div.classList.add('alert', 'alert-primary');
  div.innerText = `${post.text_content}`;
  return div;
}

function addPostsToContainer(newPosts, container) {
  const postContainer = document.querySelector(container);
  newPosts.forEach((post) => {
    const newPostElem = createPostElem(post);
    postContainer.prepend(newPostElem);
  });
}

// eslint-disable-next-line no-shadow
function filterPostsByEmail(email) {
  return posts.filter((post) => post.email === email);
}

function getMyPosts() {
  return filterPostsByEmail(email);
}

function showAllPostsOrMyPosts(AllOrMy) {
  if (AllOrMy === 'all') {
    document.querySelector('.my-posts-container').classList.add('hide');
    document.querySelector('.all-posts-container').classList.remove('hide');
  } else if (AllOrMy === 'my') {
    document.querySelector('.my-posts-container').classList.remove('hide');
    document.querySelector('.all-posts-container').classList.add('hide');
  }
}

function getFormInputsAndRestartInputs() {
  const tradeIn = document.querySelector('.trade-in').value;
  const tradeOut = document.querySelector('.trade-out').value;
  const description = document.querySelector('.description').value;

  return { tradeIn, tradeOut, description };
}

function updateContainersWithNewPost(newPost) {
  addPostsToContainer([newPost], '.my-posts-container');
  addPostsToContainer([newPost], '.all-posts-container');
}

window.addEventListener('load', () => {
  addPostsToContainer(posts, '.all-posts-container');
  const myPosts = getMyPosts();
  addPostsToContainer(myPosts, '.my-posts-container');
});

document.querySelector('.my-posts-btn').addEventListener('click', () => {
  showAllPostsOrMyPosts('my');
});

document.querySelector('.all-posts-btn').addEventListener('click', () => {
  showAllPostsOrMyPosts('all');
});

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const { tradeIn, tradeOut, description } = getFormInputsAndRestartInputs();
  const newPost = {
    email,
    text_content: description,
    trade_in: tradeIn,
    trade_out: tradeOut,
    username: 'mm',
  };
  posts.unshift(newPost);
  updateContainersWithNewPost(newPost);
});
