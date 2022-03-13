import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {
  const { proyectos } = useProyectos()
  return (
    <>
    <h1 className='text-4xl font-black'>Proyectos</h1>
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis error numquam consequuntur, harum, ipsa laborum odio voluptates deleniti culpa tenetur ipsam autem maxime sunt, voluptatem omnis quaerat suscipit quia praesentium.
    </div>
    </>
  )
}

export default Proyectos