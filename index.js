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
            row.appendChild(thProdutos)

            const thPrecoCompra = document.createElement('td')
            thPrecoCompra.innerText = `R$: ${p.preco_compra}`
            row.appendChild(thPrecoCompra)

            const thPrecoVenda = document.createElement('td')
            thPrecoVenda.textContent = `R$: ${p.preco_venda}`
            row.appendChild(thPrecoVenda)

            const thDataCompra = document.createElement('th')
            thDataCompra.innerText = p.data_compra
            row.appendChild(thDataCompra)

            tableBody.appendChild(row)
            
        });
        

        

    }catch(error){
        console.log(error);
    }
}
loadData()