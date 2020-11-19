const homeUrl = "http://localhost:3000/";

const userDetails = localStorage.getItem("userdetails");

if (!userDetails) {
  window.location.replace("/");
}

let { email, password, posts, username } = JSON.parse(userDetails);

window.onload = () => {
  writePosts(posts);
};

function writePosts(posts) {
  // posts is an arry of post object
  const allPostContainer = document.getElementById("allPostsContainer");

  allPostContainer.innerHTML = "";
  const tradeTable = document.createElement("table");
  tradeTable.classList.add("blueTable");
  tradeTable.appendChild(
    createTableHead(["Name", "Trade IN", "Trade OUT", "Description"])
  );
  tradeTable.appendChild(
    createTableBody(posts, [
      "username",
      "trade_in",
      "trade_out",
      "text_content",
    ])
  );
  allPostContainer.appendChild(tradeTable);
}

function createTableHead(headers) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  headers
    .map((h, i) => {
      const th = document.createElement("th");
      if (i < 3) th.classList.add("small-table-item");
      th.innerText = h;
      return th;
    })
    .forEach((th) => tr.appendChild(th));
  thead.appendChild(tr);
  return thead;
}

function createTableBody(rowsData, rowPorperties) {
  // rowsData is an arry of objects
  const tbody = document.createElement("tbody");
  console.log(rowsData);
  const tableRows = rowsData.map((rowData) => {
    const tr = document.createElement("tr");
    rowPorperties
      .map((prop) => {
        const td = document.createElement("td");
        td.innerText = rowData[prop];
        return td;
      })
      .forEach((td) => tr.appendChild(td));
    return tr;
  });
  tableRows.forEach((tr) => tbody.appendChild(tr));
  return tbody;
}

document.getElementById("postForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const trade_in = document.getElementById("trade_in");
  const trade_out = document.getElementById("trade_out");
  const description = document.getElementById("description");
  const post = {
    email,
    password,
    trade_in: trade_in.value,
    trade_out: trade_out.value,
    text_content: description.value,
  };
  fetch(`${homeUrl}add-new-post`, {
    method: "POST",
    redirect: "follow",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error("Response Error!");
      return response.json();
    })
    .then((data) => {
      console.log(data);
      posts.push({
        trade_in: trade_in.value,
        trade_out: trade_out.value,
        text_content: description.value,
        email,
        username,
      });
      trade_in.value = "";
      trade_out.value = "";
      description.value = "";
      writePosts(posts);
    })
    .catch(console.error);
});

document.getElementById("myPostsBtn").addEventListener("click", (event) => {
  event.preventDefault();
  writePosts(posts.filter((post) => post.email === email));
});

document.getElementById("allPostsBtn").addEventListener("click", (event) => {
  event.preventDefault();
  fetch(`${homeUrl}log-in`, {
    method: "POST",
    redirect: "follow",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error fetch response");
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const { url } = data;
      if (url) {
        posts = data.posts;
        writePosts(posts);
      }
    })
    .catch(console.error);
});

document.getElementById("loguot"),
  addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("userdetails");
    window.location.replace("/");
  });
