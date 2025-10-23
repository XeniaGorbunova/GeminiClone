import { memo, useContext, useEffect, type FC } from "react";
import './ErrorToaster.css';
import { ErrorContext } from "../../context/Context";

export const ErrorToaster: FC = memo(() => {
    const { error, setError } = useContext(ErrorContext);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, setError]);


    if (!error) return null;

    return (
        <div className="toaster">
            <p>{ error }</p>
        </div>
    );
})