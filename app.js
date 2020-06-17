const btnRepos = document.querySelector("#btnRepo");
const issuesBtn = document.querySelector("#issueBtn");
const commitsBtn = document.querySelector("#commitsBtn");
// console.log(commitsBtn);

const repoResults = document.querySelector("#repoDiv");
btnRepos.addEventListener("click", getRepos);
issuesBtn.addEventListener("click", getIssues);
commitsBtn.addEventListener("click", getCommits);

async function getRepos() {
  clear();
  const url =
    "https://api.github.com/search/repositories?q=stars:100000..300000";
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);

  result.items.forEach((item) => {
    const anchor = document.createElement("a");
    anchor.href = item.html_url;
    anchor.textContent = item.full_name;
    repoResults.appendChild(anchor);
    repoResults.appendChild(document.createElement("br"));
  });
}

async function getCommits() {
  clear();
  const url =
    "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2020-06-17";
  const headers = {
    Accept: "application/vnd.github.cloak-preview",
  };
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const result = await response.json();
  console.log(result);

  result.items.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.author.avatar_url;
    img.style.width = "32px";
    img.style.height = "32px";
    img.style.padding = "10px";
    const anchor = document.createElement("a");
    anchor.href = item.html_url;
    anchor.textContent = item.commit.message;
    repoResults.appendChild(img);
    repoResults.appendChild(anchor);

    repoResults.appendChild(document.createElement("br"));
  });
}

async function getIssues() {
  clear();
  const url =
    "https://api.github.com/search/issues?q=author:raisedadead repo:freecodecamp/freecodecamp type:issue";
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);

  result.items.forEach((item) => {
    const anchor = document.createElement("a");
    anchor.href = item.html_url;
    anchor.textContent = item.title;
    repoResults.appendChild(anchor);
    repoResults.appendChild(document.createElement("br"));
  });
}

/*
  this function stops duplicate appearing 
  on screen if you press button more than once
*/
function clear() {
  while (repoResults.firstChild)
    repoResults.removeChild(repoResults.firstChild);
}

// function getRepo() {
//   fetch(
//     "https://api.github.com/search/repositories?q=stars:>100000"
//   ).then((response) => response.json());
//   console
//     .log(response)
//     .then((data) => data.items.forEach((item) => console.log(item.full_name)));
//   console.log(response);
// }
