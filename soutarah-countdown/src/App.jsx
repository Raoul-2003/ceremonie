import Header        from './components/Header'
import Hero          from './components/Hero'
import CountdownTimer from './components/CountdownTimer'
import PostersSlider  from './components/PostersSlider'
import Partners       from './components/Partners'
import Objectives     from './components/Objectives'
import Gallery        from './components/Gallery'
import Footer         from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-soutarah-dark text-white">
      <Header />
      <main>
        <Hero />
        <CountdownTimer />
        <PostersSlider />
        <Partners />
        <Objectives />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
