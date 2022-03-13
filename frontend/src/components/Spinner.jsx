import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-5">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
        <span className="visually-hidden">Cargando</span>
      </div>
    </div>
  )
}

export default Spinner