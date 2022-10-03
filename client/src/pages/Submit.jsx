import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../components/Form.css'
import { FaUpload } from 'react-icons/fa'
import { copyToClipboardWithAlert } from '../utils/utils'
import { uploadFile } from '../utils/utils'

const Create = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState()
  const params = useParams()

  const fieldName = [
    {
      name: 'Name',
      type: 'text',
      value: name,
      handler: setName,
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'Phone',
      type: 'tel',
      value: phone,
      handler: setPhone,
      placeholder: 'Enter your phone number',
      required: true,
    },
    {
      name: 'Email',
      type: 'email',
      value: email,
      handler: setEmail,
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'Description',
      type: 'textarea',
      value: description,
      handler: setDescription,
      placeholder: '(Optional) Enter a description',
      required: false,
    },
    {
      name: 'File',
      type: 'file',
      handler: setFile,
      placeholder: 'Upload your file',
      required: true,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    uploadFile(file).then((url) => {
      console.log(url)
      const newTask = {
        name,
        phone,
        email,
        file: url,
        description,
        assignment: params.id,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      }
      fetch(`${window.location.origin}/api/v1/submit`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          copyToClipboardWithAlert(
            `${window.location.origin}?edit=${data.data.submissionId}`
          )
        })
    })
  }

  return (
    <div className="create__wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="field">
          <legend className="legend">Submit your task</legend>

          {fieldName.map(
            ({ name, type, handler, value, placeholder, required }) => (
              <React.Fragment key={name}>
                <label className="form__label" htmlFor={name}>
                  {name}:
                </label>
                <input
                  type={type}
                  id={name.toLowerCase()}
                  name={name}
                  {...(type === 'file' ? {} : { value: value })}
                  onChange={
                    type !== 'file'
                      ? (e) => handler(e.target.value)
                      : (e) => handler(e.target.files[0])
                  }
                  required={required}
                  placeholder={placeholder}
                  className="form__input"
                />
              </React.Fragment>
            )
          )}
        </fieldset>
        <button className="btn" type="submit">
          Submit &nbsp; <FaUpload />
        </button>
      </form>
    </div>
  )
}

export default Create
