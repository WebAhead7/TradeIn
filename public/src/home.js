const string = "home page ...";
const { email, password, posts, username } = JSON.parse(
  localStorage.getItem("userdetails")
);
console.log({ email, posts, password, username });
