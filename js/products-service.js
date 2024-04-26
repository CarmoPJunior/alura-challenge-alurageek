const getProducts = async () => {
  const url = "http://localhost:3000/produtos";
  const products = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      throw new Error("Erro ao buscar os produtos", error);
    });

  return products;
};

const createProduct = async (product) => {
  const url = "http://localhost:3000/produtos";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  };

  const productCreated = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      throw new Error("Erro ao buscar os produtos", error);
    });

  return productCreated;
};

const deleteProduct = async (productId) => {
  const url = `http://localhost:3000/produtos/${productId}`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
      throw new Error("Erro ao deletar produto", error);
    });
};

// export { getProducts, createProduct, deleteProduct };
