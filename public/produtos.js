window.onload = function () {
    CarregarDadosTabela(0);
}

function CarregarToken() {
    var token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    else {
        window.location.href = "index.html";
    }
}

function CarregarDadosTabela(productId) {
    var token = CarregarToken();
    var request = new XMLHttpRequest();

    if (parseInt(productId) > 0) {
        request.open("GET", `/api/v2/produtos/${productId}`, true);
    }
    else {
        request.open("GET", "/api/v2/produtos", true);
    }
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var produtos = JSON.parse(request.responseText);
            MostrarProdutos(produtos);
        }
        else if (request.readyState == 4 && request.responseText) {
            var response = JSON.parse(request.responseText)
            Toast(response.message, '#ff9090');
        }
    }
    request.send();
}

function MostrarProdutos(produtos) {
    var bodytable = document.getElementById("bodytable");
    bodytable.innerHTML = "";
    produtos.forEach(element => {
        var linha = `<tr><td>${element.id}</td><td>${element.descricao}</td><td>${element.valor}</td><td>${element.marca}</td><td><a href="#editModal" class="edit" data-toggle="modal" onclick="Editar(this)"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
            <a href="#deleteModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete" onclick="IdExclusao(this)">&#xE872;</i></a></td></tr>`;
        bodytable.innerHTML += linha;
    });
}

function Filtrar() {
    var productId = document.querySelector("#product-id").value;
    CarregarDadosTabela(productId);
    var filterButton = document.getElementById("btnFilter");
    filterButton.style.display = "none";
    var defilterButton = document.getElementById("btnDefilter");
    defilterButton.style.display = "inline-block";
    $('#filterModal').modal('hide');
}

function Desfiltrar() {
    CarregarDadosTabela(0);
    var filterButton = document.getElementById("btnFilter");
    filterButton.style.display = "inline-block";
    var defilterButton = document.getElementById("btnDefilter");
    defilterButton.style.display = "none";
}

function AddProduto() {
    var token = CarregarToken();

    var descricao = document.getElementById('descricaoadd').value;
    var valor = document.getElementById('valoradd').value;
    var marca = document.getElementById('marcaadd').value;

    var dados = {
        descricao: descricao,
        valor: valor,
        marca: marca
    };

    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open("POST", `/api/v2/produtos`, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 201) {
            var response = JSON.parse(request.responseText);
            CarregarDadosTabela(0);
            $('#addModal').modal('hide');
            Toast(response.message, '#00a000');
        }
        else if (request.readyState == 4 && request.responseText) {
            var response = JSON.parse(request.responseText);
            $('#addModal').modal('hide');
            Toast(response.message, '#ff9090');
        }
    }
    request.send(JSON.stringify(dados));
}

function Editar(element) {
    var id = element.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    var nome = element.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    var valor = element.parentNode.previousElementSibling.previousElementSibling.innerHTML;
    var marca = element.parentNode.previousElementSibling.innerHTML;

    document.getElementById("idacao").innerHtml = id;
    document.getElementById('descricao').value = nome;
    document.getElementById('valor').value = valor;
    document.getElementById('marca').value = marca;
}

function EditarProduto() {
    var token = CarregarToken();

    var id = document.getElementById("idacao").innerHtml;
    var nome = document.getElementById('descricao').value;
    var valor = document.getElementById('valor').value;
    var marca = document.getElementById('marca').value;

    var dadosAtualizados = {
        descricao: nome,
        valor: valor,
        marca: marca
    };

    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open("PUT", `/api/v2/produtos/${id}`, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText);
            CarregarDadosTabela(0);
            $('#editModal').modal('hide');
            Toast(response.message, '#00a000');
        }
        else if (request.readyState == 4 && request.responseText) {
            var response = JSON.parse(request.responseText);
            $('#editModal').modal('hide');
            Toast(response.message, '#ff9090');
        }
    }
    request.send(JSON.stringify(dadosAtualizados));
}

function IdExclusao(element) {
    var id = element.parentNode.previousElementSibling.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    document.getElementById("idacao").innerHtml = id;
}

function Excluir() {
    var id = document.getElementById("idacao").innerHtml;
    if (id) {
        var token = CarregarToken();

        var request = new XMLHttpRequest();   // new HttpRequest instance 
        request.open("DELETE", `/api/v2/produtos/${id}`, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var response = JSON.parse(request.responseText);
                CarregarDadosTabela(0);
                $('#deleteModal').modal('hide');
                Toast(response.message, '#00a000');
            }
            else if (request.readyState == 4 && request.responseText) {
                var response = JSON.parse(request.responseText);
                $('#deleteModal').modal('hide');
                Toast(response.message, '#ff9090');
            }
        }
        request.send();
    }
}

function Deslogar(){
    localStorage.removeItem("token");
    window.location.href = "index.html";
}