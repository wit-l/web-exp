// import axios from "axios";

let entries = document.querySelector(".entries");
// console.log(entries);

axios({
  url: "https://rickandmortyapi.com/api/episode",
  params: {
    page: 1,
  },
})
  .then((res) => {
    // console.log(res);
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
</article>
`;
      })
      .join("");
  })
  .catch((error) => {
    console.log(error);
  });
