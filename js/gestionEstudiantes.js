function btnRegistro(){
    var codigo = document.getElementById('codigo')
    var nombres = document.getElementById('nombres')
    var apellidos =  document.getElementById('apellidos')
    post(codigo.value, nombres.value, apellidos.value)
    location.reload();
}
function btnDelete(codigo){
    $.ajax({
        method: 'delete',//consultar datos
        url: 'http://localhost:8000/estudiantes/'+codigo
    }).done(response=>{
        alert(response)
    })
}
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
     function modificar(estudianteid){
        idestmodificar = estudianteid
        $.ajax({
            url: 'http://localhost:8000/estudiantes/'+idestmodificar,
            method: 'get',
        }).done(response=>{
            console.log(response)
        }) 
    }
    
    function btnModificar(estudianteid, nombres, apellidos){
        $.ajax({
            url: 'http://localhost:8000/estudiantes/'+estudianteid,
            method: 'put',
             nombres : nombres,
             apellidos : apellidos
             
        })
    }
$(document).ready(function(){
    $.ajax({
        method: 'get',//consultar datos
        url: 'http://localhost:8000/estudiantes'
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const estudiantes = dataJson.data;
        const table = document.getElementById('estudiantesTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        estudiantes.forEach(estudiante => {
          html +=  '<tr>';
          html +=   '<td>'+ estudiante.codigo +'</td>';
          html +=   '<td>'+ estudiante.nombres +'</td>';
          html +=   '<td>'+ estudiante.apellidos +'</td>';
          html +=   '<td>';
          html +=       '<button onclick="modificar('+estudiante.codigo+')">Modificar</button>';
          html +=   '</td>';
          html +=   '<td>';
          html +=       '<button onclick="btnDelete('+estudiante.codigo+')" >Eliminar</button>';
          html +=   '</td>';
          html +=   '<td>';
          html +=   '<a href="indexActiv.html">Notas</a>';
          html +=   '</tr>';  
        });
        tbody.innerHTML = html;
    }).fail((error)=>{
        console.error(error);    
    });







//












 

   



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
