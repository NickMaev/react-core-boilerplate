import {toast} from "react-toastify";

export class Ui {
    
    static showErrors(...messages) {
        
        messages.forEach(x => {
            if (!Array.isArray(x)) {
                toast.error(x);
            }
            else {
                x.forEach(y => toast.error(y));
            }
        });
    }

    static showInfo(message) {
        toast.info(message);
    }
}