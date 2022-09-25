export class Api {
  async loadElements(value) {
    return await fetch(
      `https://api.github.com/search/repositories?q==${value}&per_page=5`
    ).then((res) => res);
  }

  loadReposData(name) {
    const urls = [`https://api.github.com/repositories/${name}/repos`];

    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  }
}
