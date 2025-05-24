'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
   if (usuario === 'admin' && clave === 'admin123') {
      
      router.push('/presupuesto')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 text-secondary">
            Mis Gastos Inicio de Sesión
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg bg-light"
                placeholder="Clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="alert alert-danger text-center py-2 mb-3" role="alert">
                <small>{error}</small>
              </div>
            )}
            
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
