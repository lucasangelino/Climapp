import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // State princial
  // ciudad = state, guardarCiudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado] = useState({})

  useEffect(() => {

    // prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {
      const appId = 'f2a6baf0257b1b6aa80e31e07c0e9280';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; 
      console.log(url)
      // consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ ciudad, pais ]);


  const datosConsulta = datos => {
      // Validar que ambos campos estén
      if(datos.ciudad === '' || datos.pais === '') {
        guardarError(true);
        return;
      }

      // Ciudad y pais existen, agregarlos al state
      guardarCiudad(datos.ciudad);
      guardarPais(datos.pais);
      guardarError(false);
  }
  
  // Cargar un componente Condicionalmente
  let componente;
  if(error) {
    // Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />
  } else {
    // Mostrar el Clima
    componente = <Clima 
                  resultado={resultado}
                />;
  }


  return (
    <div className="App">
        <Header 
          titulo='Clima React App'
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                  <Formulario 
                    datosConsulta={datosConsulta}
                  />
              </div>

              <div className="col s12 m6">
                  {componente}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
