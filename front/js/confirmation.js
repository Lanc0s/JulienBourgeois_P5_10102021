let baseUrl = window.location.href;

let url = new URL(baseUrl);

let search_params = url.searchParams;

const orderId = search_params.get("id");

if (orderId) {
  document.getElementById("orderId").innerHTML = orderId;

  //Effacer le numéro de commande
  const storage = window.localStorage;
  storage.clear();
}
