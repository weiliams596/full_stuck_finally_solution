import React from "react";
import SetContext from "../Contexts/SetContexts/SetContext";

/**
 * This component is used to show error messages to the user.
 * It uses SetContext to get the error message and timer value.
 * It sets the error message to null after the timer value is reached.
 * @param {number} timer - The time in milliseconds after which the error message should be cleared.
 * @param {string} className - The class name to be applied to the error message.
 */
export default function ErrorShower({ timer, className }) {
  const {error,setError} = React.useContext(SetContext);
  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, timer);
    }
  }, [error]);
  if (!error) return null;
  return <div className={className}>{error}</div>;
}
