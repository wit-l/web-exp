function updatePaginationOnClick(updatePage, currentPagination, paginationDOM) {
  paginationDOM.children[0].addEventListener("click", (e) => {
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
      case "···":
        break;
      default:
        toPage = +e.target.innerText;
    }
    updatePage(toPage);
  });
}

function createPaginations(paginationDOM, pageNum, curPagination) {
  let pageItemHtml = `<a href="javascript:;" class="flex">&lt;</a>`;
  // 页码导航栏最多只放maxPaginationNum 个页码（根据两位数页码宽度计算，只能少不能多，否则超出父盒子）
  const maxPaginationNum = Math.floor(paginationDOM.clientWidth / 52) - 4;
  let paginationNum = pageNum >= maxPaginationNum ? maxPaginationNum : pageNum;
  // 当前页码在页码导航栏中初始位置为中间
  let halfPaginationNum = paginationNum >> 1;
  let start = curPagination.value - (paginationNum - halfPaginationNum - 1);
  let end = curPagination.value + halfPaginationNum;
  // 修正导航栏中页码位置
  if (start < 1) {
    // 页码导航栏中第一个页码小于0时
    start = 1;
    end = start + paginationNum - 1;
  } else if (start > 1) {
    let needLeftEllipsis = true;
    if (end > pageNum) {
      // 最后一个页码大于最后一页时
      end = pageNum;
      needLeftEllipsis = (start = end - paginationNum + 1) > 1 ? true : false;
    }
    // 第一个页码非首页
    if (needLeftEllipsis)
      pageItemHtml += `<a href="javascript:;" class="flex">···</a>`;
  }
  // 构建中间部分的数字页码
  for (let i = start; i <= end; ++i) {
    let classList = ["flex", "page"];
    if (i === curPagination.value) classList.push("active");
    pageItemHtml += `<a href="javascript:;" class="${classList.join(" ")}">${i}</a>`;
  }
  // 当前页码导航栏右边仍有未显示页码时显示右省略号
  if (
    curPagination.value + halfPaginationNum < pageNum &&
    maxPaginationNum < pageNum
  ) {
    pageItemHtml += `<a href="javascript:;" class="flex">···</a>`;
  }
  pageItemHtml += `<a href="javascript:;" class="flex">&gt;</a>`;
  return pageItemHtml;
}

export { updatePaginationOnClick, createPaginations };
