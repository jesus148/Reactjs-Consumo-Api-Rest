

//importando componente
import React from 'react'


//importando hoja de estilos
import '../sass/Button.scss'



//recordar q con el (props) es todo , {} es mas personalizddo los props
const Button = ({icon , handleClik }) => {
  return (

    // className : en los classnam usamos referencia osea para q sea mas facil nombrar a los classname button__
    //los props rcibidos pueden usarse donde sea tanto en la vista como en los eventos dentro de los tag
    <div className='button__box'>
      <button className='button' onClick={handleClik}>{icon}</button>
      <div className='button__shadow'></div>

    </div>
  )
}


// //exportacion por defecto , al importar en otro componente le puedes cambiar el nombre a este componente
// export default Button


//importando de formana nombrada donde no puede cambiar el nombre en otro componente al importar 
export {Button}