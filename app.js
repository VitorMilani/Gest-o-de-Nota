function adicionaDadosAluno() {
    var nome = document.getElementById('input_nome').value;
    var ra = document.getElementById('input_ra').value;
    var email = document.getElementById('input_email').value;
    var prova1 = parseFloat(document.getElementById('input_prova_1').value);
    var aep1 = parseFloat(document.getElementById('input_aep_1').value);
    var provaintegrada1 = parseFloat(document.getElementById('input_prova_integrada_1').value);
    var prova2 = parseFloat(document.getElementById('input_prova_2').value);
    var aep2 = parseFloat(document.getElementById('input_aep_2').value);
    var provaintegrada2 = parseFloat(document.getElementById('input_prova_integrada_2').value);

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

    var mediaB1 = media(prova1, aep1, provaintegrada1);
    var mediaB2 = media(prova2, aep2, provaintegrada2);
    var mediaS3 = medias(mediaB1, mediaB2);

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
    
    criaNovoItemDaLista(DadosAluno, mediaB1, mediaB2, mediaS3);

    localStorage.setItem('dadosAlunos', JSON.stringify(dadosSalvos));

    criaNovoItemDaLista(DadosAluno, mediaB1, mediaB2, mediaS3);

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
            novaLinha.remove(); 
        }
    });
    novaCelulaCheckbox.appendChild(checkbox);
}
