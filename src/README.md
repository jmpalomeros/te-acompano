TE ACOMPAÑO

DESCRIPCIÓN:

TE ACOMPAÑO es una web/app creada con la única finalidad de conectar a personas de tu entorno para prestar y/o recibir servicios de voluntariado.
Previo registro, el usuario puede ver y buscar los servicios que quiere ofrecer o demandar, sirviendose para ello de dos buscadores. El primero filtra según el titulo del servicio. El segundo en función de la categoria del servicio: ayuda, ocio, otros. El usuario también dispone de un listado con los servicios existentes, pudiendo revisar cada uno de ellos clicando sobre él, informándose igualmente acerca del usuario que lo ofrece y leyendo las reseñas que otros usuarios han compartido.

Una vez elegido el servicio del que quiere servirse, deberá aceptar el servicio, desapareciendo del listad y quedando registrado tanto en el perfil del oferente del servicio como del solicitante/aceptante.

En el perfil, el usuario puede consultar sus datos y editarlos. También dispone de un listado relacionando los servicios que ofrece y los que demanda, figurando los que ha acepetado, pudiendo hacer reseñas sobre ellos. En este apartado el usuario también podrá crear un servicio y editarlo, antes de que sea aceptado, para su publicación en el listado de servicios.

Las reseñas, tanto creadas como recibidas, pueden consultarse, editarse y borrarse desde el propio perfil del usuario.

De este modo, TE ACOMPAÑA nace con la finalidad de facilitar la labor del voluntariado, conectando personas directamente sin necesidad de recurrir a instituciones, creando una red entre los usuarios que fomenta la colaboración, la ayuda y el contacto entre personas de un mismo entorno.

Navegabilidad.

Home: Página de inicio en la que se ofrece información sobre la web/app.
Registro: El usuario accede una vez se encuentra en la web cliclando sobre el icono ubicado en el navbar.Es necesario registrarse para acceder a la web/app previo logado.
Logado: Tras el registro el usuario debe logarse introducciendo los campos solicitados.
Salir/Deslogado: El usuario finaliza sesión y vuelve a la página de inicio.
Listado de servicios: Espacio en el que figuran los post con los servicios ofrecidos, pudiendo acceder a ellos cliclando sobre el titulo. 
Busqueda de servicios por tipo de servicio: El buscador filtra en los servicios ofertados en atención a la categoria que tienen: Ayuda, Ocio, Otros
Busqueda de servicio por el titulo: El buscador ofrece los resultados obtenidos en un campo libre.
Aceptar un servicio: Si el usuario está interesado en recibir un servicio, solo tiene que cliclar sobre el boton de acpetado una vez ha revisado el contenido del servicio y consultando los datos del oferente.
Consultar detalles del servicio: Clicando sobre el propio servicio.
Consultar detalles del oferente del servicio: Clicando sobre el oferente, puedes consultar sus datos, servicios ofrecidos y reseñas que han realizado otros usuarios.
Perfil: El usuario accede a su perfil, pudiendo consultar y editar sus datos.
Crear servicio: Desde su perfil, el usuario puede crear un servicio y editarlo antes de que sea aceptado.
Servicios aceptados: Sección en la que figuran todos los servicios aceptados para su consulta, revisión de las reseñas que existen sobre el oferente y, en su caso, crear reseña sobre ese servicio una vez se ha efectuado.
Servicios ofrecidos: En esta sección se encuentran todos los post creados por el usuario en los que ofrece los diversos servicios que ha creado.
Reseñas: Apartado en el que el usuario puede consultar las reseñas que ha creado y que ha recibido, pudiendo actualizar y borrar las primeras.
Error: Página a la que se redirige al usuario cuando existe algún error.
Not-found: Página a la que se redirige al usuario cuando no existe resultado para su busqueda.


Routes
/ - Homepage
/auth/signup - Signup form
/auth/login - Login form
/restaurants - restaurant list
/restaurants/create - create a restaurant
/restaurants/:id - restaurant detail
/profile/me - my details and favorite restaurants
404
Pages
Home Page (public)
Sign in Page (anon only)
Log in Page (anon only)
Restaurants List Page (public only)
Restaurant Create (user only)
Restaurant Detail Page (public only)
My Profile Page (user only)
404 Page (public)
Components
Restaurant Card component
Input: restaurant: any
Output: favorite(restaurantId: string, on: boolean)
Search component
Output: change(terms: string)
IO
Services
Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.me()
auth.getUser() // synchronous
Restaurant Service
restaurant.list()
restaurant.create(data)
restaurant.detail(id)
restaurant.addFavorite(id)
restaurant.removeFavorite(id)
Server
Models
User model

username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
Restaurant model

owner - ObjectID<User> // required
name - String // required
phone - String
address - String
API Endpoints/Backend Routes
GET /auth/me
POST /auth/signup
body:
username
email
password
POST /auth/login
body:
username
password
POST /auth/logout
body: (empty)
POST /user/me/favorite
body:
restaurantId
DELETE /user/me/favorite/:restaurantId
body: (empty)
GET /restaurant
POST /restaurant
body:
name
phone
address
GET /restaurant/:id
Links
Trello/Kanban
Link to your trello board or picture of your physical board

Git
The url to your repository and to your deployed project

Client repository Link Server repository Link

Deploy Link

Slides
The url to your presentation slides

Slides Link