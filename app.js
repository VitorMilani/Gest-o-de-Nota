window.onload = function() {
    LocalStorage();
};

function adicionaDadosAluno() {
    const nome = document.getElementById('input_nome').value;
    const ra = document.getElementById('input_ra').value;
    const email = document.getElementById('input_email').value;
    const prova1 = parseFloat(document.getElementById('input_prova_1').value);
    const aep1 = parseFloat(document.getElementById('input_aep_1').value);
    const provaintegrada1 = parseFloat(document.getElementById('input_prova_integrada_1').value);
    const prova2 = parseFloat(document.getElementById('input_prova_2').value);
    const aep2 = parseFloat(document.getElementById('input_aep_2').value);
    const provaintegrada2 = parseFloat(document.getElementById('input_prova_integrada_2').value);

    const DadosAluno = {
        nome,
        ra,
        email,
        prova1,
        aep1,
        provaintegrada1,
        prova2,
        aep2,
        provaintegrada2,
    };

    const mediaB1 = media(prova1, aep1, provaintegrada1);
    const mediaB2 = media(prova2, aep2, provaintegrada2);
    const mediaS3 = medias(mediaB1, mediaB2);

    if(!nome ||!ra || !email || !prova1 || !aep1 || !provaintegrada1 || !prova2 || !aep2 || !provaintegrada2){
    alert('É Obrigatório preencher todos as dados!');
    return;
    }

    if (prova1 < 0, prova1 > 8) {
        alert('A nota da Prova 1 deve estar entre 0 e 8!');
        return;
    }

    if (aep1 < 0, aep1 > 1) {
        alert('A nota da AEP 1 deve estar entre 0 e 1!');
        return;
    }

    if (provaintegrada1 < 0, provaintegrada1 > 1) {
        alert('A nota da Integrada 1 deve estar entre 0 e 1!');
        return;
    }

    if (prova2 < 0, prova2 > 8) {
        alert('A nota da Prova 2 deve estar entre 0 e 8!');
        return;
    }

    if (aep2 < 0, aep2 > 1) {
        alert('A nota da AEP 2 deve estar entre 0 e 1!');
        return;
    }

    if (provaintegrada2 < 0, provaintegrada2 > 1) {
        alert('A nota da Integrada 2 deve estar entre 0 e 1!');
        return;
    }
    
    if (!email.includes('@')) {
        alert("Forneça um E-mail válido!");
        return;
    }

    if (ra.length !== 8) {
        alert("Forneça um RA válido!");
        return;
    }

    criaNovoItemDaLista(DadosAluno, mediaB1, mediaB2, mediaS3);

    let dadosSalvos = JSON.parse(localStorage.getItem('dadosAlunos')) || [];
    dadosSalvos.push(DadosAluno);
    localStorage.setItem('dadosAlunos', JSON.stringify(dadosSalvos));

}



function media(n1, n2, n3) {
    var media = (n1 + n2 + n3);
    media = Math.min(Math.max(media, 0), 10);
    return media.toFixed(1);
}

function medias(n1, n2) {
    var media = (parseFloat(n1) + parseFloat(n2)) / 2;
    return media.toFixed(1);
}

function situacao(media3) {
    var situacao;
    if (media3 >= 6) {
        situacao = "Aprovado";
    } else if (media3 >= 3) {
        situacao = "Recuperação";
    } else {
        situacao = "Reprovado";
    }
    return situacao;
}

function criaNovoItemDaLista(tarefa, media1, media2, media3) {
    const tabelaTarefas = document.getElementById('tabela_de_tarefas');
    const novaLinha = tabelaTarefas.insertRow(-1);

    const colunas = [
        tarefa.nome,
        tarefa.ra,
        tarefa.email,
        tarefa.prova1,
        tarefa.aep1,
        tarefa.provaintegrada1,
        media1,
        tarefa.prova2,
        tarefa.aep2,
        tarefa.provaintegrada2,
        media2,
        media3
    ];

    colunas.forEach((valor, indice) => {
        const novaCelula = novaLinha.insertCell(indice);
        novaCelula.appendChild(document.createTextNode(valor));
    });

    const novaCelulaSituacao = novaLinha.insertCell(colunas.length);
    const situacaoAluno = situacao(media3);
    novaCelulaSituacao.appendChild(document.createTextNode(situacaoAluno));

    const novaCelulaCheckbox = novaLinha.insertCell(colunas.length + 1);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            const rowIndex = novaLinha.rowIndex;
            ExcluirColuna(rowIndex - 1);
            novaLinha.remove(); 
        }
    });
    novaCelulaCheckbox.appendChild(checkbox);
}

function LocalStorage() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosAlunos')) || [];
    dadosSalvos.forEach(function(dados) {
        const mediaB1 = media(dados.prova1, dados.aep1, dados.provaintegrada1);
        const mediaB2 = media(dados.prova2, dados.aep2, dados.provaintegrada2);
        const mediaS3 = medias(mediaB1, mediaB2);

        criaNovoItemDaLista(dados, mediaB1, mediaB2, mediaS3);
    });
}

function ExcluirColuna(index) {
    let dadosSalvos = JSON.parse(localStorage.getItem('dadosAlunos')) || [];
    dadosSalvos.splice(index, 1);
    localStorage.setItem('dadosAlunos', JSON.stringify(dadosSalvos));
}
