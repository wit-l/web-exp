import { updatePaginationOnClick, createPaginations } from "../js/common.js";

(() => {
  axios.defaults.baseURL = "https://rickandmortyapi.com";
  const curPagination = { value: null }; // current pagination
  let pageNum = 42; // The num of total pages

  async function updatePage(page) {
    // 无需更改页码的情况
    if (page === curPagination.value || page > pageNum || page < 1) return;
    // page值合法的情况
    curPagination.value = page;
    try {
      const characterRes = await axios.get(`/api/character?page=${page}`);
      // 更新页面
      // console.log('character data', res.data);
      const results = characterRes.data.results.map(async (item) => {
        const { name, image, url, status, location, episode, species } = item;
        return `
        <article class="flex flex-col rounded">
          <img
            src="${image}"
            alt="${name}'s avatar"
          />
          <div class="character_info flex flex-col">
            <div>
              <h6 class="name orange ellipsis-1"><a href="${url}" target="_blank">${name}</a></h6>
              <p class="status_category flex">
                <span class="status rounded ${status === "Alive" ? "bright-green" : status === "Dead" ? "deep-red" : "neutral-gray"}"></span>
                <span>${status}</span>
                <span>&nbsp;-&nbsp;</span>
                <span class="ellipsis-1">${species}</span>
              </p>
            </div>
            <div class="last_location">
              <p class="gray-text medium-font ellipsis-1">Last known location:</p>
              <p class="orange addr1 ellipsis-1">
                <a href="${location.url}" target="_blank">
                  ${location.name}
                </a>
              </p>
            </div>
            <div class="first_location">
              <p class="gray-text medium-font ellipsis-1">First seen in:</p>
              <p class="orange addr2 ellipsis-1">
                <a href="${episode[0]}" target="_blank">
                  ${(await axios.get(episode[0])).data.name}
                </a>
              </p>
            </div>
          </div>
        </article>`;
      });
      // console.log(results);
      document.querySelector(".entries").innerHTML = (
        await Promise.all(results)
      ).join("");
      // 更新页码
      pageNum = characterRes.data.info.pages;
      document.querySelector(".pagination>nav").innerHTML = createPaginations(
        document.querySelector(".pagination"),
        pageNum,
        curPagination,
      );
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  updatePage(1);
  updatePaginationOnClick(updatePage, curPagination);
})();
