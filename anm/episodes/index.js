import { updatePaginationOnClick } from "../js/common.js";
(() => {
  axios.defaults.baseURL = "https://rickandmortyapi.com";
  const curPagination = { value: null }; // current pagination
  let pageNum = 1; // The num of total pages

  async function updatePage(page) {
    // 无需更改页码的情况
    if (page === curPagination.value || page > pageNum || page < 1) return;
    // page值合法的情况
    curPagination.value = page;
    try {
      const res = await axios.get(`/api/episode?page=${page}`);
      // 更新页面
      document.querySelector(".entries").innerHTML = res.data.results
        .map((item) => {
          const { name, url, air_date: airDate, created: createdDate } = item;
          return `
        <article class="flex flex-col rounded">
          <h6 class="ename w-full">
            <p class="gray-text">episode name:</p>
            <a class="w-full" href="${url}">${name}</a>
          </h6>
          <div>
            <p class="gray-text">Air Date:</p>
            <p class="air-date">${airDate}</p>
          </div>
          <div>
            <p class="gray-text">Created Date:</p>
            <p class="created-date">${createdDate.split("T")[0]}</p>
          </div>
        </article>`;
        })
        .join("");
      // 更新页码
      pageNum = res.data.info.pages;
      let pageItemHtml = `<a href="javascript:;" class="flex">&lt;</a>`;
      for (let i = 1; i <= pageNum; ++i) {
        let classList = ["flex", "page"];
        if (i === page) classList.push("active");
        pageItemHtml += `<a href="javascript:;" class="${classList.join(" ")}">${i}</a>`;
      }
      pageItemHtml += `<a href="javascript:;" class="flex">&gt;</a>`;
      document.querySelector(".pagination>nav").innerHTML = pageItemHtml;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  updatePage(1);
  updatePaginationOnClick(updatePage, curPagination);
})();
