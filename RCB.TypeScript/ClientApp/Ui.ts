import {toast} from "react-toastify";

export class Ui {
    
    static showErrors(...messages: string[]) {
        
        messages.forEach(x => {
            if (!Array.isArray(x)) {
                toast.error(x);
            }
            else {
                (x as any).forEach((y: string) => toast.error(y));
            }
        });
    }

    static showInfo(message: string) {
        toast.info(message);
    }
}