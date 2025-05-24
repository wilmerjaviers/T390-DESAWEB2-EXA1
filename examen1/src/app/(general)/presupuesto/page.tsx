'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function PresupuestoMensual() {
  const [presupuesto, setPresupuesto] = useState('')
  const router = useRouter()

  const handleEstablecerPresupuesto = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (presupuesto.trim() !== '') {
      localStorage.setItem('presupuestoMensual', presupuesto)
      
      router.push('/gastos')
    }
  }

  return (
    <div className="container-fluid vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            
           
            <h1 className="text-center mb-4 text-primary">Establecer Presupuesto Mensual</h1>
            
            <div className="card shadow mb-4">
              <div className="card-body p-4">
                <form onSubmit={handleEstablecerPresupuesto}>
                  <div className="mb-3">
                    <label htmlFor="presupuesto" className="form-label">
                      Monto de presupuesto Mensual
                    </label>
                    <input
                      type="text"
                      id="presupuesto"
                      className="form-control form-control-lg"
                      placeholder="Ingrese el monto del presupuesto"
                      value={presupuesto}
                      onChange={(e) => setPresupuesto(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Guardar Presupuesto
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
