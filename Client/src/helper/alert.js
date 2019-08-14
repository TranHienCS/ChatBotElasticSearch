import Swal from 'sweetalert2';

const Alert = {
    alertSuccess() {
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
    },

    alertFail() {
        Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
export default Alert;