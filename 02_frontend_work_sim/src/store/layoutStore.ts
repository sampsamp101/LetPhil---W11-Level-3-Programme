import { create } from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

type themeModeType ={
    themeMode: "light" | "dark",
    onChangeClickTheme: (themeMode: "light" | "dark") => void
}

export const themeModeStore = create<themeModeType>()(
    persist(
        (set)=>({
             themeMode: "light",
            onChangeClickTheme: (themeMode) =>
                set({ themeMode: themeMode === "light" ? "dark" : "light" }),
        }),
        {
            name: "theme-layout-store-save",
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({
                themeMode: s.themeMode,
            })

        }
    )    
)

