import React from 'react'

export const box = (props) => {
  return props.data.map(val => {
    return (
      <label
        style={{ margin: '5px', display: 'inline-block' }}
      >
        <input
          type="checkbox"
          value={val.prefCode}
          onClick={props.handleClick}
        />
        {val.prefName}
      </label>
    )
  })
}