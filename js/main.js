
const productList = document.getElementById("productList");
const formProduct = document.getElementById("formProduct");

const setInfoMessage = (messages) => {
  const formProductInfoMessage = document.getElementById(
    "formProductInfoMessage"
  );
  formProductInfoMessage.textContent = "";
  formProductInfoMessage.textContent = messages;
  formProductInfoMessage.style.display = "block";
};

const searchProducts = async () => {
  try {
    const products = await getProducts();
    console.log(products);
    setProductList(products);
  } catch (error) {
    console.error("Erro ao pesquisar produtos, erro: ", error);
    console.error(error);
    alert("Erro ao pesquisar produtos, erro: ", error);
  }
};

const setProductList = (products) => {
  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += createProductCard(product);
  });
};

const createProductCard = (product) => {
  const card = `
        <div class="product__card" data-id="${product.id}">

            <div class="product__card-image">
                <img src="${product.imagem}">
            </div>

            <span class="product__card-name">
                ${product.nome}
            </span>

            <div class="product__card-footer">

                <span class="value">${product.valor}</span>
                <button class="btn-remove"  onclick="removeProduct(event, ${product.id} )">
                    <img src="assets/icon-delete.svg" alt="">
                </button>

            </div>

        </div>    
    `;

  return card;
};

const submitFormProduct = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData(formProduct);

    const product = {
      nome: formData.get("nome"),
      valor: formData.get("valor"),
      imagem: formData.get("imagem"),
    };

    const errors = validateProduct(product);

    if (Object.keys(errors).length === 0) {
      console.log(product);
      await createProduct(product);
      console.log(`Produto criado com sucesso!`);
      //   setInfoMessage(`Produto criado com sucesso!`);

      await searchProducts();
    } else {
      console.error("Erros de validação:", errors);
      setInfoMessage(`Erros de validação:", errors`);
    }
  } catch (error) {
    console.error("Erro ao criar produto, erro: ", error);
    setInfoMessage(`Erros de validação:", ${error}`);
  }
};

const clearFormProduct = () => {
  formProduct.reset();
};

const validateProduct = (product) => {
  let errors = {};

  if (!product.nome.trim()) {
    errors.nome = "Nome do produto é obrigatório";
  }
  if (!product.valor || isNaN(product.valor)) {
    errors.valor = "Valor do produto é obrigatório e deve ser um número";
  }
  if (!product.imagem.trim()) {
    errors.imagem = "Imagem do produto é obrigatória";
  }
  return errors;
};

const removeProduct = async (event, productId) => {
  event.preventDefault();
  try {
    console.log(productId);
    const confirmDelete = confirm(
      `Tem certeza que deseja remover o Produto de id (${productId})?`
    );
    if (confirmDelete) {
      await deleteProduct(productId);
      console.log(`Produto (${productId}) deletado com sucesso!`);
      await searchProducts();
    }
  } catch (error) {
    console.error("Erro ao criar produto, erro: ", error);
    setInfoMessage(`Erros de validação:", ${error}`);
  }
};

// Função anônima assíncrona autoinvocada
(async () => {
  try {
    await searchProducts();
  } catch (error) {
    console.error("Erro na função anônima, erro: ", error);
    console.error(error);
    // alert("Erro na função anônima, erro: ", error);
  }
})();
