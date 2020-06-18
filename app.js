const btnRepos = document.querySelector("#btnRepo");
const issuesBtn = document.querySelector("#issueBtn");
const commitsBtn = document.querySelector("#commitsBtn");
// console.log(commitsBtn);

const repoResults = document.querySelector("#repoDiv");
btnRepos.addEventListener("click", getRepos);
issuesBtn.addEventListener("click", getIssues);
commitsBtn.addEventListener("click", (e) => getCommits());

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

async function getCommits(
  url = "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2020-06-17"
) {
  clear();
  // const url =
  //   "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2020-06-17";
  const headers = {
    Accept: "application/vnd.github.cloak-preview",
  };
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  // <https://api.github.com/search/commits?q=repo%3Afreecodecamp%2Ffreecodecamp+author-date%3A2019-03-01..2020-06-17&page=2>; rel="next", <https://api.github.com/search/commits?q=repo%3Afreecodecamp%2Ffreecodecamp+author-date%3A2019-03-01..2020-06-17&page=34>; rel="last"

  const link = response.headers.get("link");
  const links = link.split(",");
  const urls = links.map((a) => {
    return {
      url: a.split(";")[0].replace(">", "").replace("<", ""),
      title: a.split(";")[1],
    };
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
    anchor.textContent = item.commit.message.substr(0, 120) + "....";
    repoResults.appendChild(img);
    repoResults.appendChild(anchor);

    repoResults.appendChild(document.createElement("br"));
  });

  urls.forEach((url) => {
    const btn = document.createElement("button");
    btn.classList.add("pagination");
    btn.textContent = url.title;
    btn.addEventListener("click", (e) => getCommits(url.url));
    repoResults.appendChild(btn);
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
