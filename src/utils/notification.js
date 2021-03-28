import { store } from 'react-notifications-component';

const configNotificationUtil = ({title, type, message, duration}) => {
    return store.addNotification({
        title,
        message: message || customMessages[type],
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

const customMessages = {
  warining : "",
  success: "operation was successful",
  danger: "An error occured",
  info: "",
  default: "",
}

//pass in message,  maybe duration
export const notification = {
    warining : (config) => configNotificationUtil({...config, type: "warning", title: config.title || "Warning"}),
    success: (config) => configNotificationUtil({...config, type: "success", title: config.title || "Success"}),
    error: (config) => configNotificationUtil({...config, type: "danger", title: config.title || "Error"}),
    info: (config) => configNotificationUtil({...config, type: "info", title: config.title || "Info"}),
    default: (config) => configNotificationUtil({...config, type: "default", title: config.title || "default"}),
}

export const removeNotification = (id) => store.removeNotification(id)