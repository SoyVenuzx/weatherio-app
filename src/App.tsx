import './styles/globals.css'
import { Header } from './components/header/Header'
import { CurrentWeather } from './components/columns/CurrentWeather'
import { DaysForecast } from './components/columns/DaysForecast'
import { HourForecast } from './components/rows/HourForecast'
import { Footer } from './components/footer/Footer'
import { RowLayout } from './components/rows/middlerows/RowLayout'

function App () {
  return (
    <div className='min-h-screen p-6 mx-auto text-black bg-white max-w-7xl'>
      {/* Header */}
      <Header />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* Left Column - Current Weather */}
        <div className='space-y-8 lg:col-span-3'>
          <CurrentWeather />

          {/* 5 Days Forecast */}
          <DaysForecast />
        </div>

        {/* Middle and Right Columns - Today's Highlights */}
        <div className='space-y-8 lg:col-span-9'>
          <RowLayout />
          {/* Hourly Forecast */}
          <HourForecast />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
