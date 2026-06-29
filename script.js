/**
 * =========================================================
 * SCRIPT.JS - Fundamentos de JavaScript: DOM y Eventos
 * Semana 5 - Desarrollo de Aplicaciones Web
 * =========================================================
 */

// 1. ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado correctamente');

    // =========================================================
    // 2. OBTENER REFERENCIAS A ELEMENTOS DEL DOM
    //    Usando getElementById y querySelector
    // =========================================================
    const solicitudesForm = document.getElementById('solicitudForm');
    const nombreInput = document.getElementById('solicitudNombre');
    const emailInput = document.getElementById('solicitudEmail');
    const categoriaSelect = document.getElementById('solicitudCategoria');
    const descripcionInput = document.getElementById('solicitudDescripcion');
    const listaSolicitudes = document.getElementById('listaSolicitudes');
    const contadorSolicitudes = document.getElementById('contadorSolicitudes');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const mensajeVacio = document.getElementById('mensajeVacio');

    // =========================================================
    // 3. CAPTURAR EVENTO SUBMIT DEL FORMULARIO
    //    Usando addEventListener()
    // =========================================================
    solicitudesForm.addEventListener('submit', function(event) {
        
        // 3.1 PREVENTDEFAULT() - Evitar recarga de página
        event.preventDefault();
        console.log('📝 Formulario enviado - Validando datos...');

        // 3.2 OBTENER VALORES DE LOS CAMPOS
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const categoria = categoriaSelect.value;
        const descripcion = descripcionInput.value.trim();

        // 3.3 VALIDAR QUE LOS CAMPOS NO ESTÉN VACÍOS
        let errores = [];

        // Validar nombre
        if (nombre === '') {
            errores.push('El nombre completo es obligatorio');
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
        }

        // Validar email
        if (email === '') {
            errores.push('El correo electrónico es obligatorio');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
        } else if (!validarEmail(email)) {
            errores.push('Ingrese un correo electrónico válido');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        // Validar categoría
        if (categoria === '') {
            errores.push('Seleccione una categoría');
            categoriaSelect.classList.add('is-invalid');
            categoriaSelect.classList.remove('is-valid');
        } else {
            categoriaSelect.classList.remove('is-invalid');
            categoriaSelect.classList.add('is-valid');
        }

        // Validar descripción
        if (descripcion === '') {
            errores.push('La descripción es obligatoria');
            descripcionInput.classList.add('is-invalid');
            descripcionInput.classList.remove('is-valid');
        } else if (descripcion.length < 10) {
            errores.push('La descripción debe tener al menos 10 caracteres');
            descripcionInput.classList.add('is-invalid');
            descripcionInput.classList.remove('is-valid');
        } else {
            descripcionInput.classList.remove('is-invalid');
            descripcionInput.classList.add('is-valid');
        }

        // 3.4 MOSTRAR MENSAJES DINÁMICOS DE VALIDACIÓN
        mostrarMensajesValidacion(errores);

        // Si hay errores, DETENER el proceso
        if (errores.length > 0) {
            console.log('❌ Errores de validación:', errores);
            return;
        }

        // =========================================================
        // 4. CREAR ELEMENTOS HTML DESDE JAVASCRIPT
        //    Usando createElement() y appendChild()
        // =========================================================
        console.log('✅ Validación exitosa - Creando solicitud...');

        // 4.1 Crear el elemento LI
        const li = document.createElement('li');
        li.className = 'list-group-item solicitud-item';

        // 4.2 Asignar un ID único
        const id = Date.now();
        li.dataset.id = id;

        // 4.3 Obtener fecha actual
        const fecha = new Date().toLocaleString('es-EC');

        // 4.4 Crear el contenido HTML del elemento
        //     Aplicando clases de Bootstrap a los elementos creados dinámicamente
        li.innerHTML = `
            <div class="d-flex flex-wrap justify-content-between align-items-start">
                <div class="flex-grow-1 me-3">
                    <h5 class="mb-1">${escapeHTML(nombre)}</h5>
                    <div class="d-flex flex-wrap gap-2 mb-1">
                        <span class="badge bg-primary">${escapeHTML(categoria)}</span>
                        <span class="badge bg-secondary">${escapeHTML(email)}</span>
                    </div>
                    <p class="mb-1 text-muted small">${escapeHTML(descripcion)}</p>
                    <small class="text-muted">📅 ${fecha}</small>
                </div>
                <!-- Botón para ELIMINAR registro -->
                <button class="btn btn-danger btn-sm eliminar-solicitud" data-id="${id}">
                    🗑️ Eliminar
                </button>
            </div>
        `;

        // 4.5 Agregar el elemento a la lista usando appendChild()
        listaSolicitudes.appendChild(li);

        // 4.6 Ocultar el mensaje de "no hay registros"
        if (mensajeVacio) {
            mensajeVacio.style.display = 'none';
        }

        // =========================================================
        // 5. PERMITIR ELIMINAR REGISTROS MEDIANTE BOTÓN Y EVENTO CLICK
        //    Usando addEventListener() para el evento click
        // =========================================================
        const btnEliminar = li.querySelector('.eliminar-solicitud');
        btnEliminar.addEventListener('click', function() {
            eliminarSolicitud(this.dataset.id);
        });

        // =========================================================
        // 6. MOSTRAR EN PANTALLA EL TOTAL DE REGISTROS CREADOS
        // =========================================================
        actualizarContador();

        // =========================================================
        // 7. LIMPIAR EL FORMULARIO DESPUÉS DE ENVIAR
        // =========================================================
        limpiarFormulario();

        // Mostrar mensaje de éxito
        mostrarMensajeExito('✅ ¡Solicitud registrada con éxito!');

        console.log('✅ Solicitud creada correctamente');
    });

    // =========================================================
    // 8. FUNCIÓN PARA ELIMINAR SOLICITUDES
    // =========================================================
    function eliminarSolicitud(id) {
        console.log(`🗑️ Eliminando solicitud ID: ${id}`);

        // Buscar el elemento en el DOM usando querySelector
        const elemento = document.querySelector(`.solicitud-item[data-id="${id}"]`);

        if (elemento) {
            // Animación de salida
            elemento.style.transition = 'all 0.3s ease';
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateX(50px)';

            // Eliminar después de la animación
            setTimeout(function() {
                // Eliminar del DOM usando removeChild
                listaSolicitudes.removeChild(elemento);
                
                // Actualizar contador
                actualizarContador();

                // Si no hay elementos, mostrar mensaje de vacío
                if (listaSolicitudes.children.length === 0 && mensajeVacio) {
                    mensajeVacio.style.display = 'block';
                }

                console.log(`✅ Solicitud ID ${id} eliminada`);
                mostrarMensajeExito('🗑️ Solicitud eliminada correctamente');
            }, 300);
        }
    }

    // =========================================================
    // 9. FUNCIONES AUXILIARES
    // =========================================================

    // 9.1 Validar email con expresión regular
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // 9.2 Escapar HTML para prevenir XSS
    function escapeHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    // 9.3 Mostrar mensajes dinámicos de validación
    function mostrarMensajesValidacion(errores) {
        if (errores.length > 0) {
            mensajeValidacion.className = 'alert alert-danger mt-3';
            mensajeValidacion.innerHTML = `
                <strong>⚠️ Por favor corrija los siguientes errores:</strong>
                <ul class="mb-0 mt-1">
                    ${errores.map(function(error) {
                        return `<li>${escapeHTML(error)}</li>`;
                    }).join('')}
                </ul>
            `;
            mensajeValidacion.style.display = 'block';
            
            // Scroll al mensaje de error
            mensajeValidacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            mensajeValidacion.style.display = 'none';
        }
    }

    // 9.4 Mostrar mensaje de éxito
    function mostrarMensajeExito(mensaje) {
        mensajeValidacion.className = 'alert alert-success mt-3';
        mensajeValidacion.innerHTML = mensaje;
        mensajeValidacion.style.display = 'block';

        // Ocultar automáticamente después de 4 segundos
        setTimeout(function() {
            mensajeValidacion.style.transition = 'opacity 0.5s ease';
            mensajeValidacion.style.opacity = '0';
            setTimeout(function() {
                mensajeValidacion.style.display = 'none';
                mensajeValidacion.style.opacity = '1';
            }, 500);
        }, 4000);
    }

    // 9.5 Limpiar formulario
    function limpiarFormulario() {
        nombreInput.value = '';
        emailInput.value = '';
        categoriaSelect.value = '';
        descripcionInput.value = '';

        // Remover clases de validación
        const inputs = [nombreInput, emailInput, categoriaSelect, descripcionInput];
        inputs.forEach(function(input) {
            input.classList.remove('is-valid', 'is-invalid');
        });
    }

    // 9.6 Actualizar contador de registros
    function actualizarContador() {
        const total = listaSolicitudes.children.length;
        contadorSolicitudes.textContent = total;
        console.log(`📊 Total de solicitudes: ${total}`);
    }

    console.log('🚀 Aplicación lista para usar');
});