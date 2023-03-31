let livros=[];
const endPointApi = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const elementoParaInserirLivros = document.getElementById('livros')
getBuscarLivrosDaApi();

async function getBuscarLivrosDaApi(){
    const res = await fetch(endPointApi);
    livros = await res.json();
    let livrosComDesconto = aplicarDesconto(livros);
    exibirOsLivrosNaTela(livrosComDesconto);
}

const elementoComValorTotalDeLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis')

//MÉTODO FOREACH()
function exibirOsLivrosNaTela(listaDeLivros){
    elementoComValorTotalDeLivrosDisponiveis.innerHTML='';
    elementoParaInserirLivros.innerHTML = '';
    listaDeLivros.forEach(livro => {
        //let disponibilidade = verificarDisponibilidadeDoLivro(livro)
        let disponibilidade = livro.quantidade>0?'livro__imagens':'livro__imagens indisponivel'
        elementoParaInserirLivros.innerHTML +=
        `
        <div class="livro">
        <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo">
        ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
      `
    })
}

// function verificarDisponibilidadeDoLivro(livro){
//     if(livro.quantidade>0){
//         return 'livro__imagens'
//     }else{
//         return 'livro__imagens indisponivel'
//     }
// }

//MÉTODO MAP()
function aplicarDesconto(livros){
    const desconto = 0.3;
    livrosComDesconto = livros.map(livro =>{
        return {...livro, preco:livro.preco - (livro.preco*desconto)}
    })
    return livrosComDesconto;
}

//MÉTODO FILTER()

// const btnFiltrarLivrosDeFront = document.getElementById('btnFiltrarLivrosFront');
// btnFiltrarLivrosDeFront.addEventListener('click', filtrarLivros)

// function filtrarLivros(){
//     let livrosFiltrados = livros.filter(livro => livro.categoria==='front-end');
//     console.table(livrosFiltrados);
// }

const botoes = document.querySelectorAll('.btn');
botoes.forEach(btn => btn.addEventListener('click', filtrarLivros))

function filtrarLivros(){
    const elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;
    let livrosFiltrados = categoria === 'disponivel' ? filtrarPorQuantidade() : filtrarPorCategoria(categoria);
    exibirOsLivrosNaTela(livrosFiltrados);
    if(categoria==='disponivel'){
        const valorTotal = calcularValorTotal(livrosFiltrados);
        console.log(valorTotal)
        exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal);
    }
}

function calcularValorTotal(livros){
    return livros.reduce((acc, livro)=>acc + livro.preco, 0).toFixed(2);
}

function filtrarPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria === categoria);
}

function filtrarPorQuantidade() {
    return livros.filter(livro => livro.quantidade > 0);
}

function exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal){
    elementoComValorTotalDeLivrosDisponiveis.innerHTML=
    `
    <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
    </div> 
    `
}

//MÉTODO SORT()
let btnOrdenarPorPreco = document.getElementById('btnOrdenarPorPreco');
btnOrdenarPorPreco.addEventListener('click', ordenarLivrosPorPreco);

function ordenarLivrosPorPreco(){
   let livrosOrdenados = livros.sort((a,b)=>a.preco-b.preco)
   exibirOsLivrosNaTela(livrosOrdenados);
}

