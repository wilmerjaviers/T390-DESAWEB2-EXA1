'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
interface Gasto {
  idgasto: number
  categoria: string
  monto: number
  fecha: string
}
interface PlantillaReact {
  children: ReactNode
}

interface GastosContextType {
  gasto: Gasto[]
  presupuesto: string
  cargarGasto: () => Promise<void>
  guardarGasto: (gasto: Gasto) => Promise<void>
  calcularTotalGastos: () => number
  obtenerAlerta: () => { tipo: string; mensaje: string } | null
}

const contextGastos = createContext<GastosContextType | undefined>(undefined)


export default function ProviderGastos({ children }: PlantillaReact) {
  const [gasto, setGasto] = useState<Gasto[]>([])
  const [presupuesto, setPresupuesto] = useState<string>('')

  let urlApi = "http://localhost:5000/gasto"

  useEffect(() => {
    const presupuestoGuardado = localStorage.getItem('presupuestoMensual')
    if (presupuestoGuardado) {
      setPresupuesto(presupuestoGuardado)
    }
  }, [])

   async function cargarGasto() {
    try {
      const respuesta = await fetch(urlApi)
      const data = await respuesta.json()
      setGasto(data)
    } catch (err) {
      alert('Ocurrió un Error al cargar los gastos')
    }
  }

   async function guardarGasto(gasto: Gasto) {
    try {
      const respuesta = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoria: gasto.categoria,
          monto: gasto.monto,
          fecha: gasto.fecha
        })
      })

      const data = await respuesta.json()
      alert("Gasto agregado correctamente")

       await cargarGasto()

    } catch (error) {
      alert("Ocurrió un error al guardar el gasto")
    }
  }

    function calcularTotalGastos(): number {
    return gasto.reduce((total, gastoItem) => total + gastoItem.monto, 0)
  }

  function obtenerAlerta(): { tipo: string; mensaje: string } | null {
    if (!presupuesto) return null
    
    const presupuestoNum = parseFloat(presupuesto)
    const totalGastos = calcularTotalGastos()
    const porcentajeGastado = (totalGastos / presupuestoNum) * 100

    if (porcentajeGastado > 100) {
      return {
        tipo: 'danger',
        mensaje: 'Has superado el límite del presupuesto, debes ajustar gastos'
      }
    } else if (porcentajeGastado >= 80) {
      return {
        tipo: 'warning',
        mensaje: 'Ha alcanzado el 80% del presupuesto'
      }
    }
    
    return null
  }

  useEffect(() => {
    console.log(gasto)
  }, [gasto])

  return (
    <contextGastos.Provider value={{
      gasto,
      presupuesto,
      cargarGasto,
      guardarGasto,
      calcularTotalGastos,
      obtenerAlerta
    }}>
      {children}
    </contextGastos.Provider>
  )
}

export function useContextGastos() {
  return useContext(contextGastos)
}
