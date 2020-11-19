const { email, password, posts, username } = JSON.parse(
  localStorage.getItem("userdetails")
);
console.log({
  email,
  posts,
  password,
  username,
});

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

window.onload = () => {
  writePosts(posts);
};
