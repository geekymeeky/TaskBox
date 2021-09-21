import React from 'react'
import { useState } from 'react'
import './Form.css'
import app from '../firebase/index'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const Form = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [file, setFile] = useState()
  const [message, setMessage] = useState()

  const fieldName = [
    { name: 'Name', type: 'text', handler: setName },
    { name: 'Phone', type: 'tel', handler: setPhone },
    { name: 'Email', type: 'email', handler: setEmail },
    { name: 'Title', type: 'text', handler: setTitle },
    { name: 'Subject', type: 'text', handler: setSubject },
    { name: 'File', type: 'file', handler: setFile },
  ]

  async function uploadFile() {
    const storage = getStorage(app)

    const storageRef = ref(storage, 'files/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.error(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setFileUrl(downloadURL)
        })
      }
    )
  }

  async function submitAssignment() {
    await uploadFile()
    const payload = {
      name,
      email,
      phone,
      title,
      subject,
      fileUrl,
    }

    await fetch(`http://localhost:5000/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      referrerPolicy: 'no-referrer',
    }).then((e) => setMessage('Task Submitted'))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitAssignment()
      }}
    >
      <fieldset>
        <legend>
          <span className="number">+</span>Assignment Submission
        </legend>

        {fieldName.map(({ name, type, handler }) => (
          <React.Fragment key={name}>
            <label htmlFor={name}>{name}:</label>
            <input
              type={type}
              id={name.toLowerCase()}
              name={name}
              onChange={
                type !== 'file'
                  ? (e) => handler(e.target.value)
                  : (e) => handler(e.target.files[0])
              }
            />
          </React.Fragment>
        ))}
      </fieldset>
      <label htmlFor="message" style={{ color: 'green' }}>
        {message}
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
