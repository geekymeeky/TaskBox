import swal from 'sweetalert2'
import app from '../firebase/index'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

export const copyToClipboardWithAlert = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      swal.fire({
        icon: 'success',
        title: 'Link copied to clipboard',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
}

export const uploadFile = (file) => {
  const storage = getStorage(app)

  const storageRef = ref(storage, 'files/' + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file)
  return new Promise((resolve, reject) => {
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
        reject(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL and return as a promise
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          resolve(url)
        })
      }
    )
  })
}
