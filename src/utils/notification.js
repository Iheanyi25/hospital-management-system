import { store } from 'react-notifications-component';

const configNotificationUtil = ({title, type, message, duration}) => {
    return store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: duration || 2500,
          onScreen: true,
          showIcon: true,
          pauseOnHover: true
        }
      });
}

//pass in message,  maybe duration
export const notification = {
    warining : (config) => configNotificationUtil({...config, type: "warning", title: "Warning"}),
    success: (config) => configNotificationUtil({...config, type: "success", title: "Success"}),
    error: (config) => configNotificationUtil({...config, type: "danger", title: "Error"}),
    info: (config) => configNotificationUtil({...config, type: "info", title: "Info"}),
    default: (config) => configNotificationUtil({...config, type: "default"}),
}
