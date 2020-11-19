const homeUrl = 'http://localhost:3000/'; /// change it to heroku
document.getElementById('signupform').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('message');
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  message.innerText = '';
  if (password !== confirmPassword) {
    message.innerText = "Passwords doesn't match!";
    return;
  }
  const userDtails = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    location: document.getElementById('location').value,
  };
  fetch('/sign-up', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userDtails),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error('Response is not OK!');
      return response.json();
    })
    .then((data) => {
      message.innerText = data.msg;
      if (data.url) {
        window.location.replace(data.url);
      }
    })
    .catch(console.error);
});
