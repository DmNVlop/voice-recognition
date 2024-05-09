import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";

/**
 * Procesa el texto.
 *
 * @param {*} texto
 * @return {*}
 */
const procesarTexto = (texto) => {
  // Agrega un punto al final si no hay signo de puntuación.
  const textoConPunto = texto.trim().endsWith(".") ? texto : `${texto}.`;

  // Asegúrate de que cada nueva línea comience con mayúscula.
  const lineas = textoConPunto.split("\n");
  const lineasConMayusculas = lineas.map((linea) => {
    return linea.charAt(0).toUpperCase() + linea.slice(1);
  });

  // Une las líneas procesadas en un solo texto.
  return lineasConMayusculas.join("\n");
};

/**
 * Componente principal.
 *
 * @return {*}
 */
function VoiceRecognitionComponent() {
  const [texto, setTexto] = useState("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    setTexto(transcript);
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <span>El reconocimiento de voz no es compatible con este navegador.</span>
    );
  }

  const manejarDictado = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      const textoProcesado = procesarTexto(transcript);
      setTexto(textoProcesado);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    }
  };

  // const detenerDictado = () => {
  //   SpeechRecognition.stopListening();
  //   const textoProcesado = procesarTexto(transcript);
  //   setTexto(textoProcesado);
  // };

  const manejarCambio = (event) => {
    setTexto(event.target.value);
  };

  return (
    <>
      <h1>Dicta algo aquí Antonio (Dale a Empezar) 😜📥</h1>
      <div id="controls">
        <button onClick={manejarDictado}>
          {listening ? "Detener dictado" : "Empezar a dictar"}
        </button>
        {/* <button onClick={detenerDictado}>Detener dictado</button> */}
        <button onClick={resetTranscript}>Resetear</button>
      </div>
      <div id="text-area">
        <textarea
          value={texto}
          onChange={manejarCambio}
          placeholder="Empieza a dictar o escribe aquí..."
        />
      </div>
    </>
  );
}
export default VoiceRecognitionComponent;
