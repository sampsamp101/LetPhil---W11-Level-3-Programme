
import type { Footerstrap } from "../types/footer";

export const Footer = ({ company }: Footerstrap) => (
  <footer className="mt-3 w-full border-t border-blue-200 bg-blue-100">
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:px-6">
      <p>
        © {new Date().getFullYear()} {company}. All rights reserved.
      </p>

      <p>Prices in USD.</p>
    </div>
  </footer>
);