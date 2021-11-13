/*
 fetch depuis le localStorage avec une possibilité de le modifier(?)
 
 eventListener sur
        <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>

 préparer un message d'erreur sur le firstName


*/

let cartLocalStorage = JSON.parse(localStorage.getItem("cartLocalStorage"));
console.log(cartLocalStorage);

///////////////////////////////
//insertHTML couchS
///////////////////////////////

for (let i = 0; i < cartLocalStorage.length; i++) {
  document.getElementById("cart__items").innerHTML +=
    '<article class="cart__item" data-id="' +
    cartLocalStorage[i].couch._id +
    '"><div class="cart__item__img"> <img src="' +
    cartLocalStorage[i].couch.imageUrl +
    '" alt="' +
    cartLocalStorage[i].couch.altTxt +
    '"></div><div class="cart__item__content">' +
    '<div class="cart__item__content__titlePrice"><h2>' +
    cartLocalStorage[i].couch.name +
    "</h2><p>" +
    cartLocalStorage[i].couch.price +
    " €</p></div><p>Couleur : " +
    cartLocalStorage[i].couchColor +
    "</p><div class='cart__item__content__settings'>" +
    "<div class='cart__item__content__settings__quantity'><p> Qté : </p>" +
    "<input type='number' class='itemQuantity' id= 'itemQuantity' name='itemQuantity' min='1' max='100' value=" +
    cartLocalStorage[i].quantity +
    '></div><div class="cart__item__content__settings__delete">' +
    '<p id="deleteItem">Supprimer</p></div></div></div>';
}
///////////////////////////////
//supprimer un item
///////////////////////////////

//ne fonctionne pas dans et hors de la boucle
document.getElementById("deleteItem").addEventListener("click", () => {
  for (let i = 0; i < cartLocalStorage.length; i++) {
    cartLocalStorage[i].removeItem();
  }
});

// filter if old.quantity!=new.quantity, old.quantity=new.quantity  ????

let changeQuantity = document.getElementById("itemQuantity"); //not a function?
changeQuantity.addEventListener("change", () => {
  if (changeQuantity.value != cartLocalStorage[0].quantity) {
    cartLocalStorage.quantity = changeQuantity.value;
    console.log("cartLocalStorage.quantity = " + cartLocalStorage[0].quantity);
    console.log("changeQuantity = " + changeQuantity);
    return cartLocalStorage.quantity;
  }
});

///////////////////////////////
//calcul quantité total de couch & price
///////////////////////////////

/* tentatives de calcul
for (let i = 0; i < cartLocalStorage.length; i++) {
  let intArticles = parseInt(cartLocalStorage[i].quantity);
  console.log(intArticles);
  totArticles = numArticles(sum, intArticles);
}

//console.log(numArticles(sum));
/*
for (let i = 0; i < cartLocalStorage.length; i++) {
  let totArticles = numArticles(sum);
  //console.log(totArticles);
  document.getElementById("totalQuantity").innerHTML = totArticles;
  
  const calcArticles = (x, y) => {
    x += y;
    return x;
  };
}
*/
//let i = 0;
let sumTotalArticles = 0;
//let totArticles;
for (i = 0; i < cartLocalStorage.length; i++) {
  let numArticles = parseInt(cartLocalStorage[i].quantity);
  //totArticles = sum + numArticles;
  //console.log("totArticles= " + totArticles);
  sumTotalArticles += numArticles;
  //console.log("sum = " + sumTotalArticles);
  //i++;
}
document.getElementById("totalQuantity").innerHTML = sumTotalArticles;

let sumTotalPrice = 0;
for (i = 0; i < cartLocalStorage.length; i++) {
  sumTotalPrice +=
    cartLocalStorage[i].couch.price * cartLocalStorage[i].quantity;
  console.log("sum = " + sumTotalPrice);
  //i++;
}
document.getElementById("totalPrice").innerHTML = sumTotalPrice;

///////////////////////////////
//
///////////////////////////////
