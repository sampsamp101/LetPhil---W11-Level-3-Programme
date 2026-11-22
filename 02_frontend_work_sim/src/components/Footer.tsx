import { themeModeStore } from "../store/layoutStore";

export const Footer = () => {
  const {themeMode} = themeModeStore();
  return (
    <footer
      className={`mt-3 w-full border-t ${
        themeMode === "dark"
          ? "border-blue-900 bg-slate-900 text-slate-100"
          : "border-blue-200 bg-blue-100 text-slate-900"
      }`}
    >
      <div className={`mx-auto flex w-full flex-col items-center justify-between gap-2 px-4 py-4 text-sm sm:flex-row sm:px-6 ${
        themeMode === "dark" ? "text-slate-200" : "text-slate-600"
      }`}>
        <p>
          © {new Date().getFullYear()} SummitGear Market. All rights reserved.
        </p>
        <p>Prices in USD.</p>
      </div>
    </footer>
  );
};
