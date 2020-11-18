const string = "home page ...";
const { email, password, posts } = JSON.parse(
  localStorage.getItem("userdetails")
);
console.log({ email, posts, password });
