import React, { useState, useEffect } from 'react';
import './ConversorMonedas.css';
import { getMonedas, convertirMoneda } from '../api/exchangeRate';
import SwapButton from './Boton/Boton';

export default function ConversorMonedas() {
  const [monedas, setMonedas] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [resultado, setResultado] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarMonedas = async () => {
      try {
        const data = await getMonedas();
        setMonedas(data);
      } catch (err) {
        setError('Error al cargar las monedas');
      }
    };
    cargarMonedas();
  }, []);

  useEffect(() => {
    const convertir = async () => {
      if (amount && from && to && monedas.length > 0) {
        try {
          const res = await convertirMoneda(from, to, amount);
          setResultado(res);
          setError(null);
        } catch (err) {
          setResultado('');
          setError('Error al convertir la moneda');
        }
      } else {
        setResultado('');
      }
    };
    convertir();
  }, [amount, from, to, monedas]);

  return (
    <div className='pagina'>
      <div className="titulo">
        <h2>Convierte tu moneda</h2>
      </div>
      <div className="card">
        <div className="conversor">
          <div className="fila-conversor">
            <div className="grupo-conversor">
              <label>Importe</label>
              <div className='contenedor-inputs'>
                <div className='input-unificado'>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ej: 100"
                  />
                </div>
                <div className='select-unificado'>
                  <select value={from} onChange={(e) => setFrom(e.target.value)}>
                    {monedas.map((moneda) => (
                      <option key={moneda} value={moneda}>{moneda}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <SwapButton 
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
            />
            <div className="grupo-conversor">
              <label>Convertir a</label>
              <div className='contenedor-inputs'>
                <div className='input-unificado'>
                  <input
                    type="number"
                    value={resultado !== '' ? Number(resultado).toFixed(2) : ''}
                    readOnly
                    placeholder="Resultado"
                  />
                </div>
                <div className='select-unificado'>
                  <select value={to} onChange={(e) => setTo(e.target.value)}>
                    {monedas.map((moneda) => (
                      <option key={moneda} value={moneda}>{moneda}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
