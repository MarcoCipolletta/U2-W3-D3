const booksRow = document.getElementById("booksRow");
const shoppingCart = [];

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
      document.querySelector("body").classList.remove("d-none");
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

        buyNow.href = "#!";
        buyNow.classList.add("btn", "btn-primary");
        buyNow.innerText = "Compra ora";
        buyNow.addEventListener("click", (e) => {
          shoppingCart.push(book);

          localStorage.setItem("cartArray", JSON.stringify(shoppingCart));

          const cartAmount = document.getElementById("cartAmount");

          if (shoppingCart.length > 0) {
            cartAmount.classList.remove("d-none");
            cartAmount.innerText = shoppingCart.length;
          }

          const offCart = document.getElementById("offCart");
          offCart.innerHTML = "";
          shoppingCart.forEach((cartBook) => {
            offCart.innerHTML += `
    <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                  <div>
                    <img
                      src="${cartBook.img}"
                      class="rounded-3"
                      alt="Shopping item"
                      style="width: 50px"
                    />
                  </div>
                  <div class="ms-3">
                  <h5 class="text-truncate" style="width: 150px" >${cartBook.title}</h5>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                  <div style="width: 80px">
                    <h5 class="mb-0">${cartBook.price}€</h5>
                  </div>
                  <a href="#!" style="color: #000000" onclick="cancItem(event, '${cartBook.asin}')"><i class="bi bi-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
    `;
          });
        });

        discard.href = "#!";
        discard.classList.add("btn", "btn-danger");
        discard.innerText = "Scarta";
        discard.addEventListener("click", (e) => {
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

const cancItem = (e, asin) => {
  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

  const itemToRemove = shoppingCart.find((book) => book.asin === asin);
  if (itemToRemove) {
    shoppingCart.splice(shoppingCart.indexOf(itemToRemove), 1);
    console.log(shoppingCart);
  }
  localStorage.setItem("cartArray", JSON.stringify(shoppingCart));

  if (shoppingCart.length > 0) {
    cartAmount.classList.remove("d-none");
    cartAmount.innerText = shoppingCart.length;
  } else {
    cartAmount.classList.add("d-none");
  }
};

const loadCart = () => {
  const newArrbook = JSON.parse(localStorage.getItem("cartArray"));
  if (newArrbook) {
    newArrbook.forEach((savedBook) => {
      shoppingCart.push(savedBook);
    });
  }
  const cartAmount = document.getElementById("cartAmount");

  if (shoppingCart.length > 0) {
    cartAmount.classList.remove("d-none");
    cartAmount.innerText = shoppingCart.length;
  }

  const offCart = document.getElementById("offCart");
  offCart.innerHTML = "";
  shoppingCart.forEach((cartBook) => {
    offCart.innerHTML += `
    <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                  <div>
                    <img
                      src="${cartBook.img}"
                      class="rounded-3"
                      alt="Shopping item"
                      style="width: 50px"
                    />
                  </div>
                  <div class="ms-3">
                    <h5 class="text-truncate" style="width: 150px">${cartBook.title}</h5>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                  <div style="width: 80px">
                    <h5 class="mb-0">${cartBook.price}€</h5>
                  </div>
                  <a href="#!" style="color: #000000" onclick="cancItem(event, '${cartBook.asin}')"><i class="bi bi-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
    `;
  });
};

loadCart();
