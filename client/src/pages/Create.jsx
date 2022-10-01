import React from 'react'
import { useState } from 'react'
import '../components/Form.css'
import { FaLink } from 'react-icons/fa'

// create a assignment submission form with inline styles
const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])
  const [points, setPoints] = useState(10)

  const fieldName = [
    { name: 'Title', type: 'text', value: title, handler: setTitle },
    {
      name: 'Description',
      type: 'tel',
      value: description,
      handler: setDescription,
    },
    { name: 'Due date', type: 'date', value: dueDate, handler: setDueDate },
    { name: 'Points', type: 'number', value: points, handler: setPoints },
  ]
  return (
    <div className="create__wrapper">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <fieldset className="field">
          <legend className="legend">Create Assignment Form</legend>

          {fieldName.map(({ name, type, handler, value }) => (
            <React.Fragment key={name}>
              <label className="form__label" htmlFor={name}>
                {name}:
              </label>
              <input
                type={type}
                id={name.toLowerCase()}
                name={name}
                value={value}
                onChange={
                  type !== 'file'
                    ? (e) => handler(e.target.value)
                    : (e) => handler(e.target.files[0])
                }
                placeholder={name}
                className="form__input"
              />
            </React.Fragment>
          ))}
        </fieldset>
        <button className="btn" type="submit">
          Create Link &nbsp; <FaLink />
        </button>
      </form>
    </div>
  )
}

export default Create
