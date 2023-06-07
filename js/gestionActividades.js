function btnRegistroNota(){
    var id = document.getElementById('id')
    var descripcion = document.getElementById('descripcion')
    var nota =  document.getElementById('nota')
    var codigoEstudiante =  document.getElementById('codigoEstudiante')
    post(id.value, descripcion.value, nota.value, codigoEstudiante.value)
    location.reload();
}
function btnDeleteNota(id){
    $.ajax({
        method: 'delete',//consultar datos
        url: 'http://localhost:8000/actividades/'+id
    }).done(response=>{
        alert(response)
    })
}
function post(id, descripcion, nota, codigoEstudiante) {
    $.ajax({
        url: 'http://localhost:8000/actividades',
        method: 'post',//registrar datos
        data: {
             id: id,
             descripcion: descripcion,
             nota: nota,
             codigoEstudiante: codigoEstudiante
        }
     
    }).done(response=>{
     let dataJson=JSON.parse(response);
     const msg = dataJson.data;
     alert(msg);
     console.log(response)
    });
     }
     function modificar(actividadid){
        idActModif = actividadid
        $.ajax({
            url: 'http://localhost:8000/actividades/'+idActModif,
            method: 'get',
        }).done(response=>{
            console.log(response)
        }) 
    }
    
    function btnModificarNota(estudianteid, nombres, apellidos){
        $.ajax({
            url: 'http://localhost:8000/actividades/'+estudianteid,
            method: 'put',
             nombres : nombres,
             apellidos : apellidos
             
        })
    }
$(document).ready(function(){
    $.ajax({
        method: 'get',//consultar datos
        url: 'http://localhost:8000/actividades',
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const actividades = dataJson.data;
        const table = document.getElementById('actividadesTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        let sumNotas =0;
        let denom=0;
        actividades.forEach(actividad => {
          html +=  '<tr>';
          html +=   '<td>'+ actividad.id +'</td>';
          html +=   '<td>'+ actividad.descripcion +'</td>';
          html +=   '<td>'+ actividad.nota +'</td>';
          html +=   '<td>';
          html +=       '<button onclick="modificar('+actividad.id+')">Modificar</button>';
          html +=   '</td>';
          html +=   '<td>';
          html +=       '<button onclick="btnDeleteNota('+actividad.id+')" >Eliminar</button>';
          html +=   '</td>';
          html +=   '<td>';
          html +=   '</tr>';  
          sumNotas += parseFloat(actividad.nota);
          denom += 1; 
        });
        let promedio = 0;
        promedio = sumNotas/denom;
        if(promedio>=3.0){
            document.getElementById('promedio').innerText='Promedio: '+ promedio + ' Aprobo';
            document.getElementById('promedio').style.color = 'green';
            promedio=0;
        }else{
            document.getElementById('promedio').innerText='Promedio: '+ promedio + ' no aprobo';
            document.getElementById('promedio').style.color = 'red';
            promedio=0;
        }
        tbody.innerHTML = html;
        
    }).fail((error)=>{
        console.error(error);    
    });
    $.ajax({                                         
        url: 'http://localhost:8000/actividades',
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