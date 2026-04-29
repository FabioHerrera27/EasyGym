import { useEffect } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const routesByPath = {
  '/': { pageKey: 'login', title: 'Login Fitness' },
  '/index.html': { pageKey: 'login', title: 'Login Fitness' },
  '/PantallaLogIn.html': { pageKey: 'login', title: 'Login Fitness' },
  '/HomeAdmin.html': { pageKey: 'homeAdmin', title: 'Gimnasio - Inicio' },
  '/PantallaInicioUsuario.html': { pageKey: 'inicioUsuario', title: 'Pantalla de Inicio' },
  '/AgregarInvitado.html': { pageKey: 'agregarInvitado', title: 'Agregar Invitado' },
  '/PantallaMembresias.html': { pageKey: 'membresias', title: 'Membresias' },
  '/PantallaPlanBasico.html': { pageKey: 'planBasico', title: 'Plan Basico' },
  '/PantallaPlanEstandar.html': { pageKey: 'planEstandar', title: 'Plan Estandar' },
  '/PantallaPlanPremium.html': { pageKey: 'planPremium', title: 'Plan Premium' },
  '/finalizarCompraBasico.html': { pageKey: 'checkout', title: 'Finalizar Compra' },
  '/finalizarCompraEstandar.html': { pageKey: 'checkout', title: 'Finalizar Compra' },
  '/finalizarCompraPremium.html': { pageKey: 'checkout', title: 'Finalizar Compra' },
}

const pageStyles = {
  login: ['PantallaLogIn.css'],
  homeAdmin: ['HomeAdmin.css', 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'],
  inicioUsuario: ['PantallaInicioUsuarioCss.css'],
  agregarInvitado: ['AgregarInvitadoCss.css'],
  membresias: ['PantallaMembresias.css'],
  planBasico: ['PantallaPlanBasico.css'],
  planEstandar: ['PantallaPlanEstandar.css'],
  planPremium: ['PantallaPlanPremium.css'],
  checkout: ['finalizarCompraCss.css'],
}

function usePageAssets() {
  const { pathname } = useLocation()
  const route = routesByPath[pathname] ?? routesByPath['/']

  useEffect(() => {
    document.title = route.title

    const links = (pageStyles[route.pageKey] ?? []).map((href) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.dataset.reactPageStyle = route.pageKey
      document.head.appendChild(link)
      return link
    })

    return () => {
      links.forEach((link) => link.remove())
    }
  }, [route])
}

function PageAssets() {
  usePageAssets()
  return null
}

function Login() {
  const navigate = useNavigate()

  return (
    <div className="background-container">
      <section className="login-card shadow-lg">
        <h1>Iniciar sesion</h1>
        <form id="loginForm" className="d-grid gap-3">
          <input className="form-control" type="text" id="username" placeholder="Usuario" required />
          <input className="form-control" type="password" id="password" placeholder="Contrasena" required />
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={() => navigate('/PantallaInicioUsuario.html')}
          >
            Entrar
          </button>
        </form>
      </section>
    </div>
  )
}

function HomeAdmin() {
  return (
    <div className="main-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-0">
          <Link className="navbar-brand fw-bold" to="/HomeAdmin.html">EasyGym</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Abrir navegacion"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminNavbar">
            <div className="nav-links navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink className="nav-link" to="/HomeAdmin.html">Inicio</NavLink>
              <NavLink className="nav-link" to="/PantallaInicioUsuario.html">Miembros</NavLink>
              <NavLink className="nav-link" to="/PantallaMembresias.html">Membresias</NavLink>
              <NavLink className="nav-link" to="/finalizarCompraBasico.html">$ Pagos</NavLink>
            </div>
            <div className="admin-profile">
              <i className="bx bxs-user-circle"></i> Administrador
            </div>
          </div>
        </div>
      </nav>

      <section className="content container-fluid">
        <h1 className="title">Inicio</h1>

        <div className="cards-grid row g-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="card card-blue h-100">
              <p>Miembros activos</p>
              <i className="bx bx-group"></i>
              <h2>248</h2>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="card card-red h-100">
              <p>Membresias por vencer</p>
              <i className="bx bx-megaphone"></i>
              <h2>18</h2>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="card card-green h-100">
              <p>Ingresos del periodo</p>
              <i className="bx bx-money"></i>
              <h2>$42k</h2>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="card card-gray h-100">
              <p>Accesos del dia</p>
              <i className="bx bx-calendar-check"></i>
              <h2>96</h2>
            </article>
          </div>
        </div>

        <div className="table-card table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha y hora</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Fabio</td>
                <td>Lopez</td>
                <td>28/04/2026 17:40</td>
                <td><span className="badge text-bg-success">Activo</span></td>
              </tr>
              <tr>
                <td>002</td>
                <td>Santiago</td>
                <td>Garcia</td>
                <td>28/04/2026 16:25</td>
                <td><span className="badge text-bg-warning">Por vencer</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function InicioUsuario() {
  return (
    <main className="pantalla-inicio">
      <div className="capa-oscura"></div>

      <section className="contenido-inicio container-xxl">
        <header className="encabezado-inicio">
          <h1>Hola de nuevo Fabio!</h1>
          <span className="plan-chip badge rounded-2">PLAN PREMIUM</span>
        </header>

        <section className="panel-invitados" aria-labelledby="titulo-invitados">
          <h2 id="titulo-invitados">Lista de invitados</h2>

          <div className="tabla-card table-responsive rounded-2">
            <div className="fila encabezados" role="row">
              <span className="columna check-col"></span>
              <span className="columna">ID usuario</span>
              <span className="columna">Nombre</span>
              <span className="columna">Correo electronico</span>
              <span className="columna">Numero</span>
              <span className="columna">Foto</span>
              <span className="columna">Acceso</span>
            </div>

            <div className="fila contenido" role="row">
              <div className="columna check-col">
                <label className="contenedor-check form-check" aria-label="Seleccionar invitado">
                  <input className="form-check-input" type="checkbox" />
                  <span className="check-custom"></span>
                </label>
              </div>
              <span className="columna">Invitado</span>
              <span className="columna">Santiago Garcia</span>
              <span className="columna correo">santi@gmail.com</span>
              <span className="columna">998 878 96</span>
              <div className="columna columna-foto">
                <div className="avatar-invitado" aria-label="Foto de Santiago Garcia">SG</div>
              </div>
              <span className="columna"><span className="badge text-bg-primary">Invitado</span></span>
            </div>

            <div className="fila acciones">
              <span className="contador-seccion">Seccion 1</span>
              <Link to="/AgregarInvitado.html" className="boton-agregar btn btn-primary">Agregar invitado</Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function AgregarInvitado() {
  const navigate = useNavigate()

  return (
    <main className="pagina-agregar">
      <div className="fondo-capa"></div>

      <button
        type="button"
        className="boton-cerrar btn btn-danger"
        aria-label="Cerrar"
        onClick={() => navigate('/PantallaInicioUsuario.html')}
      >
        X
      </button>

      <section className="panel-agregar card border-0">
        <div className="panel-superior">
          <h1>Agregar<br />Invitado</h1>

          <label className="foto-box" htmlFor="foto-invitado">
            <span className="foto-placeholder">Foto</span>
            <input id="foto-invitado" name="foto-invitado" className="form-control" type="file" accept="image/*" />
          </label>
        </div>

        <form className="formulario-invitado">
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" className="form-control" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="numero">Numero</label>
            <input id="numero" name="numero" className="form-control" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input id="correo" name="correo" className="form-control" type="email" />
          </div>

          <div className="acciones-formulario">
            <button type="submit" className="boton-agregar btn btn-success">Agregar</button>
          </div>
        </form>
      </section>
    </main>
  )
}

const membershipPlans = [
  {
    name: 'Basico',
    to: '/PantallaPlanBasico.html',
    details: [
      'Acceso al gimnasio',
      'Uso de equipo general',
      'Area de cardio y pesas',
      'Sin locker incluido',
      'Sin acceso a box',
      'Horario limitado',
    ],
  },
  {
    name: 'Estandar',
    to: '/PantallaPlanEstandar.html',
    details: [
      'Acceso completo al gimnasio',
      'Area de cardio y pesas',
      'Acceso a area de box',
      'Locker incluido',
      'Horario extendido',
      '1 invitado ocasional',
    ],
  },
  {
    name: 'Premium',
    to: '/PantallaPlanPremium.html',
    details: [
      'Acceso total 24/7',
      'Area de cardio, pesas y box',
      'Locker premium incluido',
      'Uso de sillas de masaje',
      'Acceso prioritario a instalaciones',
      'Invitados ilimitados',
      'Beneficios exclusivos',
    ],
  },
]

function Membresias() {
  return (
    <main className="pagina-membresias">
      <section className="hero-membresias">
        <div className="overlay"></div>
        <div className="contenido container-xl">
          <h1>Membresias</h1>

          <div className="planes row g-4 justify-content-center">
            {membershipPlans.map((plan) => (
              <div className="col-12 col-md-6 col-xl-4 d-flex justify-content-center" key={plan.name}>
                <article className="plan-card card h-100">
                  <div className="card-body d-flex flex-column">
                    <h2>{plan.name}</h2>
                    <ul className="flex-grow-1">
                      {plan.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <Link to={plan.to} className="boton-plan btn btn-primary mt-auto">Editar plan</Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const planDetails = {
  basico: {
    name: 'Basico',
    price: '$800 MXN',
    checkout: '/finalizarCompraBasico.html',
    details: [
      'Acceso al gimnasio',
      'Uso de equipo general',
      'Area de cardio y pesas',
      'Sin locker incluido',
      'Horario limitado',
    ],
  },
  estandar: {
    name: 'Estandar',
    price: '$1,200 MXN',
    checkout: '/finalizarCompraEstandar.html',
    details: [
      'Acceso completo al gimnasio',
      'Acceso a area de box',
      'Locker incluido',
      'Horario extendido',
      '1 invitado ocasional',
    ],
  },
  premium: {
    name: 'Premium',
    price: '$1,500 MXN',
    checkout: '/finalizarCompraPremium.html',
    details: [
      'Acceso completo al gimnasio',
      'Acceso a todas las areas',
      'Locker y toalla incluidos',
      'Horario sin restriccion',
      '3 invitados mensuales',
      'Clases grupales ilimitadas',
    ],
  },
}

function PlanPage({ planKey }) {
  const plan = planDetails[planKey]

  return (
    <>
      <div className="bg-overlay"></div>

      <div className="page-wrapper container-fluid">
        <header className="header">
          <Link to="/PantallaMembresias.html" className="header-title header-title-link">Planes</Link>
          <div className="header-info">
            <span className="fecha">30/07/2026</span>
            <span className="bienvenido">Bienvenido</span>
          </div>
        </header>

        <div className="plan-container rounded-2 overflow-hidden">
          <div className="plan-top">
            <div className="plan-name-block">
              <span className="plan-name">{plan.name}</span>
            </div>
            <div className="plan-desc-block">
              <ul className="mb-0">
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="plan-bottom">
            <div className="plan-price-block">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">por 30 dias</span>
            </div>
            <Link to={plan.checkout} className="plan-cta-block btn">
              <span className="cta-text">Comenzar ahora</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const checkoutDetails = {
  basico: {
    back: '/PantallaPlanBasico.html',
    label: 'PLAN BASICO - MONTO $800 MXN',
  },
  estandar: {
    back: '/PantallaPlanEstandar.html',
    label: 'PLAN ESTANDAR - MONTO $1,200 MXN',
  },
  premium: {
    back: '/PantallaPlanPremium.html',
    label: 'PLAN PREMIUM - MONTO $1,500 MXN',
  },
}

function Checkout({ checkoutKey }) {
  const navigate = useNavigate()
  const checkout = checkoutDetails[checkoutKey]

  return (
    <main className="checkout-page">
      <section className="checkout-card card border-0">
        <button
          type="button"
          className="close-button btn btn-danger"
          aria-label="Cerrar"
          onClick={() => navigate(checkout.back)}
        >
          X
        </button>
        <header className="checkout-header">
          <h1>Finalizar compra</h1>
          <p className="plan-label">{checkout.label}</p>
        </header>
        <form className="checkout-form">
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" className="form-control" type="text" placeholder="Nombre" />
            </div>
            <div className="field-group">
              <label htmlFor="apellido">Apellido</label>
              <input id="apellido" name="apellido" className="form-control" type="text" placeholder="Apellido" />
            </div>
          </div>
          <div className="field-row full-width">
            <div className="field-group full-width">
              <label htmlFor="direccion">Direccion</label>
              <input id="direccion" name="direccion" className="form-control" type="text" placeholder="Direccion" />
            </div>
          </div>
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input id="ciudad" name="ciudad" className="form-control" type="text" placeholder="Ciudad" />
            </div>
            <div className="field-group">
              <label htmlFor="estado">Estado</label>
              <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado" />
            </div>
          </div>
          <div className="payment-section">
            <p className="payment-title">Metodo de pago</p>
            <p className="payment-method">Tarjeta de debito</p>
            <div className="card-fields">
              <input id="tarjeta" name="tarjeta" className="form-control" type="text" placeholder="Numero de tarjeta" />
              <input id="mmaa" name="mmaa" className="form-control" type="text" placeholder="MM/AA" />
              <input id="cvv" name="cvv" className="form-control" type="text" placeholder="Codigo CVV" />
            </div>
          </div>
          <button type="submit" className="submit-button btn btn-primary">Pagar</button>
        </form>
      </section>
    </main>
  )
}

function App() {
  return (
    <>
      <PageAssets />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index.html" element={<Login />} />
        <Route path="/PantallaLogIn.html" element={<Login />} />
        <Route path="/HomeAdmin.html" element={<HomeAdmin />} />
        <Route path="/PantallaInicioUsuario.html" element={<InicioUsuario />} />
        <Route path="/AgregarInvitado.html" element={<AgregarInvitado />} />
        <Route path="/PantallaMembresias.html" element={<Membresias />} />
        <Route path="/PantallaPlanBasico.html" element={<PlanPage planKey="basico" />} />
        <Route path="/PantallaPlanEstandar.html" element={<PlanPage planKey="estandar" />} />
        <Route path="/PantallaPlanPremium.html" element={<PlanPage planKey="premium" />} />
        <Route path="/finalizarCompraBasico.html" element={<Checkout checkoutKey="basico" />} />
        <Route path="/finalizarCompraEstandar.html" element={<Checkout checkoutKey="estandar" />} />
        <Route path="/finalizarCompraPremium.html" element={<Checkout checkoutKey="premium" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
