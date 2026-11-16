import dynamic from 'next/dynamic'
import Head from 'next/head'

// Load the full app client-side to preserve all animations and interactivity
const App = dynamic(() => import('../src/App'), { ssr: true })

export default function Home() {
  return (
    <>
      <Head>
        <title>Implantes Dentales en Palma de Mallorca y Manacor | Odontofamilia</title>
        <meta name="description" content="Implantes dentales de titanio en Palma de Mallorca y Manacor. Primera visita gratuita. Carga inmediata disponible. Desde 500€. Clínica Odontofamilia." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://odontofamiliapalma.com/tratamientos/implantes-dentales/" />
      </Head>
      <App />
    </>
  )
}
