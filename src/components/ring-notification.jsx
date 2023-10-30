import { SnackbarContent, closeSnackbar } from "notistack";
import { forwardRef } from "react";

export const ringNotification = forwardRef(function notificationSuccess(
  { message },
  ref
) {
  return (
    <SnackbarContent ref={ref} role="ring">
      <p className="ring-notification">
        <img
          className="animate__animated animate__wobble animate__infinite animate__faster animate__repeat-3"
          src="/alarm-clock.png"
          alt="alarm"
        />
        {message}
        <span>😉</span>
        <button onClick={() => closeSnackbar()}>Ok</button>
      </p>
    </SnackbarContent>
  );
});
