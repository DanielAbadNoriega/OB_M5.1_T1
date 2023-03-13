import React, { useState, useCallback } from "react";
import "./App.css";

function App() {
  const names = ["Daniel", "Idoia"];

  return <GeneradorNombres names={names}></GeneradorNombres>;
}

function GeneradorNombres(props) {
  const { names } = props;

  const [name, setName] = useState(null);

  /**
   * * useCallback es usado normalmente para ejecutar funciones en funcion de las dependencias almacenadas
   */
  const getName = useCallback(() => {
    const random = Math.floor(Math.random() * (names.length));
    setName(names[random]);
  }, [names]);

  const clearName = useCallback(() => {
    setName("");
  }, []);

  return (
    <div className="app d-flex flex-column align-items-center">
      <h1 className="mt-2 p-2 bg-light shadow-sm rounded">Memoize de React con useMemo y useCallback</h1>

      {React.useMemo(() => {
        console.log("[ Generador Nombres ] Renderización: ", name);
        return <h2 className="mx-2 p-2 bg-light shadow-sm rounded">Nombre generado: <span style={{"color":"lightcoral"}}>{name ? name : "Sin nombre"}</span></h2>;
      }, [name])}

      <Button label="Generar nombre" click={getName}/>
      <Button label="Limpiar nombre" click={clearName} />
    </div>
  );
}

function WrappedButton({ label, click }) {
  console.log(`[ WrappedButton ] Rendiración del botón: "${label}"`);
  return (
    <button onClick={() => click()} className="btn btn-success btn-lg mx-5 mb-2 w-50 shadow-sm">
      {label}
    </button>
  );
}

/**
 * * React.memo (useMemo) se utiliza para cachear componentes
 */
const Button = React.memo(WrappedButton);

export default App;
