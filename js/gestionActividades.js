

function post(codigo, nombres, apellidos) {
    $.ajax({
        url: 'http://localhost:8000/estudiantes',
        method: 'post',//registrar datos
        data: {
             codigo: codigo,
             nombres: nombres,
             apellidos: apellidos
        }
     
    }).done(response=>{
     let dataJson=JSON.parse(response);
     const msg = dataJson.data;
     alert(msg);
     console.log(response)
    });
     }


function btnRegistro(){
    var name = document.getElementById('name')
    var username = document.getElementById('username')
    var password =  document.getElementById('password')
    post(name.value, username.value, password.value)
    location.reload();
}
//

function btnDelete(id){
    $.ajax({
        method: 'delete',//consultar datos
        url: 'http://localhost:8000/usuarios/'+id
    }).done(response=>{
        alert(response)
    })
}




function modificar(usuarioid){
    idusuariomodificar = usuarioid
    $.ajax({
        url: 'http://localhost:8000/usuarios/'+idusuariomodificar,
        method: 'get',
    }).done(response=>{
        console.log(response)
    }) 
}

function btnModificar(usuarioid, name, username, password){
    $.ajax({
        url: 'http://localhost:8000/usuarios/'+usuarioid,
        method: 'put',
         name : name,
         username : username,
         password :  password
         
    })
}



$(document).ready(function(){
    $.ajax({
        method: 'get',//consultar datos
        url: 'http://localhost:8000/usuarios'
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const usuarios = dataJson.data;
        const table = document.getElementById('usuariosTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        usuarios.forEach(usuario => {
          html +=  '<tr>';
          html +=   '<td>'+ usuario.name +'</td>';
          html +=   '<td>'+ usuario.username +'</td>';
          html +=   '<td>';
          html +=       '<button onclick="modificar('+usuario.id+')">Modificar</button>';
          html +=   '</td>';
          html +=   '<td>';
          html +=       '<button onclick="btnDelete('+usuario.id+')" >Eliminar</button>';
          html +=   '</td>';
          html +=   '</tr>';  
        });
        tbody.innerHTML = html;
    }).fail((error)=>{
        console.error(error);    
    });

 

   



   $.ajax({                                         
    url: 'http://localhost:8000/usuarios',
    method: 'put',//modificar
    data: {
         name: 'Admin 1',
         username: 'admin 1',
         password: '3210'
    }
}).done(response=>{
 const dataJson=JSON.parse(response);
 const msg = dataJson.data;
 alert(msg);
 
}); 


});
