import React, { useState } from 'react';
import '../styles/AttendanceConfirmation.css';
import iconConfirmacion from '../../media/icons/carta.webp';

// Importar Firebase Firestore
import { collection, addDoc, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Opciones alimentación
const opcionesAlimentacion = [
    'Ninguno',
    'Vegetariano',
    'Vegano',
    'Celíaco',
    'Diabético',
    'Hipertenso',
    'Intolerante a la lactosa',
    'Otro',
];

const AttendanceConfirmation = () => {
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [datos, setDatos] = useState([
        { nombre: '', apellido: '', alimentacion: 'Ninguno' },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para saber si está enviando

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

        const formularioCompleto = datos.every(
            (d) => d.nombre.trim() !== '' && d.apellido.trim() !== ''
        );

        if (!formularioCompleto) {
            alert('Por favor completá todos los campos.');
            return;
        }

        setIsSubmitting(true); // Activo estado enviando

        try {
            const invitados = datos.map(({ nombre, apellido, alimentacion }) => ({
                invitado: `${nombre.trim()} ${apellido.trim()}`,
                restriccionAlimentaria: alimentacion || 'Ninguno',
            }));

            await addDoc(collection(db, "confirmados"), {
                cantidad: cantidadPersonas,
                invitados: invitados,
                fechaConfirmacion: new Date(),
            });

            const cantidadDocRef = doc(db, "invitados", "cantidad");
            await updateDoc(cantidadDocRef, {
                total: increment(cantidadPersonas)
            });

            const alimentacionDocRef = doc(db, "invitados", "alimentacion");
            const alimentacionDocSnap = await getDoc(alimentacionDocRef);
            if (!alimentacionDocSnap.exists()) {
                throw new Error("El documento 'invitados/alimentacion' no existe.");
            }

            const alimentacionData = alimentacionDocSnap.data();

            const mapAlimentacion = {
                'Ninguno': 'ninguno',
                'Vegetariano': 'vegetariano',
                'Vegano': 'vegano',
                'Celíaco': 'celiaco',
                'Diabético': 'diabetico',
                'Hipertenso': 'hipertenso',
                'Intolerante a la lactosa': 'lactosa',
                'Otro': null
            };

            const incrementos = {};

            datos.forEach(({ alimentacion }) => {
                const key = mapAlimentacion[alimentacion];
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

            alert('Asistencia confirmada y guardada. ¡Gracias!');
            setCantidadPersonas(1);
            setDatos([{ nombre: '', apellido: '', alimentacion: 'Ninguno' }]);
        } catch (error) {
            console.error("Error al guardar o actualizar en Firestore:", error);
            alert('Hubo un error al guardar los datos. Por favor, intentá nuevamente.');
        }

        setIsSubmitting(false); // Desactivo estado enviando
    };

    return (
        <div className="attendanceConfirmationContainer">
            <div className="icono-superior"><img src={iconConfirmacion} alt="confirmacion" /></div>
            <h2>Confirmacion de asistencia</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="cantidad" className="label-cantidad">
                    ¿Cuántas personas asistirán?
                </label>
                <select
                    id="cantidad"
                    className="select-cantidad"
                    value={cantidadPersonas}
                    onChange={handleCantidadChange}
                    disabled={isSubmitting} // Opcional: deshabilitar select mientras envía
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            Persona {i + 1}
                        </option>
                    ))}
                </select>

                {datos.map((persona, index) => (
                    <div key={index} className="tarjeta-persona">
                        <h3>Persona {index + 1}</h3>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={persona.nombre}
                            onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                            required
                            disabled={isSubmitting} // Deshabilitar input mientras envía
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={persona.apellido}
                            onChange={(e) => handleChange(index, 'apellido', e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                        <label className='restriccionAlimentariaTitle'>Restricción alimentaria:</label>
                        <select
                            value={persona.alimentacion}
                            onChange={(e) => handleChange(index, 'alimentacion', e.target.value)}
                            disabled={isSubmitting}
                        >
                            {opcionesAlimentacion.map((op, i) => (
                                <option key={i} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <button
                    type="submit"
                    className="boton-enviar"
                    disabled={isSubmitting} // Deshabilitar botón mientras envía
                >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </div>
    );
};

export default AttendanceConfirmation;
