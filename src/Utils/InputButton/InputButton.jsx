import React from 'react'

import './InputButton.scss'

const InputButton = (props) => {
  return (
    <div className="inputButton">
      <input
        className="inputButton__input"
        type="submit"
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  )
}

export default InputButton
