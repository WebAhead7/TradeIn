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

function showAllPostsOrMyPosts(allOrMy) {
  if (allOrMy === 'all') {
    document.querySelector('.my-posts-container').classList.add('hide');
    document.querySelector('.all-posts-container').classList.remove('hide');
  } else if (allOrMy === 'my') {
    document.querySelector('.my-posts-container').classList.remove('hide');
    document.querySelector('.all-posts-container').classList.add('hide');
  }
}

function getFormInputs() {
  const tradeIn = document.querySelector('.trade-in').value;
  const tradeOut = document.querySelector('.trade-out').value;
  const description = document.querySelector('.description').value;

  return { tradeIn, tradeOut, description };
}

function restartFormInputs() {
  document.querySelector('.trade-in').value = '';
  document.querySelector('.trade-out').value = '';
  document.querySelector('.description').value = '';
}

function updateContainersWithNewPost(newPost) {
  addPostsToContainer([newPost], '.my-posts-container');
  addPostsToContainer([newPost], '.all-posts-container');
}

function sendNewPostToServer(post) {
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function validateInputs({ tradeIn, tradeOut, description }) {
  const tradeInTrimmed = tradeIn.trim();
  const tradeOutTrimmed = tradeOut.trim();
  const descriptionTrimmed = description.trim();

  if (!tradeInTrimmed) {
    document.querySelector('.trade-in-alert').classList.remove('hide');
  } else {
    document.querySelector('.trade-in-alert').classList.add('hide');
  }

  if (!tradeOutTrimmed) {
    document.querySelector('.trade-out-alert').classList.remove('hide');
  } else {
    document.querySelector('.trade-out-alert').classList.add('hide');
  }

  if (!descriptionTrimmed) {
    document.querySelector('.description-alert').classList.remove('hide');
  } else {
    document.querySelector('.description-alert').classList.add('hide');
  }

  return tradeInTrimmed && tradeOutTrimmed && descriptionTrimmed;
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
  const { tradeIn, tradeOut, description } = getFormInputs();

  if (!validateInputs({ tradeIn, tradeOut, description })) {
    return;
  }
  restartFormInputs();
  const newPost = {
    email,
    text_content: description,
    trade_in: tradeIn,
    trade_out: tradeOut,
    username: 'mm',
  };
  posts.unshift(newPost);
  updateContainersWithNewPost(newPost);
  sendNewPostToServer(newPost);
});
