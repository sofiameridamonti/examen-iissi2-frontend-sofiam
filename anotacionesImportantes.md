**COMO PASAR LOS ID ENTRE PANTALLAS**

Tengo que mirar en el render de la pantalla anterior qué nombre he puesto para pasarle ese mismo nombre al fetch de la pantalla a la que me quiero traer esa información. Ejemplo: 

En **OrdersScreen**:
En el botón de editar del **renderOrder** estamos nombrando a la informacion se va a enviar al pulsarlo a la siguiente pantalla "orderId". A partir de ese botón de editar llegaremos a EditOrderScreen con la información que llevemos entre corchetes: 


```javascript
const renderOrder = ({ item }) => {
return (
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
)}
```
```javascript
onPress={() => navigation.navigate('EditOrderScreen', { orderId: item.id })}
```
**EditOrderScreen**


Entonces cuando vayamos a hacer el **fetchRestaurantOrders** tenemos que pasarle al getRestaurantOrders(route.params.**orderId**)
```javascript
useEffect(() => {
    async function fetchOrder () {
      try {
        const fetchedOrder = await getById(route.params.orderId)
        setOrder(fetchedOrder)
        setInitialValues({
          address: fetchedOrder.address,
          price: fetchedOrder.price.toString()
        })
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving product details (id ${route.params.orderId}). ${error}`,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchOrder()
  }, [route])
```
**ELEMENTOS QUE TIENE QUE TENER UN FORMULARIO**
```javascript
export default function EditOrderScreen ({ navigation, route }) {
//inicialización de las variables
//NO OLVIDAR EL BACKEND ERRORS NI LOS INITIAL VALUES
  const [backendErrors, setBackendErrors] = useState()
  const [order, setOrder] = useState({})
  const [initialOrderValues, setInitialOrderValues] = useState({ address: ''})

// VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    address: yup
      .string()
      .max(255, 'Name too long')
      .required('Name is required'),
    price: yup
      .number()
      .positive('Please provide a positive price value')
      .required('Price is required'),
  })

// USE EFFECT CON EL FETCH
  useEffect(() => {
    async function fetchOrder () {
      try {
        // FETCHED
        const fetchedOrder = await getById(route.params.orderId)
        setOrder(fetchedOrder)
        //SET INITIAL VALUES: sin esto, el formulario aparece en blanco, sin plantilla
        setInitialOrderValues({
          address: fetchedOrder.address,
          price: fetchedOrder.price.toString()
        })
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving product details (id ${route.params.orderId}). ${error}`,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchOrder()
  }, [route])

//UPDATE
  const updateOrder = async (values) => {
    //SET BACKEND ERRORS
    setBackendErrors([])
    try {
      const updateOrder = await update(order.restaurantId, values)
      showMessage({
        message: `Schedule id ${updateOrder.id} succesfully updated`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      //PANTALLA DE VUELTA TRAS ACTUALIZAR
      navigation.navigate('OrdersScreen', { id: order.restaurantId })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }

  return (
    // IMPRESCINDIBLE ESTA INICIALIZACION
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialOrderValues}
      onSubmit={updateOrder}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='address'
                label='Address'
              />
              <InputItem
                name='price'
                label='Price'
              />

              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
              }

              <Pressable
                onPress={ handleSubmit }
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                  <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                  <TextRegular textStyle={styles.text}>
                    Save
                  </TextRegular>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}
```


**PARA LOS UPDATE DE FORMULARIOS**

Tras el **await** es muy importante que pongamos el metodo creado en el **Endpoint**. A la const updateOrder le puedo dar el nombre que quiera y usar siempre el mismo.
```javascript
const updateOrder = async (values) => {
    setBackendErrors([])
    try {
      const updateOrder = await update(order.restaurantId, values)
      showMessage({
        message: `Schedule id ${updateOrder.id} succesfully updated`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('OrdersScreen', { id: order.restaurantId })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
```
```javascript
const updateOrder = await update(order.restaurantId, values)
```