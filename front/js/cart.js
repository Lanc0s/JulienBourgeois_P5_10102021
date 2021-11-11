/*
 fetch depuis le localStorage avec une possibilité de le modifier(?)
 
 eventListener sur
        <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>

 préparer un message d'erreur sur le firstName
*/

const getDataSofas = () => {
  return fetch("http://localhost:3000/api/products").then((product) => {
    return product.json();
  });
};
