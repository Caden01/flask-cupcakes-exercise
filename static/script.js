const $cupcakeForm = $("#cupcake-form");
const $cupcakeList = $("#cupcake-list");

async function showCupcakes() {
  const res = await axios.get("http://127.0.0.1:5000/api/cupcakes");

  for (let cupcake of res.data.cupcakes) {
    $cupcakeList.append(generateCupcake(cupcake));
  }
}

async function handleCupcakeForm(evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  const res = await axios.post("http://127.0.0.1:5000/api/cupcakes", {
    flavor,
    size,
    rating,
    image,
  });

  let cupcake = $(generateCupcake(res.data.cupcake));

  $cupcakeList.append(cupcake);
  $cupcakeForm.trigger("reset");
}

function generateCupcake(cupcake) {
  return `
        <li>
            <div data-cupcake-id="${cupcake.id}">
                <img src="${cupcake.image}">
                <p>Flavor: ${cupcake.flavor}</p>
                <p>Size: ${cupcake.size}</p>
                <p>Rating: ${cupcake.rating}</p>
                <button id="delete-btn">X</button>
            </div>
        </li>
    `;
}

async function deleteCupcake(evt) {
  evt.preventDefault();

  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`http://127.0.0.1:5000/api/cupcakes/${cupcakeId}`);
  $cupcake.remove();
}

$cupcakeList.on("click", "#delete-btn", deleteCupcake);

$cupcakeForm.on("submit", handleCupcakeForm);

showCupcakes();
