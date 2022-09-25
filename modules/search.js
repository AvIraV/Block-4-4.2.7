export class Search {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.loadRepos.bind(this), 500)
    );
  }

  loadRepos() {
    if (this.view.searchInput.value) {
      this.view.reposList.innerHTML = "";
      this.reposRequest(this.view.searchInput.value);
    } else {
      this.view.reposList.innerHTML = "";
    }
  }

  async reposRequest(searchValue) {
    let repos;
    try {
      await this.api.loadElements(searchValue).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            repos = res.items;
            repos.forEach((r) => this.view.createRepo(r));
          });
        }
      });
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
