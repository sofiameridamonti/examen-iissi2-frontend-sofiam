const styles = StyleSheet.create({
  // El contenedor principal de la pantalla
  container: {
    flex: 1,           // Ocupa todo el espacio disponible de la pantalla
    padding: 20        // Deja un margen interno de 20px en todos los lados
  },

  // Estilo para los encabezados o títulos
  title: {
    fontSize: 20,      // Tamaño de la fuente
    marginBottom: 10   // Espacio hacia abajo para separar del siguiente elemento
  },

  // Estilo para cada "fila" de dirección en una lista
  addressContainer: {
    paddingVertical: 15,     // Espacio interno arriba y abajo
    paddingHorizontal: 10,   // Espacio interno a los lados
    borderBottomWidth: 1,    // Línea divisoria solo en la parte inferior
    borderColor: '#ddd',     // Color gris claro para la línea divisoria
    flexDirection: 'row',    // Alinea los hijos (texto e iconos) en fila
    justifyContent: 'space-between', // Separa el contenido a los extremos (izq y der)
    alignItems: 'center'     // Centra verticalmente los elementos de la fila
  },

  // Contenedor para botones de acción (ej. editar/eliminar)
  actions: {
    flexDirection: 'row',    // Pone los botones uno al lado del otro
    gap: 10                  // Espacio automático de 10px entre cada botón
  },

  // Estilo del botón (el "Pressable" o "TouchableOpacity")
  button: {
    borderRadius: 8,         // Bordes redondeados
    padding: 10,             // Espacio interno para que no sea un botón "flaco"
    alignItems: 'center',    // Centra el texto del botón horizontalmente
    marginTop: 15            // Lo separa del elemento que tenga encima
  },

  // El texto que va dentro de los botones
  textButtom: {
    fontSize: 16,            // Tamaño de letra legible
    color: brandSecondary,   // Usa tu variable de color personalizada
    textAlign: 'center'      // Asegura que el texto esté centrado
  },

  // Texto que aparece cuando no hay elementos en la lista
  emptyList: {
    textAlign: 'center',     // Centra el texto
    padding: 50              // Le da mucho aire para que destaque en medio
  },

  // Contenedor padre para cuando la lista está vacía
  emptyContainer: {
    flex: 1,                 // Ocupa toda la pantalla
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center'     // Centra el contenido horizontalmente
  }
})