export class View {
  constructor(api) {
    this.app = document.getElementById("search__app");
    this.api = api;

    this.searchBox = this.createElement("div", "search-box");
    this.searchInput = this.createElement("input", "search__input");
    this.searchBox.append(this.searchInput);

    this.reposWrapper = this.createElement("div", "repos-wrapper");
    this.reposList = this.createElement("ul", "repos");
    this.reposWrapper.append(this.reposList);

    this.main = this.createElement("div", "main");
    this.main.append(this.reposWrapper);

    this.app.append(this.searchBox);
    this.app.append(this.main);
  }

  createElement(elementTag, elementClass) {
    const el = document.createElement(elementTag);

    if (elementClass) {
      el.classList.add(elementClass);
    }
    return el;
  }

  createRepo(data) {
    const repoElement = this.createElement("li", "repo");
    repoElement.addEventListener("click", () => {
      this.showRepos(data);
    });
    repoElement.innerHTML = `<span class='repo-name'>${data.name}</span>`;
    this.reposList.append(repoElement);
  }

  showRepos(data) {
    const repoEl = this.createElement("div", "repo-add");
    const closeElement = this.createElement("div", "repo-close");
    this.api.loadReposData(data.name).then((res) => {
      const [repos] = res;
      const repoList = this.createDataList(repos, "Repos");

      repoEl.innerHTML = `<span>Name: ${data.name}<br>
      Owner: ${data.owner.login}<br>
      Stars: ${data.stargazers_count}</p>
      </span>
      ${repoList}`;

      repoEl.append(closeElement);
      closeElement.addEventListener("click", () => {
        this.closeReposAdd(repoEl);
      });
    });
    this.main.append(repoEl);
  }

  createDataList() {
    const block = this.createElement("div", "repos-block");
    const listTag = this.createElement("li", "repo-list");

    block.append(listTag);
    this.searchInput.value = "";
    return block.innerHTML;
  }

  closeReposAdd(repoEl) {
    repoEl.remove();
  }
}
