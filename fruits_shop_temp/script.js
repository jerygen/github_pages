// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  let keyword = searchBox.value;
  let sortOrder = sortSelect.value;

  let filtered = fruits.filter((item) => {
    return item.name.includes(keyword);
  });

  if (keyword === "") {
    if (sortOrder === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else filtered.sort((a, b) => b.price - a.price);
  }

  //화면에 다시 출력
  renderProducts(filtered, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  let keyword = searchBox.value;
  let sortOrder = sortSelect.value;

  let filtered = veggies.filter((item) => {
    return item.name.includes(keyword);
  });

  if (keyword === "") {
    if (sortOrder === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else filtered.sort((a, b) => b.price - a.price);
  }

  //3개씩 보여주기
  let limit = (veggiePage + 1) * 3;
  let slicedData = filtered.slice(0, limit);

  if (limit >= filtered.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }

  //화면에 다시 출력
  renderProducts(slicedData, veggieList);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", () => {
  veggiePage = 0;
  filterAndSortFruits();
  loadVeggies();
});
sortSelect.addEventListener("change", () => {
  veggiePage = 0;
  filterAndSortFruits();
  loadVeggies();
});
loadMoreBtn.addEventListener("click", () => {
  veggiePage++;
  loadVeggies();
});

// 초기 실행
filterAndSortFruits();
loadVeggies();
