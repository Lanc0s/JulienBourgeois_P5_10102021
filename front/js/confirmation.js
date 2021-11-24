let baseUrl = window.location.href;

let url = new URL(baseUrl);

let search_params = url.searchParams;

const orderId = search_params.get("id");

if (orderId) {
  document.getElementById("orderId").innerHTML = orderId;

  //Erase cart
  const storage = window.localStorage;
  storage.clear();
}
