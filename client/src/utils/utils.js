import swal from 'sweetalert2'

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
