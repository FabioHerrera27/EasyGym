import { useEffect } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const routesByPath = {
  '/': { pageKey: 'login', title: 'Login Fitness' },
  '/index.html': { pageKey: 'login', title: 'Login Fitness' },
  '/PantallaLogIn.html': { pageKey: 'login', title: 'Login Fitness' },
  '/HomeAdmin.html': { pageKey: 'homeAdmin', title: 'Gimnasio - Inicio' },
  '/PantallaInicioUsuario.html': { pageKey: 'inicioUsuario', title: 'Pantalla de Inicio' },
  '/AgregarInvitado.html': { pageKey: 'agregarInvitado', title: 'Agregar Invitado' },
  '/PantallaMembresias.html': { pageKey: 'membresias', title: 'Membresías' },
  '/PantallaPlanBasico.html': { pageKey: 'planBasico', title: 'Plan Básico' },
  '/PantallaPlanEstandar.html': { pageKey: 'planEstandar', title: 'Plan Estándar' },
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
      <div className="login-card">
        <h1>Iniciar sesión</h1>
        <form id="loginForm">
          <input type="text" id="username" placeholder="Usuario" required />
          <input type="password" id="password" placeholder="Contraseña" required />
          <button type="button" onClick={() => navigate('/PantallaInicioUsuario.html')}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

function HomeAdmin() {
  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="nav-links">
          <NavLink to="/HomeAdmin.html">Inicio</NavLink>
          <NavLink to="/PantallaInicioUsuario.html">Miembros</NavLink>
          <NavLink to="/PantallaMembresias.html">Membresías</NavLink>
          <NavLink to="/finalizarCompraBasico.html">$ Pagos</NavLink>
        </div>
        <div className="admin-profile">
          <i className="bx bxs-user-circle"></i> Administrador ------
        </div>
      </nav>

      <section className="content">
        <h1 className="title">Inicio</h1>

        <div className="cards-grid">
          <div className="card card-blue">
            <p>Miembros activos</p>
            <i className="bx bx-group"></i>
            <h2>----</h2>
          </div>
          <div className="card card-red">
            <p>Membresías por vencer</p>
            <i className="bx bx-megaphone"></i>
            <h2>---</h2>
          </div>
          <div className="card card-green">
            <p>Ingresos del periodo</p>
            <i className="bx bx-money"></i>
            <h2>$----</h2>
          </div>
          <div className="card card-gray">
            <p>Accesos del día</p>
            <i className="bx bx-calendar-check"></i>
            <h2>----</h2>
          </div>
        </div>

        <div className="table-card">
          <table>
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
                <td>----</td>
                <td>----</td>
                <td>-----</td>
                <td>-----------</td>
                <td className="status">------</td>
              </tr>
              <tr>
                <td>----</td>
                <td>----</td>
                <td>-----</td>
                <td>-----------</td>
                <td className="status">------</td>
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

      <section className="contenido-inicio">
        <header className="encabezado-inicio">
          <h1>Hola de nuevo Fabio!</h1>
          <span className="plan-chip">PLAN PREMIUM</span>
        </header>

        <section className="panel-invitados" aria-labelledby="titulo-invitados">
          <h2 id="titulo-invitados">Lista de invitados</h2>

          <div className="tabla-card">
            <div className="fila encabezados" role="row">
              <span className="columna check-col"></span>
              <span className="columna">ID usuario</span>
              <span className="columna">Nombre</span>
              <span className="columna">Correo electrónico</span>
              <span className="columna">Número</span>
              <span className="columna">Foto</span>
              <span className="columna">Acceso</span>
            </div>

            <div className="fila contenido" role="row">
              <div className="columna check-col">
                <label className="contenedor-check" aria-label="Seleccionar invitado">
                  <input type="checkbox" />
                  <span className="check-custom"></span>
                </label>
              </div>
              <span className="columna">Invitado</span>
              <span className="columna">Santiago García</span>
              <span className="columna correo">santi@gmail.com</span>
              <span className="columna">998 878 96</span>
              <div className="columna columna-foto">
                <div className="avatar-invitado" aria-label="Foto de Santiago García">SG</div>
              </div>
              <span className="columna">Invitado</span>
            </div>

            <div className="fila acciones">
              <span className="contador-seccion">Section 1</span>
              <Link to="/AgregarInvitado.html" className="boton-agregar">AGREGAR INVITADO</Link>
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
        className="boton-cerrar"
        aria-label="Cerrar"
        onClick={() => navigate('/PantallaInicioUsuario.html')}
      >
        X
      </button>

      <section className="panel-agregar">
        <div className="panel-superior">
          <h1>Agregar<br />Invitado</h1>

          <label className="foto-box" htmlFor="foto-invitado">
            <span className="foto-placeholder">Foto</span>
            <input id="foto-invitado" name="foto-invitado" type="file" accept="image/*" />
          </label>
        </div>

        <form className="formulario-invitado">
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="numero">Número</label>
            <input id="numero" name="numero" type="text" />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input id="correo" name="correo" type="email" />
          </div>

          <div className="acciones-formulario">
            <button type="submit" className="boton-agregar">AGREGAR</button>
          </div>
        </form>
      </section>
    </main>
  )
}

const membershipPlans = [
  {
    name: 'Básico',
    to: '/PantallaPlanBasico.html',
    details: [
      'Acceso al gimnasio',
      'Uso de equipo general',
      'Área de cardio y pesas',
      'Sin locker incluido',
      'Sin acceso a box',
      'Horario limitado',
    ],
  },
  {
    name: 'Estándar',
    to: '/PantallaPlanEstandar.html',
    details: [
      'Acceso completo al gimnasio',
      'Área de cardio y pesas',
      'Acceso a área de box',
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
      'Área de cardio, pesas y box',
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
        <div className="contenido">
          <h1>Membresías</h1>

          <div className="planes">
            {membershipPlans.map((plan) => (
              <article className="plan-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <ul>
                  {plan.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Link to={plan.to} className="boton-plan">Editar plan</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const planDetails = {
  basico: {
    name: 'Básico',
    price: '$800 MXN',
    checkout: '/finalizarCompraBasico.html',
    details: [
      'Acceso al gimnasio',
      'Uso de equipo general',
      'Área de cardio y pesas',
      'Sin locker incluido',
      'Horario limitado',
    ],
  },
  estandar: {
    name: 'Estándar',
    price: '$1,200 MXN',
    checkout: '/finalizarCompraEstandar.html',
    details: [
      'Acceso completo al gimnasio',
      'Acceso a área de box',
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
      'Acceso a todas las áreas',
      'Locker y toalla incluidos',
      'Horario sin restricción',
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

      <div className="page-wrapper">
        <header className="header">
          <Link to="/PantallaMembresias.html" className="header-title header-title-link">PLANES</Link>
          <div className="header-info">
            <span className="fecha">30/07/2026</span>
            <span className="bienvenido">Bienvenido</span>
          </div>
        </header>

        <div className="plan-container">
          <div className="plan-top">
            <div className="plan-name-block">
              <span className="plan-name">{plan.name}</span>
            </div>
            <div className="plan-desc-block">
              <ul>
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="plan-bottom">
            <div className="plan-price-block">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">por 30 días</span>
            </div>
            <Link to={plan.checkout} className="plan-cta-block">
              <span className="cta-text">COMENZAR AHORA</span>
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
    label: 'PLAN BÁSICO - MONTO $800 MXN',
  },
  estandar: {
    back: '/PantallaPlanEstandar.html',
    label: 'PLAN ESTÁNDAR - MONTO $1,200 MXN',
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
      <section className="checkout-card">
        <button
          type="button"
          className="close-button"
          aria-label="Cerrar"
          onClick={() => navigate(checkout.back)}
        >
          X
        </button>
        <header className="checkout-header">
          <h1>FINALIZAR COMPRA</h1>
          <p className="plan-label">{checkout.label}</p>
        </header>
        <form className="checkout-form">
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" placeholder="Nombre" />
            </div>
            <div className="field-group">
              <label htmlFor="apellido">Apellido</label>
              <input id="apellido" name="apellido" type="text" placeholder="Apellido" />
            </div>
          </div>
          <div className="field-row full-width">
            <div className="field-group full-width">
              <label htmlFor="direccion">Dirección</label>
              <input id="direccion" name="direccion" type="text" placeholder="Dirección" />
            </div>
          </div>
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input id="ciudad" name="ciudad" type="text" placeholder="Ciudad" />
            </div>
            <div className="field-group">
              <label htmlFor="estado">Estado</label>
              <input id="estado" name="estado" type="text" placeholder="Estado" />
            </div>
          </div>
          <div className="payment-section">
            <p className="payment-title">Método de pago</p>
            <p className="payment-method">Tarjeta de débito</p>
            <div className="card-fields">
              <input id="tarjeta" name="tarjeta" type="text" placeholder="Número de tarjeta" />
              <input id="mmaa" name="mmaa" type="text" placeholder="MM/AA" />
              <input id="cvv" name="cvv" type="text" placeholder="Código CVV" />
            </div>
          </div>
          <button type="submit" className="submit-button">PAGAR</button>
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
