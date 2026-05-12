# examen-iissi2-frontend-sofiam
   
```javascript
// El contenedor principal de la pantalla
container: {
    flex: 1,           // Ocupa todo el espacio disponible de la pantalla
    padding: 20        // Deja un margen interno de 20px en todos los lados
}
```
```javascript
// Texto que aparece cuando no hay elementos en la lista
emptyList: {
    textAlign: 'center',     // Centra el texto
    padding: 50              // Le da mucho aire para que destaque en medio
}
```
```javascript
// Contenedor padre para cuando la lista está vacía
emptyContainer: {
    flex: 1,                 // Ocupa toda la pantalla
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center'     // Centra el contenido horizontalmente
}
```

![alt text](image-3.png)
Este se ha utilizado para que los contenedores de productos populares apareczan en el centro, es como un contenedor de contenedores.
```javascript
/ Alineación básica en horizontal
container2: {
    flexDirection: 'row' // Se usa para poner la imagen a la izquierda y el texto a la derecha dentro de las tarjetas blancas
}
```
![alt text](image-4.png)
Para crear estas card de productos utilizamos ImageCard
```javascript
//Tenemos que pasarle la imageUri para que muestre la foto, sino saldría exactamente igual pero con la foto en blanco
//También hay que pasarle un title, el estilo ya está definido ImageCard
const renderProducts = ({ item }) => {
    return (
        <ImageCard
          imageUri={item.image ? { uri: API_BASE_URL + '/' + item.image } : undefined}
          title={item.name}
          >
            <TextRegular numberOfLines={2}>{item.description}</TextRegular>
            <TextSemiBold>Price: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.price.toFixed(2)}€</TextSemiBold></TextSemiBold>
            <TextSemiBold>Restaurant: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.restaurant.name}</TextSemiBold> </TextSemiBold>
          </ImageCard>
    )
  }
```

```javascript
// Contenedor con mucho aire (posiblemente para estados vacíos o títulos muy aislados)
containerCenter: {
    flexDirection: 'row',        // Alinea contenido en fila
    justifyContent: 'center',    // Centra el contenido horizontalmente
    alignItems: 'center',        // Centra el contenido verticalmente
    margin: 100                  // ¡Mucho cuidado aquí! Empuja el contenido 100px desde todos los lados.
                                    // Probablemente usado para centrar el texto "Productos populares" o mensajes de carga.
}
```

![alt text](image-1.png)
```javascript
// Estilo para los encabezados o títulos
title: {
    fontSize: 20,      // Tamaño de la fuente
    marginBottom: 10   // Espacio hacia abajo para separar del siguiente elemento
},
```

```javascript
// Estilo para cada "fila" de dirección en una lista
addressContainer: {
    paddingVertical: 15,     // Espacio interno arriba y abajo
    paddingHorizontal: 10,   // Espacio interno a los lados
    borderBottomWidth: 1,    // Línea divisoria solo en la parte inferior
    borderColor: '#ddd',     // Color gris claro para la línea divisoria
    flexDirection: 'row',    // Alinea los hijos (texto e iconos) en fila
    justifyContent: 'space-between', // Separa el contenido a los extremos (izq y der)
    alignItems: 'center'     // Centra verticalmente los elementos de la fila
}
```
```javascript
// Contenedor para botones de acción (ej. editar/eliminar)
actions: {
    flexDirection: 'row',    // Pone los botones uno al lado del otro
    gap: 10                  // Espacio automático de 10px entre cada botón
}
```
![alt text](image-2.png)
```javascript
// Estilo del botón (el "Pressable" o "TouchableOpacity")
button: {
    borderRadius: 8,         // Bordes redondeados
    padding: 10,             // Espacio interno para que no sea un botón "flaco"
    alignItems: 'center',    // Centra el texto del botón horizontalmente
    marginTop: 15            // Lo separa del elemento que tenga encima
}
```

```javascript
// El texto que va dentro de los botones
textButtom: {
    fontSize: 16,            // Tamaño de letra legible
    color: brandSecondary,   // Usa tu variable de color personalizada
    textAlign: 'center'      // Asegura que el texto esté centrado
}
```
![alt text](image-6.png)

PARA LOS BOTONES EDIT Y ADVANCE

```javascript
actionButtonsContainer: {
    flexDirection: 'row',   //esto es lo que hace que se pongan al lado
    bottom: 5,
    position: 'absolute',
    width: '90%'
  }

{/* SOLUTION. Excercise - Edit order */}
<Pressable
onPress={() => navigation.navigate('EditOrderScreen', { orderId: item.id })}
style={({ pressed }) => [
    {
    backgroundColor: pressed
        ? GlobalStyles.brandBlueTap
        : GlobalStyles.brandBlue
    },
    styles.actionButton
]}>
<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
    <MaterialCommunityIcons name='pencil' color={'white'} size={20}/>
    <TextRegular textStyle={styles.text}>Edit</TextRegular>
</View>
</Pressable>

{/* SOLUTION. Excercise - Order status change */}
{item.status !== 'delivered' &&
<Pressable
    onPress={() => handleNextStatus(item)}
    style={({ pressed }) => [
    {
        backgroundColor: pressed
        ? GlobalStyles.brandGreenTap
        : GlobalStyles.brandGreen
    },
    styles.actionButton
    ]}>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
    <MaterialCommunityIcons name='skip-next' color={'white'} size={20}/>
    <TextRegular textStyle={styles.text}>Advance</TextRegular>
    </View>
</Pressable>
}
```


![alt text](image-5.png)
```javascript
analyticsContainer: {
    backgroundColor: GlobalStyles.brandPrimaryTap,
    paddingVertical: 10
  },
  analyticsRow: {
    flexDirection: 'row', // SOLUTION. Excercise - Restaurant analytics
    justifyContent: 'space-around' // SOLUTION. Excercise - Restaurant analytics
  },
  analyticsCell: {
    margin: 5,
    color: 'white',
    fontSize: 12,
    width: '45%',
    backgroundColor: GlobalStyles.brandPrimary,
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.41,
    shadowRadius: 3.11,
    elevation: 2
  }

//en el return del render se ha puesto asi:

const renderAnalytics = () => {
return (
    // SOLUTION. Excercise - Restaurant analytics
    // Aquí utiliza un contenedor y solo pone dos botones
    // Después pone los otros dos botones, si pudiera los 4 en el mismo analyticsRow saldrian los 4 uno a lado del otro.
    <View style={styles.analyticsContainer}>
        <View style={styles.analyticsRow}>
        <View style={styles.analyticsCell}>
            <TextRegular textStyle={styles.text}>
            Invoiced today
            </TextRegular>
            <TextSemiBold textStyle={styles.text}>
            {analytics.invoicedToday.toFixed(2)}€
            </TextSemiBold>
        </View>
        <View style={styles.analyticsCell}>
            <TextRegular textStyle={styles.text}>
            #Pending orders
            </TextRegular>
            <TextSemiBold textStyle={styles.text}>
            {analytics.numPendingOrders}
            </TextSemiBold>
        </View>
        </View>

        <View style={styles.analyticsRow}>
        <View style={styles.analyticsCell}>
            <TextRegular textStyle={styles.text}>
                #Delivered today
            </TextRegular>
            <TextSemiBold textStyle={styles.text}>
                {analytics.numDeliveredTodayOrders}
            </TextSemiBold>
            </View>
            <View style={styles.analyticsCell}>
            <TextRegular textStyle={styles.text}>
                #Yesterday orders
            </TextRegular>
            <TextSemiBold textStyle={styles.text}>
                {analytics.numYesterdayOrders}
            </TextSemiBold>
            </View>
        </View>
    </View>
)
}
```