let cartLocalStorage = JSON.parse(localStorage.getItem("cartLocalStorage"));
console.log(cartLocalStorage);

///////////////////////////////
//insertHTML couchS
///////////////////////////////

let sumTotalArticles = 0;
let sumTotalPrice = 0;

for (let i = 0; i < cartLocalStorage.length; i++) {
  const cart = cartLocalStorage[i];
  document.getElementById("cart__items").innerHTML += `
  <!--innerHTML starts here-->
  <article class="cart__item" data-id="${cart.couch._id}">
    <div class="cart__item__img">
      <img src="${cart.couch.imageUrl}" alt="${cart.couch.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${cart.couch.name}</h2>
        <p>${cart.couch.price} €</p>
        </div>
        <p>Couleur :${cart.couchColor}</p>
        <div class='cart__item__content__settings'>
        <div class='cart__item__content__settings__quantity'>
        <p> Qté : </p>
        <input type='number' class='itemQuantity' name='itemQuantity' 
        min='1' max='100' value=${cart.quantity} onchange="changeQuantity(event, 
          '${cart.couch._id}','${cart.couchColor}');">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem" 
        onClick="deletProduct('${cart.couch._id}','${cart.couchColor}');">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;

  ///////////////////////////////
  //calcul quantité total de couch & price
  ///////////////////////////////

  let numArticles = parseInt(cartLocalStorage[i].quantity);
  sumTotalArticles += numArticles;
  sumTotalPrice +=
    cartLocalStorage[i].couch.price * cartLocalStorage[i].quantity;
}
//insertion du prix & de la quantité d'article dans l'html
document.getElementById("totalQuantity").innerHTML = sumTotalArticles;
document.getElementById("totalPrice").innerHTML = sumTotalPrice;

///////////////////////////////////////////
//modifier une quantité depuis la page cart
///////////////////////////////////////////

const changeQuantity = (event, productId, productColor) => {
  //event est l'évènement prévu dans l'innerHTML, ici onchange
  //target returns the element that triggered the even, ici l'input dans lequel il se trouve
  event.preventDefault();
  console.log("event.target.value = " + event.target.value);
  for (cart of cartLocalStorage) {
    if (cart.couch._id === productId && cart.couchColor === productColor) {
      cart.quantity = event.target.value;
    }
  }
  localStorage.setItem("cartLocalStorage", JSON.stringify(cartLocalStorage));
  location.reload();
};

///////////////////////////////
//supprimer un item
///////////////////////////////

const deletProduct = (productId, productColor) => {
  cartLocalStorage.splice(
    //on ajoute ou enleve un/des elt de l'array (splice)
    cartLocalStorage.findIndex(
      (item) => item._id === productId && item.couchColor === productColor
    ),
    1
    //if we wanted to add elt, it would be here.
    //Else, we remove the element mentioned above the amount of time mentioned (1)
  );
  console.log(cartLocalStorage);
  localStorage.setItem("cartLocalStorage", JSON.stringify(cartLocalStorage));
  location.reload(alert("votre produit a bien été supprimé"));
};

///////////////////////////////
//user data
///////////////////////////////

////////////////
//FBI ! OPEN UP ! !
////////////////
const getFirstNameId = document.getElementById("firstName");
const getLastNameId = document.getElementById("lastName");
const getAdress = document.getElementById("address");
const getCity = document.getElementById("city");
const getEmail = document.getElementById("email");

//Don't mind if I check your record sir?
const validForm = () => {
  getFirstNameId.addEventListener("change", (event) => {
    if (validFirstName(event.target.value)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Le prénom ne doit contenir que des lettres";
    }
  });
  getLastNameId.addEventListener("change", (event) => {
    if (validLastName(event.target.value)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Le nom ne doit contenir que des lettres";
    }
  });
  getAdress.addEventListener("change", (event) => {
    if (validAddress(event.target.value)) {
      document.getElementById("addressErrorMsg").innerHTML = "";
    } else {
      document.getElementById("addressErrorMsg").innerHTML =
        "L'adresse doit être renseignée";
    }
  });
  getCity.addEventListener("change", (event) => {
    if (validCity(event.target.value)) {
      document.getElementById("cityErrorMsg").innerHTML = "";
    } else {
      document.getElementById("cityErrorMsg").innerHTML =
        "La ville ne doit contenir que des lettres";
    }
  });
  getEmail.addEventListener("change", (event) => {
    if (validEmail(event.target.value)) {
      document.getElementById("emailErrorMsg").innerHTML = "";
    } else {
      document.getElementById("emailErrorMsg").innerHTML =
        "L'adresse email n'est pas valide";
    }
  });
};
validForm();
///////////////////////////////
//formulaire validation regex
///////////////////////////////

const validFirstName = (entryUser) => {
  if (entryUser.match(/^([^0-9]*)$/)) {
    //true si ne contient pas de chiffre
    //prends pas en compte les caractères spéciaux pour les espaces ("jean richard de la Tour")
    //et pour les ' par exemple
    return true;
  } else {
    return false;
  }
};
const validLastName = (entryUser) => {
  if (entryUser.match(/^([^0-9]*)$/)) {
    //prends pas en compte les caractères spéciaux pour les espaces "jean richard de la Tour"
    return true;
  } else {
    return false;
  }
};
const validAddress = (entryUser) => {
  if (entryUser) {
    //pas de restriction particulière car besoin de lettre, chiffre & caractère spéciaux
    //!!!!! (requet malveillantes type sql / binaire ?)
    return true;
  } else {
    return false;
  }
};
const validCity = (entryUser) => {
  if (entryUser.match(/^([^0-9]*)$/)) {
    //pas de restriction sur les caractères spéciaux (espace - ')
    return true;
  } else {
    return false;
  }
};
const validEmail = (entryUser) => {
  if (entryUser.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
    //alors là on y va! doit avoir du texte avant & après le @, et après le .
    return true;
  } else {
    return false;
  }
};

// récupération du formulaire html
const cartForm = document.querySelector(".cart__order__form");
cartForm.addEventListener("submit", (e) => {
  validOnSend(e);
});

const validOnSend = (event) => {
  event.preventDefault();
  //Constitution d'un objet contact à partir des données du formulaire
  const firstNameValue = document.getElementById("firstName").value;
  const lastNameValue = document.getElementById("lastName").value;
  const addressValue = document.getElementById("address").value;
  const cityValue = document.getElementById("city").value;
  const emailValue = document.getElementById("email").value;

  const sendOrder = (contact) => {
    const storage = window.localStorage;
    console.log(storage);
    //Constitution d'un aray des pdt avec les ids
    const products = cartLocalStorage.map((newArray) => newArray._id);

    const data = {
      contact,
      products,
    };
    console.log(data);
    ///////////////////////////////
    //requête POST sur l'API
    //et récupération de l'id de commande dans la réponse
    ///////////////////////////////
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        //rediriger user sur la page de confirmation,
        //en passant l'id de commande dans l'URL afin d'afficher le numéro de commande
        window.location.replace(`./confirmation.html?id=${res.orderId}`);
      })
      .catch((error) => console.log(error));
  };
  ///////////////////////////////
  //anything to report sir?
  ///////////////////////////////
  if (
    validFirstName(firstNameValue) &&
    validLastName(lastNameValue) &&
    validAddress(addressValue) &&
    validCity(cityValue) &&
    validEmail(emailValue)
  ) {
    ///////////////////////////////
    //seems like all's in order sir, you're free to go
    ///////////////////////////////
    sendOrder({
      firstNameValue,
      lastNameValue,
      addressValue,
      cityValue,
      emailValue,
    });
  } else {
    return;
  }
};
