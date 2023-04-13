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
const radioOrdenaData = document.querySelector('#ordenaData')
const wrapperResult = document.querySelectorAll('.wrapper-result')
const colorTheme = document.querySelector('#color-theme')


colorTheme.addEventListener('click', changeTheme)

function changeTheme(){
    document.body.classList.toggle('dark')
}

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
            thPrecoCompra.innerText = `${p.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
            row.appendChild(thPrecoCompra)

            const thPrecoVenda = document.createElement('td')
            thPrecoVenda.textContent = `${p.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
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
      
        html += `<tr><td>${produto.nome}</td><td>${produto.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td>${produto.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td>${converteData(produto.data_compra)}</td></tr>`
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
      
        html += `<tr><td>${produto.nome}</td>
        <td>${produto.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td>${produto.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </td><td>${converteData(produto.data_compra)}</td></tr>`
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
      
        html += `<tr><td>${produto.nome}</td>
        <td>${produto.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td>${produto.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </td><td>${converteData(produto.data_compra)}</td></tr>`
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
    html += `<tr><td>${produto.nome}</td>
    <td>${produto.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
    <td>${produto.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
    </td><td>${converteData(produto.data_compra)}</td></tr>`
   }

   tableBody.innerHTML = html
}

radioOrdenaMaiorPreco.addEventListener('click', ordenaMaiorPreco)

//ordena por data

async function ordernaData(){

    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos

    produtos.sort((a, b) =>{
        if(a.data_compra < b.data_compra) return -1
        if(a.data_compra > b.data_compra) return  1
        return 0
    })

    let html =''

    for(const produto of produtos){

        html += `<tr><td>${produto.nome}</td>
        <td>${produto.preco_compra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        <td>${produto.preco_venda.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </td><td>${converteData(produto.data_compra)}</td></tr>`
    }
    tableBody.innerHTML = html
}

radioOrdenaData.addEventListener('click', ordernaData)


//percorrendo todas as divs que possuem a classe wrapper-result e aplcando uma classe active para criar a transição
wrapperResult.forEach((r, index) =>{
    r.addEventListener('click', ()=>{
        r.classList.toggle('active')
        if(r.classList.contains('active') && index === 0){
            calculaFaturamento(0)
        }
        if(r.classList.contains('active') && index === 1){
            calcularLucroLiquido(1)
        }
        if(r.classList.contains('active') && index === 2){
            calculaPorcentagemLucro(2)
        }
    })
})

//função responsavel por calcular a soma de todos produtos faturados

async function calculaFaturamento(index){
    
    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos



    const totalFaturado = produtos.reduce((accumulator,valor) =>{
        return accumulator + valor.preco_venda
    }, 0)

    //criado um intervalo de tempo que excuta de 0 até o valor final por 500 iterações a cada 5ms
    let valorAtual = 0;
    const intervalo = setInterval(()=>{
        valorAtual += totalFaturado / 500;
        if(valorAtual >= totalFaturado) {
            clearInterval(intervalo);
        }
        const totalFaturadoFormatado = valorAtual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        const resultH3 = document.getElementById('total-faturado');
        resultH3.innerText = totalFaturadoFormatado;

        const progressFatuardo = document.querySelector('.linear-faturado')
        progressFatuardo.style.backgroundImage = `conic-gradient(
            #5a189a ${valorAtual * 0/ totalFaturado}%,
            #ff9e00 ${valorAtual * 60/ totalFaturado}%,
            #5a189a ${valorAtual * 95/ totalFaturado }%,
            #e5e5e5 0%)`;

        const progressValue = document.querySelector('#progress-faturado')
        
        const progressInner = `${(totalFaturado / 1000).toFixed(1)} mil`
        progressValue.innerText = progressInner
    }, 5)
    
}


//calula o lucroliquido(faturamento tatol - preco de compra total)
async function calcularLucroLiquido(index){
    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos

    const totalComprado = produtos.reduce((accumulator, valor) =>{
        return accumulator + valor.preco_compra
    },0)

    const totalFaturado = produtos.reduce((accumulator,valor) =>{
        return accumulator + valor.preco_venda
    }, 0)

    const lucroTotal = totalFaturado-totalComprado

    let valorAtual = 0
    const intervalo = setInterval(()=>{
        valorAtual += lucroTotal/500
        if(valorAtual >= lucroTotal){
            clearInterval(intervalo)
        }
        const lucroTotalFormatado = valorAtual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        const h3LuroLiquido = document.getElementById('lucro-liquido')
        h3LuroLiquido.innerText = lucroTotalFormatado

        const progressBarLiquido  = document.querySelector('.linear-liquido')
        progressBarLiquido.style.backgroundImage = `conic-gradient(
            #5a189a ${valorAtual * 0/ lucroTotal}%,
            #ff9e00 ${valorAtual * 20/ lucroTotal}%,
            #5a189a ${valorAtual * 30/ lucroTotal }%,
            #e5e5e5 0%)`;

            //#5a189a ${valorAtual * 7/ percentual}%,
        const progressValue = document.querySelector('#progress-liquido')
        
        const progressInner = `${(valorAtual / 1000).toFixed(1)} mil`

        progressValue.innerText = progressInner
        

    })
    
}

//calula o a porcentagem de lucro(lucroTotal/totalFaturado*100)
async function calculaPorcentagemLucro(index){
    const response = await fetch('produtos.json')
    const data = await response.json()

    const produtos = data.produtos

    const totalComprado = produtos.reduce((accumulator, valor) =>{
        return accumulator + valor.preco_compra
    },0)

    const totalFaturado = produtos.reduce((accumulator,valor) =>{
        return accumulator + valor.preco_venda
    }, 0)

    const lucroTotal = totalFaturado-totalComprado


    const percentual = ((lucroTotal/totalFaturado) * 100).toFixed(2)

    let valorAtual = 0
    const intervalo = setInterval(()=>{
        valorAtual += percentual/500
        if(valorAtual >= percentual){
            clearInterval(intervalo)
        }
       
        const percentualFormatodo = valorAtual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        const h3percentual = document.getElementById('percentual-de-lucro')
        h3percentual.innerText = `% ${percentualFormatodo}`

        //atualizando o progressBar
        const progressBar = document.querySelector('.linear-lucro')
        progressBar.style.backgroundImage = `conic-gradient(
            #5a189a ${valorAtual * 0/ percentual}%,
            #ff9e00 ${valorAtual * 14/ percentual}%,
            #e5e5e5 0%)`;

            //#5a189a ${valorAtual * 7/ percentual}%,

        // atualiza o valor da div com a classe 'progress-value'
        const progressValue = document.querySelector("#progress-lucro");

        const percentualInner = valorAtual.toFixed(1)
        progressValue.innerText = percentualInner

       
       
    })
    
}
