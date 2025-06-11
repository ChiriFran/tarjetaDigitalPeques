import React, { useState } from 'react';
import '../styles/AttendanceConfirmation.css';
import { collection, addDoc, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const opcionesAlimentacion = [
    'Ninguno', 'Vegetariano', 'Vegano', 'Celíaco',
    'Diabético', 'Hipertenso', 'Intolerante a la lactosa', 'Otro',
];

const AttendanceConfirmation = ({ onClose }) => {
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [datos, setDatos] = useState([{ nombre: '', apellido: '', alimentacion: 'Ninguno' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCantidadChange = (e) => {
        const nuevaCantidad = parseInt(e.target.value);
        setCantidadPersonas(nuevaCantidad);
        const nuevosDatos = Array.from({ length: nuevaCantidad }, (_, i) =>
            datos[i] || { nombre: '', apellido: '', alimentacion: 'Ninguno' }
        );
        setDatos(nuevosDatos);
    };

    const handleChange = (index, field, value) => {
        const nuevosDatos = [...datos];
        nuevosDatos[index][field] = value;
        setDatos(nuevosDatos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formularioCompleto = datos.every(d => d.nombre.trim() && d.apellido.trim());
        if (!formularioCompleto) return alert('Por favor completá todos los campos.');

        setIsSubmitting(true);
        try {
            const invitados = datos.map(({ nombre, apellido, alimentacion }) => ({
                invitado: `${nombre.trim()} ${apellido.trim()}`,
                restriccionAlimentaria: alimentacion || 'Ninguno',
            }));

            await addDoc(collection(db, "confirmados"), {
                cantidad: cantidadPersonas,
                invitados,
                fechaConfirmacion: new Date(),
            });

            await updateDoc(doc(db, "invitados", "cantidad"), {
                total: increment(cantidadPersonas),
            });

            const alimentacionDocRef = doc(db, "invitados", "alimentacion");
            const alimentacionDocSnap = await getDoc(alimentacionDocRef);
            if (!alimentacionDocSnap.exists()) throw new Error("No existe el doc 'alimentacion'");

            const alimentacionData = alimentacionDocSnap.data();
            const map = {
                'Ninguno': 'ninguno', 'Vegetariano': 'vegetariano', 'Vegano': 'vegano',
                'Celíaco': 'celiaco', 'Diabético': 'diabetico', 'Hipertenso': 'hipertenso',
                'Intolerante a la lactosa': 'lactosa', 'Otro': null
            };

            const incrementos = {};
            datos.forEach(({ alimentacion }) => {
                const key = map[alimentacion];
                if (key && key in alimentacionData) {
                    incrementos[key] = (incrementos[key] || 0) + 1;
                }
            });

            for (const key in incrementos) {
                incrementos[key] = increment(incrementos[key]);
            }
            if (Object.keys(incrementos).length > 0) {
                await updateDoc(alimentacionDocRef, incrementos);
            }

            alert('Asistencia confirmada. ¡Gracias!');
            setCantidadPersonas(1);
            setDatos([{ nombre: '', apellido: '', alimentacion: 'Ninguno' }]);
            onClose(); // Cierra el modal al enviar
        } catch (err) {
            console.error("Error:", err);
            alert('Error al guardar. Reintentá.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close">×</button>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label className="label-cantidad">¿Cuántas personas asistirán?</label>
                    <select value={cantidadPersonas} onChange={handleCantidadChange} disabled={isSubmitting} className="select-cantidad">
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} persona{s(i + 1)}</option>
                        ))}
                    </select>

                    {datos.map((persona, index) => (
                        <div key={index} className="tarjeta-persona">
                            <h3>Invitado {index + 1}</h3>
                            <input type="text" placeholder="Nombre" value={persona.nombre} onChange={e => handleChange(index, 'nombre', e.target.value)} required disabled={isSubmitting} />
                            <input type="text" placeholder="Apellido" value={persona.apellido} onChange={e => handleChange(index, 'apellido', e.target.value)} required disabled={isSubmitting} />
                            <label className="restriccionAlimentariaTitle">Restricción alimentaria:</label>
                            <select value={persona.alimentacion} onChange={e => handleChange(index, 'alimentacion', e.target.value)} disabled={isSubmitting}>
                                {opcionesAlimentacion.map((op, i) => (
                                    <option key={i} value={op}>{op}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button type="submit" className="boton-enviar" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const s = (n) => n > 1 ? 's' : '';

export default AttendanceConfirmation;
