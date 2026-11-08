import icon from "../public/favicon.svg";

export const EmptyState = ({ message, category }: { message: string; category?: string }) => {
    return (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
            <img src={icon} alt="Empty state icon" className="h-12 w-12" />
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">{message}</h1>
            <p>
                {category
                    ? `No ${category} products match this section. Check back soon.`
                    : `No products match your search.`}
            </p>
        </div>
    );
};