function Logar() {
    var login = $("#login").val();
    var senha = $("#senha").val();

    var request = new XMLHttpRequest();
    request.open("POST", "/api/seg/login", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText)
            localStorage.setItem("token", response.token);
            window.location.href = "produtos.html";
        }
        else if (request.readyState == 4 && request.responseText) {
            var response = JSON.parse(request.responseText);
            Toast(response.message, '#ff9090');
        }
    }
    request.send(JSON.stringify({"login": login, "senha": senha}));
}

function MostrarCadastro(){
    $("#formcadastro").show();
    $("#formlogin").hide();
}

function VoltarLogin(){
    $("#formcadastro").hide();
    $("#formlogin").show();
}

function Cadastrar() {
    var nome = $("#nome").val();
    var email = $("#email").val();
    var login = $("#logincad").val();
    var senha = $("#senhacad").val();

    var dados = {
        nome: nome,
        email: email,
        login: login,
        senha: senha
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/api/seg/register", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText);
            VoltarLogin();
            Toast(response.message, '#00a000');
        }
        else if (request.readyState == 4 && request.responseText) {
            var response = JSON.parse(request.responseText);
            Toast(response.message, '#ff9090');
        }
    }
    request.send(JSON.stringify(dados));
}
