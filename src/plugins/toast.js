import Swal from 'sweetalert2'

export default Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: 'dont-base-reset',
    popup: 'dont-base-reset',
    header: 'dont-base-reset',
    title: 'dont-base-reset',
    closeButton: 'dont-base-reset',
    icon: 'dont-base-reset',
    image: 'dont-base-reset',
    content: 'dont-base-reset',
    input: 'dont-base-reset',
    actions: 'dont-base-reset',
    confirmButton: 'dont-base-reset',
    cancelButton: 'dont-base-reset',
    footer: 'dont-base-resets'
  }
})
