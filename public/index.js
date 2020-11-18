const homeUrl = 'http://localhost:3000/';

document.getElementById('loginform').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('message');
  message.innerText = '';
  fetch(`${homeUrl}log-in`, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Error fetch response');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const { msg, url, posts, email, password, username } = data;
      message.innerText = msg;
      if (url) {
        localStorage.setItem(
          'userdetails',
          JSON.stringify({
            posts,
            email,
            password,
            username,
          })
        );
        window.location.replace(url);
      }
    })
    .catch(console.error);
});
