function updatePaginationOnClick(updatePage, currentPagination) {
  document.querySelector(".pagination>nav").addEventListener("click", (e) => {
    const target = e.target;
    let toPage = currentPagination.value;
    if (target.tagName !== "A") return;
    switch (target.innerText) {
      case "<":
        --toPage;
        break;
      case ">":
        ++toPage;
        break;
      default:
        toPage = +e.target.innerText;
    }
    updatePage(toPage);
  });
}

export { updatePaginationOnClick };
