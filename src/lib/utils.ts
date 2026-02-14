import toast from "react-hot-toast";

export function handleError(error: unknown) {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = "An error occurred.";
  }
  toast.error(message);
}
