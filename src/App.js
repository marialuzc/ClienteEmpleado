import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [annos, setAnnos] = useState();  
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosLista, setEmpleados] = useState([]);

  const addEmpleado = ()=>{
    // alert(nombre);
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      annos:annos
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      alert("Empleado registrado");
    });
  }

  const getEmpleados = ()=>{
    // alert(nombre);
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  //getEmpleados();

  const actualizar = ()=>{
    // alert(nombre);
    Axios.put("http://localhost:3001/actualizarEmpleado",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      annos:annos
    }).then(()=>{
      getEmpleados();
      alert("Actualizado empleado");
      limpiarCampos();
    });
  }

  const borrarEmpleado = (val)=>{
    // alert(nombre);
    Axios.delete(`http://localhost:3001/borrarEmpleado/${val.id}`).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }
 
  const limpiarCampos =()=>{
    setAnnos("");
    setCargo("");
    setEdad("");
    setNombre("");
    setPais("");
    setId("");
    setEditar(false);

  }

  // editar Empleado

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnnos(val.annos);
    setId(val.id);  


  }


  return (
    
  <div className="container">  
    <div className="card text-center">
      <div className="card-header">
        Gestion de Empleados
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" 
          onChange={(event)=>{
            setNombre(event.target.value)
          }}
          className="form-control" value={nombre} placeholder="ingrese nombre" aria-label="nombre" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" 
          onChange={(event)=>{
            setEdad(event.target.value)
          }}
          className="form-control" value={edad} placeholder="ingrese edad" aria-label="edad" aria-describedby="basic-addon1"/>
        </div>        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">País:</span>
          <input type="text" value={pais}
          onChange={(event)=>{
            setPais(event.target.value)
          }}
          className="form-control" placeholder="ingrese un pais" aria-label="pais" aria-describedby="basic-addon1"/>
        </div>          
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input type="text" 
          onChange={(event)=>{
            setCargo(event.target.value)
          }}
          className="form-control" value={cargo} placeholder="ingrese cargo" aria-label="cargo" aria-describedby="basic-addon1"/>
        </div> 
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
          <input type="number" 
          onChange={(event)=>{
            setAnnos(event.target.value)
          }}
          className="form-control" value={annos} placeholder="ingrese años de experiencia" aria-label="annos" aria-describedby="basic-addon1"/>
        </div> 
      </div>
      <div className="card-footer text-mutted">
        {
          editar?
          <div>
          <button className='btn btn-warning m-2' onClick={actualizar}>Actualizar</button>
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={addEmpleado}>Registrar</button>
        }
      
      
      </div>
    </div>

    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Edad</th>
        <th scope="col">Pais</th>
        <th scope="col">Cargo</th>
        <th scope="col">Experiencia</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {
        empleadosLista.map((val,key)=>{
          return <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.annos}</td>              
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      onClick={()=>{
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" 
                      onClick={()=>{
                        borrarEmpleado(val);
                      }}
                      className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr> 
        })
      }
      
    </tbody>   
    
    </table>
  </div>
  );
}

export default App;
