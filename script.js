/**
 * =========================================================
 * SCRIPT.JS - Validaciones Dinámicas y Manejo de Formularios
 * Semana 6 - Desarrollo de Aplicaciones Web
 * =========================================================
 */

// 1. ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado correctamente - Semana 6');

    // =========================================================
    // 2. OBTENER REFERENCIAS A ELEMENTOS DEL DOM
    // =========================================================
    var solicitudesForm = document.getElementById('solicitudForm');
    var nombreInput = document.getElementById('solicitudNombre');
    var emailInput = document.getElementById('solicitudEmail');
    var categoriaSelect = document.getElementById('solicitudCategoria');
    var descripcionInput = document.getElementById('solicitudDescripcion');
    var listaSolicitudes = document.getElementById('listaSolicitudes');
    var contadorSolicitudes = document.getElementById('contadorSolicitudes');
    var mensajeValidacion = document.getElementById('mensajeValidacion');
    var mensajeVacio = document.getElementById('mensajeVacio');
    var btnEnviar = document.getElementById('btnEnviarSolicitud');
    var caracteresActuales = document.getElementById('caracteresActuales');

    // =========================================================
    // 3. REFERENCIAS A LOS MENSAJES DE FEEDBACK POR CAMPO
    // =========================================================
    var nombreFeedback = document.getElementById('nombreFeedback');
    var nombreFeedbackSuccess = document.getElementById('nombreFeedbackSuccess');
    var emailFeedback = document.getElementById('emailFeedback');
    var emailFeedbackSuccess = document.getElementById('emailFeedbackSuccess');
    var categoriaFeedback = document.getElementById('categoriaFeedback');
    var categoriaFeedbackSuccess = document.getElementById('categoriaFeedbackSuccess');
    var descripcionFeedback = document.getElementById('descripcionFeedback');
    var descripcionFeedbackSuccess = document.getElementById('descripcionFeedbackSuccess');

    // =========================================================
    // 4. VALIDACIONES EN TIEMPO REAL CON EVENTO 'input'
    // =========================================================

    // 4.1 Validación del campo NOMBRE (mínimo 3 caracteres)
    nombreInput.addEventListener('input', function() {
        var valor = this.value.trim();
        var esValido = valor.length >= 3;
        
        if (valor.length > 0 && esValido) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            nombreFeedback.style.display = 'none';
            nombreFeedbackSuccess.style.display = 'block';
        } else if (valor.length > 0 && !esValido) {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            nombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
            nombreFeedback.style.display = 'block';
            nombreFeedbackSuccess.style.display = 'none';
        } else {
            this.classList.remove('is-valid', 'is-invalid');
            nombreFeedback.style.display = 'none';
            nombreFeedbackSuccess.style.display = 'none';
        }
    });

    // 4.2 Validación del campo EMAIL (formato válido)
    emailInput.addEventListener('input', function() {
        var valor = this.value.trim();
        var esValido = validarEmail(valor);
        
        if (valor.length > 0 && esValido) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            emailFeedback.style.display = 'none';
            emailFeedbackSuccess.style.display = 'block';
        } else if (valor.length > 0 && !esValido) {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            emailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
            emailFeedback.style.display = 'block';
            emailFeedbackSuccess.style.display = 'none';
        } else {
            this.classList.remove('is-valid', 'is-invalid');
            emailFeedback.style.display = 'none';
            emailFeedbackSuccess.style.display = 'none';
        }
    });

    // 4.3 Validación del campo CATEGORÍA (selección obligatoria)
    categoriaSelect.addEventListener('change', function() {
        var esValido = this.value !== '';
        
        if (esValido) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            categoriaFeedback.style.display = 'none';
            categoriaFeedbackSuccess.style.display = 'block';
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            categoriaFeedback.style.display = 'block';
            categoriaFeedbackSuccess.style.display = 'none';
        }
    });

    // 4.4 Validación del campo DESCRIPCIÓN (mínimo 10 caracteres)
    descripcionInput.addEventListener('input', function() {
        var valor = this.value.trim();
        var esValido = valor.length >= 10;
        
        // Actualizar contador de caracteres
        if (caracteresActuales) {
            caracteresActuales.textContent = valor.length;
        }
        
        if (valor.length > 0 && esValido) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            descripcionFeedback.style.display = 'none';
            descripcionFeedbackSuccess.style.display = 'block';
        } else if (valor.length > 0 && !esValido) {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            descripcionFeedback.textContent = 'La descripción debe tener al menos 10 caracteres (actual: ' + valor.length + ')';
            descripcionFeedback.style.display = 'block';
            descripcionFeedbackSuccess.style.display = 'none';
        } else {
            this.classList.remove('is-valid', 'is-invalid');
            descripcionFeedback.style.display = 'none';
            descripcionFeedbackSuccess.style.display = 'none';
        }
    });

    // =========================================================
    // 5. VALIDACIONES CON EVENTO 'blur' (al salir del campo)
    // =========================================================

    // 5.1 Validación al salir del campo NOMBRE
    nombreInput.addEventListener('blur', function() {
        var valor = this.value.trim();
        if (valor.length > 0 && valor.length < 3) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            nombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
            nombreFeedback.style.display = 'block';
            nombreFeedbackSuccess.style.display = 'none';
        }
    });

    // 5.2 Validación al salir del campo EMAIL
    emailInput.addEventListener('blur', function() {
        var valor = this.value.trim();
        if (valor.length > 0 && !validarEmail(valor)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            emailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
            emailFeedback.style.display = 'block';
            emailFeedbackSuccess.style.display = 'none';
        }
    });

    // 5.3 Validación al salir del campo DESCRIPCIÓN
    descripcionInput.addEventListener('blur', function() {
        var valor = this.value.trim();
        if (valor.length > 0 && valor.length < 10) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            descripcionFeedback.textContent = 'La descripción debe tener al menos 10 caracteres (actual: ' + valor.length + ')';
            descripcionFeedback.style.display = 'block';
            descripcionFeedbackSuccess.style.display = 'none';
        }
    });

    // 5.4 Validación al salir del campo CATEGORÍA
    categoriaSelect.addEventListener('blur', function() {
        if (this.value === '') {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            categoriaFeedback.style.display = 'block';
            categoriaFeedbackSuccess.style.display = 'none';
        }
    });

    // =========================================================
    // 6. CAPTURAR EVENTO SUBMIT DEL FORMULARIO
    // =========================================================
    solicitudesForm.addEventListener('submit', function(event) {
        
        // 6.1 PREVENTDEFAULT() - Evitar recarga de página
        event.preventDefault();
        console.log('📝 Formulario enviado - Validando datos...');

        // 6.2 OBTENER VALORES DE LOS CAMPOS
        var nombre = nombreInput.value.trim();
        var email = emailInput.value.trim();
        var categoria = categoriaSelect.value;
        var descripcion = descripcionInput.value.trim();

        // 6.3 VALIDAR QUE LOS CAMPOS NO ESTÉN VACÍOS
        var errores = [];

        // Validar nombre (mínimo 3 caracteres)
        if (nombre === '') {
            errores.push('El nombre completo es obligatorio');
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
            nombreFeedback.textContent = 'El nombre completo es obligatorio';
            nombreFeedback.style.display = 'block';
            nombreFeedbackSuccess.style.display = 'none';
        } else if (nombre.length < 3) {
            errores.push('El nombre debe tener al menos 3 caracteres');
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
            nombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
            nombreFeedback.style.display = 'block';
            nombreFeedbackSuccess.style.display = 'none';
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
            nombreFeedback.style.display = 'none';
            nombreFeedbackSuccess.style.display = 'block';
        }

        // Validar email
        if (email === '') {
            errores.push('El correo electrónico es obligatorio');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailFeedback.textContent = 'El correo electrónico es obligatorio';
            emailFeedback.style.display = 'block';
            emailFeedbackSuccess.style.display = 'none';
        } else if (!validarEmail(email)) {
            errores.push('Ingrese un correo electrónico válido');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
            emailFeedback.style.display = 'block';
            emailFeedbackSuccess.style.display = 'none';
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
            emailFeedback.style.display = 'none';
            emailFeedbackSuccess.style.display = 'block';
        }

        // Validar categoría
        if (categoria === '') {
            errores.push('Seleccione una categoría');
            categoriaSelect.classList.add('is-invalid');
            categoriaSelect.classList.remove('is-valid');
            categoriaFeedback.style.display = 'block';
            categoriaFeedbackSuccess.style.display = 'none';
        } else {
            categoriaSelect.classList.remove('is-invalid');
            categoriaSelect.classList.add('is-valid');
            categoriaFeedback.style.display = 'none';
            categoriaFeedbackSuccess.style.display = 'block';
        }

        // Validar descripción (mínimo 10 caracteres)
        if (descripcion === '') {
            errores.push('La descripción es obligatoria');
            descripcionInput.classList.add('is-invalid');
            descripcionInput.classList.remove('is-valid');
            descripcionFeedback.textContent = 'La descripción es obligatoria';
            descripcionFeedback.style.display = 'block';
            descripcionFeedbackSuccess.style.display = 'none';
        } else if (descripcion.length < 10) {
            errores.push('La descripción debe tener al menos 10 caracteres');
            descripcionInput.classList.add('is-invalid');
            descripcionInput.classList.remove('is-valid');
            descripcionFeedback.textContent = 'La descripción debe tener al menos 10 caracteres (actual: ' + descripcion.length + ')';
            descripcionFeedback.style.display = 'block';
            descripcionFeedbackSuccess.style.display = 'none';
        } else {
            descripcionInput.classList.remove('is-invalid');
            descripcionInput.classList.add('is-valid');
            descripcionFeedback.style.display = 'none';
            descripcionFeedbackSuccess.style.display = 'block';
        }

        // 6.4 MOSTRAR MENSAJES DINÁMICOS DE VALIDACIÓN
        mostrarMensajesValidacion(errores);

        // Si hay errores, DETENER el proceso
        if (errores.length > 0) {
            console.log('❌ Errores de validación:', errores);
            // Scroll al primer error
            var primerError = document.querySelector('.is-invalid');
            if (primerError) {
                primerError.focus();
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // =========================================================
        // 7. CREAR ELEMENTOS HTML DESDE JAVASCRIPT
        // =========================================================
        console.log('✅ Validación exitosa - Creando solicitud...');

        // 7.1 Crear el elemento LI
        var li = document.createElement('li');
        li.className = 'list-group-item solicitud-item';

        // 7.2 Asignar un ID único
        var id = Date.now();
        li.dataset.id = id;

        // 7.3 Obtener fecha actual
        var fecha = new Date().toLocaleString('es-EC');

        // 7.4 Crear el contenido HTML del elemento
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

        // 7.5 Agregar el elemento a la lista usando appendChild()
        listaSolicitudes.appendChild(li);

        // 7.6 Ocultar el mensaje de "no hay registros"
        if (mensajeVacio) {
            mensajeVacio.style.display = 'none';
        }

        // =========================================================
        // 8. PERMITIR ELIMINAR REGISTROS MEDIANTE BOTÓN Y EVENTO CLICK
        // =========================================================
        var btnEliminar = li.querySelector('.eliminar-solicitud');
        btnEliminar.addEventListener('click', function() {
            eliminarSolicitud(this.dataset.id);
        });

        // =========================================================
        // 9. MOSTRAR EN PANTALLA EL TOTAL DE REGISTROS CREADOS
        // =========================================================
        actualizarContador();

        // =========================================================
        // 10. LIMPIAR EL FORMULARIO DESPUÉS DE ENVIAR
        // =========================================================
        limpiarFormulario();

        // Mostrar mensaje de éxito
        mostrarMensajeExito('✅ ¡Solicitud registrada con éxito!');

        console.log('✅ Solicitud creada correctamente');
    });

    // =========================================================
    // 11. FUNCIÓN PARA ELIMINAR SOLICITUDES
    // =========================================================
    function eliminarSolicitud(id) {
        console.log('🗑️ Eliminando solicitud ID: ' + id);

        // Buscar el elemento en el DOM usando querySelector
        var elemento = document.querySelector('.solicitud-item[data-id="' + id + '"]');

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

                console.log('✅ Solicitud ID ' + id + ' eliminada');
                mostrarMensajeExito('🗑️ Solicitud eliminada correctamente');
            }, 300);
        }
    }

    // =========================================================
    // 12. FUNCIONES AUXILIARES
    // =========================================================

    // 12.1 Validar email con expresión regular
    function validarEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // 12.2 Escapar HTML para prevenir XSS
    function escapeHTML(texto) {
        var div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    // 12.3 Mostrar mensajes dinámicos de validación
    function mostrarMensajesValidacion(errores) {
        if (errores.length > 0) {
            mensajeValidacion.className = 'alert alert-danger mt-3';
            mensajeValidacion.innerHTML = `
                <strong>⚠️ Por favor corrija los siguientes errores:</strong>
                <ul class="mb-0 mt-1">
                    ${errores.map(function(error) {
                        return '<li>' + escapeHTML(error) + '</li>';
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

    // 12.4 Mostrar mensaje de éxito
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

    // 12.5 Limpiar formulario
    function limpiarFormulario() {
        nombreInput.value = '';
        emailInput.value = '';
        categoriaSelect.value = '';
        descripcionInput.value = '';

        // Remover clases de validación
        var inputs = [nombreInput, emailInput, categoriaSelect, descripcionInput];
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('is-valid', 'is-invalid');
        }
        
        // Ocultar mensajes de feedback
        nombreFeedback.style.display = 'none';
        nombreFeedbackSuccess.style.display = 'none';
        emailFeedback.style.display = 'none';
        emailFeedbackSuccess.style.display = 'none';
        categoriaFeedback.style.display = 'none';
        categoriaFeedbackSuccess.style.display = 'none';
        descripcionFeedback.style.display = 'none';
        descripcionFeedbackSuccess.style.display = 'none';
        
        // Reiniciar contador de caracteres
        if (caracteresActuales) {
            caracteresActuales.textContent = '0';
        }
    }

    // 12.6 Actualizar contador de registros
    function actualizarContador() {
        var total = listaSolicitudes.children.length;
        contadorSolicitudes.textContent = total;
        console.log('📊 Total de solicitudes: ' + total);
    }

    console.log('🚀 Aplicación lista para usar');
});
    // =========================================================
    // 13. VALIDACIONES PARA EL FORMULARIO DE CONTACTO
    // =========================================================

    var formularioContacto = document.getElementById('formularioContacto');
    var contactoNombre = document.getElementById('contactoNombre');
    var contactoEmail = document.getElementById('contactoEmail');
    var contactoAsunto = document.getElementById('contactoAsunto');
    var contactoMensaje = document.getElementById('contactoMensaje');
    var mensajeValidacionContacto = document.getElementById('mensajeValidacionContacto');
    var contactoCaracteresActuales = document.getElementById('contactoCaracteresActuales');

    // Referencias a mensajes de feedback del contacto
    var contactoNombreFeedback = document.getElementById('contactoNombreFeedback');
    var contactoNombreFeedbackSuccess = document.getElementById('contactoNombreFeedbackSuccess');
    var contactoEmailFeedback = document.getElementById('contactoEmailFeedback');
    var contactoEmailFeedbackSuccess = document.getElementById('contactoEmailFeedbackSuccess');
    var contactoAsuntoFeedback = document.getElementById('contactoAsuntoFeedback');
    var contactoAsuntoFeedbackSuccess = document.getElementById('contactoAsuntoFeedbackSuccess');
    var contactoMensajeFeedback = document.getElementById('contactoMensajeFeedback');
    var contactoMensajeFeedbackSuccess = document.getElementById('contactoMensajeFeedbackSuccess');

    // 13.1 Validación del campo NOMBRE en contacto (mínimo 3 caracteres)
    if (contactoNombre) {
        contactoNombre.addEventListener('input', function() {
            var valor = this.value.trim();
            var esValido = valor.length >= 3;
            
            if (valor.length > 0 && esValido) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                contactoNombreFeedback.style.display = 'none';
                contactoNombreFeedbackSuccess.style.display = 'block';
            } else if (valor.length > 0 && !esValido) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                contactoNombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
                contactoNombreFeedback.style.display = 'block';
                contactoNombreFeedbackSuccess.style.display = 'none';
            } else {
                this.classList.remove('is-valid', 'is-invalid');
                contactoNombreFeedback.style.display = 'none';
                contactoNombreFeedbackSuccess.style.display = 'none';
            }
        });

        contactoNombre.addEventListener('blur', function() {
            var valor = this.value.trim();
            if (valor.length > 0 && valor.length < 3) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                contactoNombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
                contactoNombreFeedback.style.display = 'block';
                contactoNombreFeedbackSuccess.style.display = 'none';
            }
        });
    }

    // 13.2 Validación del campo EMAIL en contacto
    if (contactoEmail) {
        contactoEmail.addEventListener('input', function() {
            var valor = this.value.trim();
            var esValido = validarEmail(valor);
            
            if (valor.length > 0 && esValido) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                contactoEmailFeedback.style.display = 'none';
                contactoEmailFeedbackSuccess.style.display = 'block';
            } else if (valor.length > 0 && !esValido) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                contactoEmailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
                contactoEmailFeedback.style.display = 'block';
                contactoEmailFeedbackSuccess.style.display = 'none';
            } else {
                this.classList.remove('is-valid', 'is-invalid');
                contactoEmailFeedback.style.display = 'none';
                contactoEmailFeedbackSuccess.style.display = 'none';
            }
        });

        contactoEmail.addEventListener('blur', function() {
            var valor = this.value.trim();
            if (valor.length > 0 && !validarEmail(valor)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                contactoEmailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
                contactoEmailFeedback.style.display = 'block';
                contactoEmailFeedbackSuccess.style.display = 'none';
            }
        });
    }

    // 13.3 Validación del campo ASUNTO en contacto (mínimo 5 caracteres)
    if (contactoAsunto) {
        contactoAsunto.addEventListener('input', function() {
            var valor = this.value.trim();
            var esValido = valor.length >= 5;
            
            if (valor.length > 0 && esValido) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                contactoAsuntoFeedback.style.display = 'none';
                contactoAsuntoFeedbackSuccess.style.display = 'block';
            } else if (valor.length > 0 && !esValido) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                contactoAsuntoFeedback.textContent = 'El asunto debe tener al menos 5 caracteres';
                contactoAsuntoFeedback.style.display = 'block';
                contactoAsuntoFeedbackSuccess.style.display = 'none';
            } else {
                this.classList.remove('is-valid', 'is-invalid');
                contactoAsuntoFeedback.style.display = 'none';
                contactoAsuntoFeedbackSuccess.style.display = 'none';
            }
        });

        contactoAsunto.addEventListener('blur', function() {
            var valor = this.value.trim();
            if (valor.length > 0 && valor.length < 5) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                contactoAsuntoFeedback.textContent = 'El asunto debe tener al menos 5 caracteres';
                contactoAsuntoFeedback.style.display = 'block';
                contactoAsuntoFeedbackSuccess.style.display = 'none';
            }
        });
    }

    // 13.4 Validación del campo MENSAJE en contacto (mínimo 10 caracteres)
    if (contactoMensaje) {
        contactoMensaje.addEventListener('input', function() {
            var valor = this.value.trim();
            var esValido = valor.length >= 10;
            
            // Actualizar contador de caracteres
            if (contactoCaracteresActuales) {
                contactoCaracteresActuales.textContent = valor.length;
            }
            
            if (valor.length > 0 && esValido) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                contactoMensajeFeedback.style.display = 'none';
                contactoMensajeFeedbackSuccess.style.display = 'block';
            } else if (valor.length > 0 && !esValido) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                contactoMensajeFeedback.textContent = 'El mensaje debe tener al menos 10 caracteres (actual: ' + valor.length + ')';
                contactoMensajeFeedback.style.display = 'block';
                contactoMensajeFeedbackSuccess.style.display = 'none';
            } else {
                this.classList.remove('is-valid', 'is-invalid');
                contactoMensajeFeedback.style.display = 'none';
                contactoMensajeFeedbackSuccess.style.display = 'none';
            }
        });

        contactoMensaje.addEventListener('blur', function() {
            var valor = this.value.trim();
            if (valor.length > 0 && valor.length < 10) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                contactoMensajeFeedback.textContent = 'El mensaje debe tener al menos 10 caracteres (actual: ' + valor.length + ')';
                contactoMensajeFeedback.style.display = 'block';
                contactoMensajeFeedbackSuccess.style.display = 'none';
            }
        });
    }

    // 13.5 CAPTURAR EVENTO SUBMIT DEL FORMULARIO DE CONTACTO
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(event) {
            
            // Prevenir recarga de página
            event.preventDefault();
            console.log('📝 Formulario de contacto enviado - Validando datos...');

            // Obtener valores de los campos
            var nombre = contactoNombre ? contactoNombre.value.trim() : '';
            var email = contactoEmail ? contactoEmail.value.trim() : '';
            var asunto = contactoAsunto ? contactoAsunto.value.trim() : '';
            var mensaje = contactoMensaje ? contactoMensaje.value.trim() : '';

            // Array para almacenar errores
            var erroresContacto = [];

            // Validar nombre
            if (nombre === '') {
                erroresContacto.push('El nombre completo es obligatorio');
                if (contactoNombre) {
                    contactoNombre.classList.add('is-invalid');
                    contactoNombre.classList.remove('is-valid');
                    contactoNombreFeedback.textContent = 'El nombre completo es obligatorio';
                    contactoNombreFeedback.style.display = 'block';
                    contactoNombreFeedbackSuccess.style.display = 'none';
                }
            } else if (nombre.length < 3) {
                erroresContacto.push('El nombre debe tener al menos 3 caracteres');
                if (contactoNombre) {
                    contactoNombre.classList.add('is-invalid');
                    contactoNombre.classList.remove('is-valid');
                    contactoNombreFeedback.textContent = 'El nombre debe tener al menos 3 caracteres';
                    contactoNombreFeedback.style.display = 'block';
                    contactoNombreFeedbackSuccess.style.display = 'none';
                }
            } else {
                if (contactoNombre) {
                    contactoNombre.classList.remove('is-invalid');
                    contactoNombre.classList.add('is-valid');
                    contactoNombreFeedback.style.display = 'none';
                    contactoNombreFeedbackSuccess.style.display = 'block';
                }
            }

            // Validar email
            if (email === '') {
                erroresContacto.push('El correo electrónico es obligatorio');
                if (contactoEmail) {
                    contactoEmail.classList.add('is-invalid');
                    contactoEmail.classList.remove('is-valid');
                    contactoEmailFeedback.textContent = 'El correo electrónico es obligatorio';
                    contactoEmailFeedback.style.display = 'block';
                    contactoEmailFeedbackSuccess.style.display = 'none';
                }
            } else if (!validarEmail(email)) {
                erroresContacto.push('Ingrese un correo electrónico válido');
                if (contactoEmail) {
                    contactoEmail.classList.add('is-invalid');
                    contactoEmail.classList.remove('is-valid');
                    contactoEmailFeedback.textContent = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)';
                    contactoEmailFeedback.style.display = 'block';
                    contactoEmailFeedbackSuccess.style.display = 'none';
                }
            } else {
                if (contactoEmail) {
                    contactoEmail.classList.remove('is-invalid');
                    contactoEmail.classList.add('is-valid');
                    contactoEmailFeedback.style.display = 'none';
                    contactoEmailFeedbackSuccess.style.display = 'block';
                }
            }

            // Validar asunto
            if (asunto === '') {
                erroresContacto.push('El asunto es obligatorio');
                if (contactoAsunto) {
                    contactoAsunto.classList.add('is-invalid');
                    contactoAsunto.classList.remove('is-valid');
                    contactoAsuntoFeedback.textContent = 'El asunto es obligatorio';
                    contactoAsuntoFeedback.style.display = 'block';
                    contactoAsuntoFeedbackSuccess.style.display = 'none';
                }
            } else if (asunto.length < 5) {
                erroresContacto.push('El asunto debe tener al menos 5 caracteres');
                if (contactoAsunto) {
                    contactoAsunto.classList.add('is-invalid');
                    contactoAsunto.classList.remove('is-valid');
                    contactoAsuntoFeedback.textContent = 'El asunto debe tener al menos 5 caracteres';
                    contactoAsuntoFeedback.style.display = 'block';
                    contactoAsuntoFeedbackSuccess.style.display = 'none';
                }
            } else {
                if (contactoAsunto) {
                    contactoAsunto.classList.remove('is-invalid');
                    contactoAsunto.classList.add('is-valid');
                    contactoAsuntoFeedback.style.display = 'none';
                    contactoAsuntoFeedbackSuccess.style.display = 'block';
                }
            }

            // Validar mensaje
            if (mensaje === '') {
                erroresContacto.push('El mensaje es obligatorio');
                if (contactoMensaje) {
                    contactoMensaje.classList.add('is-invalid');
                    contactoMensaje.classList.remove('is-valid');
                    contactoMensajeFeedback.textContent = 'El mensaje es obligatorio';
                    contactoMensajeFeedback.style.display = 'block';
                    contactoMensajeFeedbackSuccess.style.display = 'none';
                }
            } else if (mensaje.length < 10) {
                erroresContacto.push('El mensaje debe tener al menos 10 caracteres');
                if (contactoMensaje) {
                    contactoMensaje.classList.add('is-invalid');
                    contactoMensaje.classList.remove('is-valid');
                    contactoMensajeFeedback.textContent = 'El mensaje debe tener al menos 10 caracteres (actual: ' + mensaje.length + ')';
                    contactoMensajeFeedback.style.display = 'block';
                    contactoMensajeFeedbackSuccess.style.display = 'none';
                }
            } else {
                if (contactoMensaje) {
                    contactoMensaje.classList.remove('is-invalid');
                    contactoMensaje.classList.add('is-valid');
                    contactoMensajeFeedback.style.display = 'none';
                    contactoMensajeFeedbackSuccess.style.display = 'block';
                }
            }

            // Mostrar mensajes de validación
            if (erroresContacto.length > 0) {
                mensajeValidacionContacto.className = 'alert alert-danger mt-3';
                mensajeValidacionContacto.innerHTML = `
                    <strong>⚠️ Por favor corrija los siguientes errores:</strong>
                    <ul class="mb-0 mt-1">
                        ${erroresContacto.map(function(error) {
                            return '<li>' + escapeHTML(error) + '</li>';
                        }).join('')}
                    </ul>
                `;
                mensajeValidacionContacto.style.display = 'block';
                
                // Scroll al mensaje de error
                mensajeValidacionContacto.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                console.log('❌ Errores en contacto:', erroresContacto);
                return;
            }

            // Si todas las validaciones son correctas
            console.log('✅ Formulario de contacto validado correctamente');
            
            // Mostrar mensaje de éxito
            mensajeValidacionContacto.className = 'alert alert-success mt-3';
            mensajeValidacionContacto.innerHTML = '✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            mensajeValidacionContacto.style.display = 'block';

            // Limpiar el formulario de contacto
            if (contactoNombre) contactoNombre.value = '';
            if (contactoEmail) contactoEmail.value = '';
            if (contactoAsunto) contactoAsunto.value = '';
            if (contactoMensaje) contactoMensaje.value = '';
            if (contactoCaracteresActuales) contactoCaracteresActuales.textContent = '0';

            // Remover clases de validación
            var camposContacto = [contactoNombre, contactoEmail, contactoAsunto, contactoMensaje];
            for (var j = 0; j < camposContacto.length; j++) {
                if (camposContacto[j]) {
                    camposContacto[j].classList.remove('is-valid', 'is-invalid');
                }
            }

            // Ocultar mensajes de feedback
            if (contactoNombreFeedback) contactoNombreFeedback.style.display = 'none';
            if (contactoNombreFeedbackSuccess) contactoNombreFeedbackSuccess.style.display = 'none';
            if (contactoEmailFeedback) contactoEmailFeedback.style.display = 'none';
            if (contactoEmailFeedbackSuccess) contactoEmailFeedbackSuccess.style.display = 'none';
            if (contactoAsuntoFeedback) contactoAsuntoFeedback.style.display = 'none';
            if (contactoAsuntoFeedbackSuccess) contactoAsuntoFeedbackSuccess.style.display = 'none';
            if (contactoMensajeFeedback) contactoMensajeFeedback.style.display = 'none';
            if (contactoMensajeFeedbackSuccess) contactoMensajeFeedbackSuccess.style.display = 'none';

            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(function() {
                mensajeValidacionContacto.style.transition = 'opacity 0.5s ease';
                mensajeValidacionContacto.style.opacity = '0';
                setTimeout(function() {
                    mensajeValidacionContacto.style.display = 'none';
                    mensajeValidacionContacto.style.opacity = '1';
                }, 500);
            }, 5000);

            console.log('✅ Mensaje de contacto enviado correctamente');
        });
    }