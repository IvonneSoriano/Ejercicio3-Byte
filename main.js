var firebaseConfig = {
    apiKey: "AIzaSyD0r7ALKLQ87RW6ojpHNh2M1U6tb_iDhZI",
    authDomain: "ejercicio3-byte.firebaseapp.com",
    databaseURL: "https://ejercicio3-byte.firebaseio.com",
    projectId: "ejercicio3-byte",
    storageBucket: "ejercicio3-byte.appspot.com",
    messagingSenderId: "440678823450",
    appId: "1:440678823450:web:a18c6a6a5198ef166703a3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getID(id) {
    return document.getElementById(id).value;
}
function validarCampos(id) {

}
function clearData() {
    let inputs = document.getElementsByTagName("input");
    for (let j = 0; j < inputs.length; j++) {
        inputs[j].value = "";
    }
}
function arrayJSON(id, nombre, nit, fundacion, direccion) {
    var data = {
        id: id,
        name: nombre,
        nit: nit,
        fundacion: fundacion,
        direccion: direccion
    };
    return data;
}
function fillInputs(id,nombre,nit, fecha, dir){
    document.getElementById("id").value=id;
    document.getElementById("nombre").value=nombre;
    document.getElementById("nit").value=nit;
    document.getElementById("fundacion").value=fecha;
    document.getElementById("direccion").value=dir;

}

function createRow(id, nombre, nit, fecha, dir) {
    return '<tr>' +
        '<td>' + id + '</td>' +
        '<td>' + nombre + '</td>' +
        '<td>' + nit + '</td>' +
        '<td>' + fecha + '</td>' +
        '<td>' + dir + '</td>' +
        '<td class="edit" style="color:blue; cursor:pointer" onclick="app.edit('+id+',\''+nombre+'\',\''+nit+'\',\''+fecha+'\',\''+dir+'\')"> Editar </td>' +
        '<td class="delete" style="color:red; cursor:pointer" onclick="app.delete('+id+')"> Eliminar </td>' +

        
        '</tr>';

}

function innerHTML(id,result){
    return document.getElementById(id).innerHTML+=result;
}

var app = {
    insert: function () {
        var id = getID("id");
        var nombre = getID("nombre");
        var nit = getID("nit");
        var fundacion = getID("fundacion");
        var direccion = getID("direccion");
        if (id.length == 0 || nombre.length == 0 || nit.length == 0 || fundacion.length == 0 || direccion.length == 0) {
            alert("Campos vacios.");
        }
        else {
            var arrayData = arrayJSON(id, nombre, nit, fundacion, direccion);
            var company = firebase.database().ref("comp/" + id);
            company.set(arrayData);
            alert("su dato ha sido guardado correctamente");
            clearData();
        }
    },
    show: function () {
        var company = firebase.database().ref("comp/");
        company.on("child_added", function (data) {
            let values = data.val();
            var tabla = createRow(values.id, values.name, values.nit, values.fundacion, values.direccion);
            innerHTML("loadData",tabla);
        })

    },
    edit: function(id, nombre, nit, fecha, dir){
        fillInputs(id, nombre,nit,fecha,dir);
    }, 
    delete: function(id){
        let comp = firebase.database().ref("comp/"+id);
        comp.remove();
        location.reload();
    }

}