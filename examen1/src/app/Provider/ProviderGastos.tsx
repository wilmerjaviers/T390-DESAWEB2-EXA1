'use client'
import ProviderGastos from '../context/GastosContext'

interface PlantillaReact {
  children: React.ReactNode
}

export default function ProviderGastosComponent({ children }: PlantillaReact) {
  return (
    <ProviderGastos>
      {children}
    </ProviderGastos>
  )
}
