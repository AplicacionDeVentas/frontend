import React from 'react'
import InputField from '../../../../Utils/InputField/InputField'
import InputButton from '../../../../Utils/InputButton/InputButton'
import AnchorButton from '../../../../Utils/AnchorButton/AnchorButton'

import './Login.scss'

const Login = () => {
  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">Inicia Sesion</h1>
        <form action="">
          <InputField type="text" placeholder="Usuario o correo" autoFocus/>
          <InputField type="password" placeholder="Contraseña"/>
          <InputButton value="Iniciar Sesion"/>
        </form>
        <span className="login__oTag">
          ó
        </span>
        <AnchorButton value="Registrarme"/>
        <div className="login__forgotPasswd">
          <a href="#">Olvidé mi contraseña</a>
        </div>
      </div>
    </div>
  )
}

export default Login
