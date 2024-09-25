const booksRow = document.getElementById("booksRow");

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La richiesta non è andata a buon fine!");
      }
    })
    .then((books) => {
      console.log(books);
      books.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col", "d-flex", "justify-content-center");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = book.img;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.innerText = book.title;

        const price = document.createElement("p");
        price.classList.add("card-text", "text-end");
        price.innerText = book.price + "€";

        cardBody.append(title, price);

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer", "d-flex", "flex-column", "gap-1");

        const buyNow = document.createElement("a");
        const discard = document.createElement("a");

        buyNow.href = "#";
        buyNow.classList.add("btn", "btn-primary");
        buyNow.innerText = "Compra ora";
        buyNow.addEventListener("click", (e) => {
          console.log(e.target.parentElement.parentElement.parentElement);
        });

        discard.href = "#";
        discard.classList.add("btn", "btn-danger");
        discard.innerText = "Scarta";
        discard.addEventListener("click", (e) => {
          console.log(e.target.parentElement.parentElement.parentElement);
          e.target.parentElement.parentElement.parentElement.remove();
        });

        cardFooter.append(buyNow, discard);

        card.append(img, cardBody, cardFooter);
        col.appendChild(card);
        booksRow.appendChild(col);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

getBooks();
