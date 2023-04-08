const section = document.querySelector('section')
const tableBody = document.querySelector('table tbody')
const inputSearch = document.querySelector('#search')
const btnFilter = document.querySelector('#filter')
//div que contem as opçoes do filtro que contem os radioButtons
const divOpcoes = document.querySelector('.opcoes')
//radio button [A-Z]
const radioOrdenarAz = document.querySelector('#ordenarAz')
const radioOrdenaMenorPreco = document.querySelector('#ordenaMenorPreco')
const radioOrdenaMaiorPreco = document.querySelector('#ordenaMaiorPreco')

async function loadData(){
    try{

        const response = await fetch('produtos.json')
        const data = await response.json()

        const produtos = data.produtos

        
        produtos.forEach(p => {

            const row = document.createElement('tr')
            
            const thProdutos = document.createElement('td')
            thProdutos.textContent = p.nome
            thProdutos.classList.add('produtos')
            row.appendChild(thProdutos)

            const thPrecoCompra = document.createElement('td')
            thPrecoCompra.innerText = `R$: ${p.preco_compra},00`
            row.appendChild(thPrecoCompra)

            const thPrecoVenda = document.createElement('td')
            thPrecoVenda.textContent = `R$: ${p.preco_venda},00`
            row.appendChild(thPrecoVenda)

            const thDataCompra = document.createElement('td')
            thDataCompra.innerText = converteData(p.data_compra)
            row.appendChild(thDataCompra)

            tableBody.appendChild(row)
            
        });
        

        

    }catch(error){
        console.log(error);
    }
}
loadData()

function converteData(data){

    const [ano, mes, dia] = data.split('-')

    const dataFormatada = `${dia}/${mes}/${ano}`

    return dataFormatada
}

//funçao respomsável por filtrar os dados input adcionando na query e filtrando pelo nome, transformado tudo em minusculo para não haver problemas de camelCase entre o array e os dados digitados

function searchProduto(produtos, query){
    //console.log(produtos, query)
    return produtos.filter(produtos => produtos.nome.toLowerCase().includes(query.toLowerCase()))
}
//função que recebe o json e filtra os produtos adcionando em um novo array que inserido na tabela atualizando dinamicamente

async function handleInputChange(){
    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos
    const query = inputSearch.value

    const produtosFiltrado = searchProduto(produtos, query)

    let html = ''

    for(const produto of produtosFiltrado){
      
        html += `<tr><td>${produto.nome}</td><td>R$: ${produto.preco_compra},00</td><td>R$: ${produto.preco_venda},00</td><td>${converteData(produto.data_compra)}</td></tr>`
    }

    tableBody.innerHTML = html
}

inputSearch.addEventListener('input', handleInputChange)
loadData()

//evento que abri ou fecha a div opçoes pelo método toggle
btnFilter.addEventListener('click', event => {
    event.stopPropagation();
    divOpcoes.classList.toggle('active');
});
//evento que remove as opçoes ao clicar no body
document.body.addEventListener('click', event => {
    if (!divOpcoes.contains(event.target)) {
      divOpcoes.classList.remove('active');
    }
});


//function que orderna o produto organizando de a-z

async function ordenarAz() {
    const response = await fetch('produtos.json');
    const data = await response.json();
  
    const produtos = data.produtos;
  
    produtos.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });

    let html = ''

    for(const produto of produtos){
      
        html += `<tr><td>${produto.nome}</td><td>R$: ${produto.preco_compra},00</td><td>R$: ${produto.preco_venda},00</td><td>${converteData(produto.data_compra)}</td></tr>`
    }

    tableBody.innerHTML = html
    // console.log(produtos);
  }


//adcionando o evento no radioButton 
radioOrdenarAz.addEventListener('click', ordenarAz)

//função que ordena pelo menor preço
async function ordernaMenorPreco(){

    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos

    produtos.sort((a, b) => {
        if(a.preco_compra < b.preco_compra){
            return -1
        }
        if(a.preco_compra > b.preco_compra){
            return 1
        }
        return 0
    })


    let html = ''

    for(const produto of produtos){
      
        html += `<tr><td>${produto.nome}</td><td>R$: ${produto.preco_compra},00</td><td>R$: ${produto.preco_venda},00</td><td>${converteData(produto.data_compra)}</td></tr>`
    }

    tableBody.innerHTML = html
    //console.log(produtos)

}

//adicionando evento para ordenar pelo menor preço
radioOrdenaMenorPreco.addEventListener('click', ordernaMenorPreco)

//função que ordenar pelo maior preço

async function ordenaMaiorPreco(){
    const response = await fetch('produtos.json')
    const data = await response.json()
    
    const produtos = data.produtos

    produtos.sort((a, b) =>{
        if(a.preco_compra > b.preco_compra) return -1
        if(a.preco_compra < b.preco_compra) return 1
        return 0
    })

   let html = ''

   for(const produto of produtos){
        html += `<tr><td>${produto.nome}</td><td>R$: ${produto.preco_compra},00</td><td>R$: ${produto.preco_venda},00</td><td>${converteData(produto.data_compra)}</td></tr>`
   }

   tableBody.innerHTML = html
}

radioOrdenaMaiorPreco.addEventListener('click', ordenaMaiorPreco)