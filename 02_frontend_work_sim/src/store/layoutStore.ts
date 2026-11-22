import { create } from "zustand";

type themeModeType ={
    themeMode: "light" | "dark",
    onChangeClickTheme: (themeMode: "light" | "dark") => void
}

export const themeModeStore = create<themeModeType>((set) => ({
    themeMode: "light",
    onChangeClickTheme: (themeMode) =>
        set({ themeMode: themeMode === "light" ? "dark" : "light" }),
}))

