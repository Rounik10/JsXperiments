function fetchNews() {
  fetch(
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=df58f56ad7604d5a9d33e42e9e880944",
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const articles = json.articles.map((it) => {
        return {
          title: it.title,
          url: it.url,
          imgUrl: it.urlToImage,
        };
      });
      articles.forEach((it) => addNewsInDom(it));
    })
    .catch(console.error);
}

function addNewsInDom(news) {
  const cardDiv = createCardFromNews(news);
  document.getElementById("news-list").appendChild(cardDiv);
}

function createCardFromNews(news) {
  const cardDiv = document.createElement("div");
  cardDiv.classList = ["card"];

  const newsImage = document.createElement("img");
  newsImage.className = "card-img-top";
  newsImage.src = news.imgUrl;
  newsImage.alt = "News Image";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-titie";
  cardTitle.innerText = news.title;

  cardBody.appendChild(cardTitle);
  cardDiv.appendChild(newsImage);
  cardDiv.appendChild(cardBody);

  cardDiv.addEventListener("click", () => {
    openInNewTab(news.url);
  });

  return cardDiv;
}

window.onload = () => {
  fetchNews();
};

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}
