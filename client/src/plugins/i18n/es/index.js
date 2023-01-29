export default {
  admin: {
    hotelGroup: {
      title: 'Organización',
      detail: {
        create: 'Crear una nueva organización',
        edit: 'Editar una nueva organización',
        billing: 'Facturación',
      },
    },
    hotel: {
      detail: {
        create: 'Crear un nuevo hotel',
        edit: 'Editar un hotel',
      },
    },
    createNewHotelGroup: {
      title: 'Crear nueva organización',
      subtitle: 'Todavía no tienes organización, crea tu organización para agregar un nuevo hotel',
      access: 'Entrar en una organización'
    },
    createNewHotel: {
      title: 'Crear nuevo hotel',
      subtitle: 'Tu organización no tiene hoteles todavía, crea un nuevo hotel ahora',
      access: 'Entrar en un hotel'
    },
    session: {
      form: {
        name: 'Nombre',
        surname: 'Apellido',
        email: 'Email',
        password: 'Contraseña',
      },
      user: {
        registered: 'Nuevo usuario registrado',
      },
      register: {
        title: 'Registro',
        bgTitle: 'Aumenta tu <br><h1 class="text-primary font-weight-bold">facturación</h1>',
        bgSubtitle: 'Combate la estacionalidad y aumenta tu tasa de ocupación',
        motivationalPhrase: 'Empieza a vender en Papuaa ahora',
        redirectLogin: '¿Ya tienes cuenta? Accede aquí.',
        submit: 'Crear cuenta',
      },
      login: {
        title: 'Acceder',
        submit: 'Entrar',
        redirectRegister: '¿Todavía no tienes cuenta? Regístrate.'
      },
    },
    home: {
      title: 'Home',
      myOffers: 'Mis Ofertas',
      myBookings: 'Mis Reservas',
      notFound: 'Todavía no tienes un hotel',
      notFoundInfo: 'Aquí podrás ver un resumen de la información de tu hotel'
    },
    billing: {
      title: 'Facturación',
      holdingName: 'Nombre para facturación',
      taxId: 'CIF/DNI/NIE',
    },
    city: {
      title: 'Ciudad',
    },
    settings: {
      title: 'Configuración',
      noOrganizations: 'No hay organizaciones',
    },
  },
  form: {
    validation: {
      required: 'Campo requerido',
    },
    submit: 'Guardar',
    name: 'Nombre',
    description: 'Descripción',
    address: 'Dirección',
  },
  user: {
    name: 'Nombre',
    surname: 'Apellido',
  },
  session: {
    expired: 'Tu sesión caducó',
    loginAgain: 'Por favor accede de nuevo',
    logout: 'Cerrar sesión',
    user: {
      logout: 'Sesión cerrada',
    },
  },
};
