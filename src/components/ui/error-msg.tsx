import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const ErrorMsg = ({
  error,
}: {
  error: Merge<FieldError, FieldErrorsImpl<{}>> | FieldError | undefined;
}) => {
  return error ? <div className="text-red-500 text-sm">{error.message}</div> : null;
};

export default ErrorMsg;
