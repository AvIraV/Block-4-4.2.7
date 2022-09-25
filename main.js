import { View } from "./modules/view.js";
import { Search } from "./modules/search.js";
import { Api } from "./modules/api.js";

const api = new Api();

const app = new Search(new View(api), api);