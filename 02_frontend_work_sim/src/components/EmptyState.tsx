import icon from "../public/favicon.svg";

export const EmptyState = ({message, category}: {message:string, category:string}) => {
    return(
        <>
        <div className="gap-4 mb:col-8 m-3 flex flex-col items-center justify-center gap-2 text-center border-2 border-dashed w-full h-64 rounded-xl">
           <img src={icon} alt="Picture of empty icon" className="w-12 h-12"/>
           <h1>{message}</h1>
           <p>No product of {category} matches this section. Check back soon!</p>
        </div>   
        </>   
    )
};

