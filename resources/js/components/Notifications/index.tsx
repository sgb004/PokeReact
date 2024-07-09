import {
    CSSProperties,
    LegacyRef,
    RefObject,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";

export type NotificationsProps = {};

export type NotificationType = "info" | "success" | "warning" | "error";

export type Notification = {
    message: string;
    type?: NotificationType;
    duration?: number;
};

export interface NotificationCSS extends CSSProperties {
    "--duration": string;
}

export const addNotification = (
    from: HTMLElement,
    message: string,
    type: NotificationType | undefined = undefined,
    duration: number | undefined = undefined
) => {
    const container = from.closest(".notifications-container");
    const notifications = container?.querySelector(".notifications");

    notifications?.dispatchEvent(
        new CustomEvent("addNotification", {
            detail: {
                message,
                type,
                duration,
            },
        })
    );
};

const Notifications = forwardRef<HTMLDivElement, NotificationsProps>(
    (props, ref) => {
        const notificationsRef = useRef(ref);
        const notifications = useRef<Notification[]>([]);
        const setRender = useState(1)[1];

        useEffect(() => {
            const _notificationsRef = (ref ??
                (notificationsRef as LegacyRef<HTMLDialogElement>)) as RefObject<HTMLDialogElement>;
            const notificationsElement = _notificationsRef.current;

            let remove = () => {};

            if (notificationsElement instanceof HTMLElement) {
                const handleAddNotification = (event: CustomEvent) => {
                    notifications.current.push({
                        message: event.detail.message,
                        type: event.detail.type,
                        duration: event.detail.duration,
                    });
                    setRender(Date.now());
                };
                const deleteAllNotifications = () => {
                    notifications.current = [];
                    setRender(Date.now());
                };
                const handleAnimationStart = () => {
                    clearTimeout(timer);
                };
                const handleAnimationEnd = () => {
                    const notificationsActive =
                        notificationsElement.querySelectorAll(
                            '.notification[data-animation-end="true"]'
                        );
                    if (
                        notificationsActive.length ===
                        notifications.current.length - 1
                    ) {
                        timer = setTimeout(deleteAllNotifications, 2000);
                    }
                };
                let timer: number;

                notificationsElement.addEventListener(
                    "addNotification",
                    handleAddNotification as EventListener
                );

                notificationsElement.addEventListener(
                    "animationstart",
                    handleAnimationStart
                );

                notificationsElement.addEventListener(
                    "animationend",
                    handleAnimationEnd
                );

                remove = () => {
                    notificationsElement.removeEventListener(
                        "addNotification",
                        handleAddNotification as EventListener
                    );

                    notificationsElement.removeEventListener(
                        "animationstart",
                        handleAnimationStart
                    );

                    notificationsElement.removeEventListener(
                        "animationend",
                        handleAnimationEnd
                    );
                };
            }

            return remove;
        }, []);

        return (
            <div
                ref={ref ?? (notificationsRef as LegacyRef<HTMLDivElement>)}
                className="notifications absolute bottom-0 max-w-[66%]"
            >
                {notifications.current.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification relative grid grid-rows-[0fr] animate-show-notification ${
                            notification.type ?? ""
                        }`}
                        style={
                            notification.duration
                                ? ({
                                      "--duration": `${notification.duration}s`,
                                  } as NotificationCSS)
                                : {}
                        }
                        onAnimationEnd={(event) =>
                            event.currentTarget.setAttribute(
                                "data-animation-end",
                                "true"
                            )
                        }
                    >
                        <div className="overflow-hidden">
                            <div className="inline-block p-[5px] rounded-[0_5px_5px_0] bg-white text-sm">
                                {notification.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
);

export default Notifications;
