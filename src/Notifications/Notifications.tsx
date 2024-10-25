import { FC, useState } from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { Notification } from "./Notification";
interface Props
{
    _notifications: string[]
}

export const Notifications: FC<Props> = ({_notifications}) =>
{
    const [notifications, setNotifications] = useState<string[]>(_notifications)
    return (_notifications.length?
    <div>
        <ToastContainer position="top-end">
            {
                _notifications.map((notification, index)=>
                    (
                        <Notification _notification={notification} index={index}/>
                    ))
            }
        </ToastContainer>
    </div>:null)
}