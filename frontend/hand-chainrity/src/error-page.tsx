import { useRouteError } from "react-router-dom";

interface ErrorWithMessage {
    message?: string;
    statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorWithMessage;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}