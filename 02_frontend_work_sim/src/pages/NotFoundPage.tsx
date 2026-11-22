import { Link, useLocation } from "react-router";

export const NotFoundPage = () => {
    const backLink = (
        <Link to="/" className="mb-6 inline-block font-bold text-emerald-800 dark:text-emerald-400">
        ← Back to shop
        </Link>
    );
    const { pathname } = useLocation();
    return(
    <>
        {backLink}
        <div className="flex flex-col items-center text-center py-24 px-6">
            <p className="text-8xl font-extrabold text-emerald-800 dark:text-emerald-400">
                404
            </p>
            <p className="mt-4 text-3xl font-bold">This page wandered off</p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">We couldn't find <strong>{pathname}</strong>.</p>
            <button className="mt-6 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white">Back to the shop</button>
        </div>
    </>
    )

}