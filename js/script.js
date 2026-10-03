import { salvarCadastro, carregarCadastro } from './storage.js';
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('aberto');
    });
}

const fecharModal = document.querySelector('#fecharModal');
const modal = document.querySelector('#modal');

document.addEventListener('click', (evento) => {
    if (evento.target.matches('#abrirModal')) {
        modal.style.display = 'flex';
    }
});

if (fecharModal && modal) {
    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
const conteudoPrincipal = document.getElementById('conteudo-principal');
const animais = [
    {
        nome: 'Mel',
        imagem: '../images/cachorro/mel.png',
        tipo: 'cachorro',
        descricao: 'Carinhosa, brincalhona e cheia de energia.'
    },
    {
        nome: 'Luna',
        imagem: '../images/cachorro/luna.png',
        tipo: 'cachorro',
        descricao: 'Calma, carinhosa e adora receber atenção.'
    },
    {
        nome: 'Thor',
        imagem: '../images/cachorro/thor.png',
        tipo: 'cachorro',
        descricao: 'Brincalhão, companheiro e muito amoroso.'
    },
    {
        nome: 'Nina',
        imagem: '../images/cachorro/nina.png',
        tipo: 'gata',
        descricao: 'Doce, tranquila e esperando uma família.'
    }
];

const rotas = {
    inicio: `
        <div class="inicio" id="inicio">
            <img alt="Banner da campanha com gato e cachorro" src="../images/cachorro/background.png">
        </div>
    `,

    sobre: `
        <section class="sobre" id="sobre">
            <h1>Sobre nós</h1>
            <p>
                A Patinhas de Amor é uma organização dedicada ao resgate,
                cuidado e adoção responsável de animais que precisam de um novo lar.
            </p>
        </section>
    `,

    ajuda: `
        <section class="ajuda container" id="ajuda">
            <h1>Ajude a transformar vidas</h1>

            <p>
                Você também pode fazer parte dessa história. Existem várias formas
                de ajudar nossos animais.
            </p>

            <button class="botao-modal" id="abrirModal">Quero Ajudar</button>

            <div class="alerta alerta-sucesso">
                <strong>✓ Cadastro realizado com sucesso!</strong>
                <p>Obrigado por ajudar a Patinhas de Amor.</p>
            </div>

            <div class="container-row">
                <article>
                    <h2>Adote</h2>
                    <p>
                        Dê um lar cheio de amor para um animal que precisa de você.
                    </p>
                </article>

                <article>
                    <h2>Seja voluntário</h2>
                    <p>
                        Ajude nos cuidados e nas atividades da nossa organização.
                    </p>
                </article>

                <article>
                    <h2>Doe</h2>
                    <p>
                        Contribua com ração, medicamentos ou recursos financeiros.
                    </p>
                </article>
            </div>
        </section>

        <section class="animais container" id="adocao">
            <h1>Animais para adoção</h1>

            <p>
                Conheça alguns dos nossos animais que estão esperando por uma família.
            </p>

            ${animais.map(animal => `
    <article class="animal">
        <img src="${animal.imagem}" alt="${animal.nome}, ${animal.tipo} para adoção">
        <h2>${animal.nome}</h2>
        <span class="badge">Disponível para adoção</span>
        <p>${animal.descricao}</p>
        <a href="#">Quero conhecer</a>
    </article>
`).join('')}
        </section>
    `
};
function navegar(rota) {
    if (rotas[rota]) {
        conteudoPrincipal.innerHTML = rotas[rota];
    }
}
document.querySelectorAll('.menu a[data-rota]').forEach(link => {
    link.addEventListener('click', function(evento) {
        evento.preventDefault();

        const rota = this.dataset.rota;
        navegar(rota);
    });
});
const formCadastro = document.querySelector('#formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const dadosCadastro = {
            nome: document.querySelector('#nome').value,
            cpf: document.querySelector('#cpf').value,
            nascimento: document.querySelector('#nascimento').value,
            email: document.querySelector('#email').value,
            telefone: document.querySelector('#telefone').value,
            cep: document.querySelector('#cep').value,
            endereco: document.querySelector('#endereco').value,
            numero: document.querySelector('#numero').value,
            cidade: document.querySelector('#cidade').value,
            estado: document.querySelector('#estado').value
        };

salvarCadastro(dadosCadastro);

        alert('Cadastro realizado com sucesso!');
    });
}
if (formCadastro) {
    const dadosCadastro = carregarCadastro();

    if (dadosCadastro) {
        formCadastro.querySelector('#nome').value = dadosCadastro.nome;
        formCadastro.querySelector('#cpf').value = dadosCadastro.cpf;
        formCadastro.querySelector('#nascimento').value = dadosCadastro.nascimento;
        formCadastro.querySelector('#email').value = dadosCadastro.email;
        formCadastro.querySelector('#telefone').value = dadosCadastro.telefone;
        formCadastro.querySelector('#cep').value = dadosCadastro.cep;
        formCadastro.querySelector('#endereco').value = dadosCadastro.endereco;
        formCadastro.querySelector('#numero').value = dadosCadastro.numero;
        formCadastro.querySelector('#cidade').value = dadosCadastro.cidade;
        formCadastro.querySelector('#estado').value = dadosCadastro.estado;
    }
}

function mostrarErro(elemento, mensagem) {
    elemento.textContent = mensagem;
    elemento.classList.add('mensagem-erro');
}

function limparErro(elemento) {
    elemento.textContent = '';
    elemento.classList.remove('mensagem-erro');
}
if (formCadastro) {
    formCadastro.addEventListener('input', (evento) => {

        if (evento.target.value.trim() !== '') {
            evento.target.style.borderColor = '#F53E68';
        } else {
            evento.target.style.borderColor = '';
        }

       if (evento.target.id === 'nome') {
    const erroNome = document.querySelector('#erroNome');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroNome, 'Preencha seu nome completo.');
    } else {
        limparErro(erroNome);
    }
}
       if (evento.target.id === 'cpf') {
    const erroCpf = document.querySelector('#erroCpf');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroCpf, 'Preencha o CPF.');
    } else if (!evento.target.checkValidity()) {
        mostrarErro(erroCpf, 'Digite um CPF no formato correto.');
    } else {
        limparErro(erroCpf);
    }
}
if (evento.target.id === 'email') {
    const erroEmail = document.querySelector('#erroEmail');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroEmail, 'Preencha o e-mail.');
    } else if (!evento.target.checkValidity()) {
        mostrarErro(erroEmail, 'Digite um e-mail válido.');
    } else {
        limparErro(erroEmail);
    }
}
if (evento.target.id === 'telefone') {
    const erroTelefone = document.querySelector('#erroTelefone');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroTelefone, 'Preencha o telefone.');
    } else if (!evento.target.checkValidity()) {
        mostrarErro(erroTelefone, 'Digite um telefone válido.');
    } else {
        limparErro(erroTelefone);
    }
}
if (evento.target.id === 'cep') {
    const erroCep = document.querySelector('#erroCep');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroCep, 'Preencha o CEP.');
    } else if (!evento.target.checkValidity()) {
        mostrarErro(erroCep, 'Digite um CEP válido.');
    } else {
        limparErro(erroCep);
    }
}
if (evento.target.id === 'endereco') {
    const erroEndereco = document.querySelector('#erroEndereco');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroEndereco, 'Preencha o endereço.');
    } else {
        limparErro(erroEndereco);
    }
}
if (evento.target.id === 'numero') {
    const erroNumero = document.querySelector('#erroNumero');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroNumero, 'Preencha o número.');
    } else {
        limparErro(erroNumero);
    }
}
if (evento.target.id === 'cidade') {
    const erroCidade = document.querySelector('#erroCidade');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroCidade, 'Preencha a cidade.');
    } else {
        limparErro(erroCidade);
    }
}
if (evento.target.id === 'estado') {
    const erroEstado = document.querySelector('#erroEstado');

    if (evento.target.value.trim() === '') {
        mostrarErro(erroEstado, 'Preencha o estado.');
    } else {
        limparErro(erroEstado);
    }
}
    });
}
AOS.init();
