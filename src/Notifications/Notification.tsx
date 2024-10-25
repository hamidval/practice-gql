import { FC, useState } from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";

interface Props
{
    _notification: string,
    index: number
}

export const Notification: FC<Props> = ({_notification, index}) =>
{
   
    return (
            <Toast key={index} >
                <ToastHeader closeButton={true}>
                    Alert
                </ToastHeader>
                <ToastBody>
                    {_notification}
                </ToastBody>
            </Toast>)
}