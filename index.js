const section = document.querySelector('section')
const tableBody = document.querySelector('table tbody')
const inputSearch = document.querySelector('#search')
const btnFilter = document.querySelector('#filter')
const divOpcoes = document.querySelector('.opcoes')

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

function searchProduto(produtos, query){
    //console.log(produtos, query)
    return produtos.filter(produtos => produtos.nome.toLowerCase().includes(query.toLowerCase()))
}

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

function visibilityFilter(){

    divOpcoes.classList.toggle('active')

}
btnFilter.addEventListener('click', visibilityFilter)