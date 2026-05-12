En este proyecto somos CUSTOMER.

RestaurantScreen es igual que en frontend-Curso-Orders PERO encontramos Productos Populares arriba del todo de RestaurantsScreen. Más abajo sale todo normal.

RestaurantsScreen
![alt text](./data-images/images_address/image.png)

Al ser CUSTOMER, los restaurantes ya no tienen botón para editar o eliminar.

RestaurantsScreen
![alt text](./data-images/images_address/image-1.png)

SOBRE ADDRESS
ProfileScreen
![alt text](./data-images/images_address/image-6.png)

ProfileScreen -> Pressable Editing Shipping Addres -> AddressesScreen
![alt text](./data-images/images_address/image-7.png)

AddressesScreen -> Pressable Añadir Nueva direccion -> AddressDetailScreen
![alt text](./data-images/images_address/image-8.png)

AddressDetailScreen -> Pressable Guardar direccion -> AddressesScreen
![alt text](./data-images/images_address/image-9.png)

AddressDetailScreen -> Pressable BIN -> pide confirmacion
![alt text](./data-images/images_address/image-10.png)

TAMBIEN PERMITE HACER PEDIDOS
RestaurantScreen -> Pressable Restaurant -> RestaurantDetails
![alt text](./data-images/images_address/image-2.png)

Si pulsamon en Iniciar Pedido y no estamos Logados -> RestaurantOrderScreen. Ahí aparece un Pressable "Log in" que nos lleva a Profile. 
RestaurantOrderScreen sin logar: 
![alt text](./data-images/images_address/image-3.png)

RestaurantDetails -> Pressable Iniciar Pedido -> RestaurantOrderScreen
![alt text](./data-images/images_address/image-4.png)

RestaurantOrderScreen -> Pressable Check Out -> ConfirmOrderScreen
![alt text](./data-images/images_address/image-5.png)

Al presional Confirm Order da error pero debería llevarnos de vuelta a MyOrders y guardar el pedido.