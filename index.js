const section = document.querySelector('section')
const tableBody = document.querySelector('table tbody')

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