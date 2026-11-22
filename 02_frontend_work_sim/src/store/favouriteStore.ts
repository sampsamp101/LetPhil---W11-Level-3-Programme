import { create } from "zustand";

type favouriteType = {
    favourites: number[];
    favouritesLength: number;
    isFavourite: (productId: number) => boolean;
    setFavourites: (productId: number) => void;
};

export const favouriteStore = create<favouriteType>((set, get) => ({
    favourites: [],
    favouritesLength: 0,
    setFavourites: (productId) =>
        set((state) => {
            const updatedFavourites = state.favourites.includes(productId)
                ? state.favourites.filter((favId) => favId !== productId)
                : [...state.favourites, productId];

            return {
                favourites: updatedFavourites,
                favouritesLength: updatedFavourites.length,
            };
        }),
    isFavourite: (productId) => get().favourites.includes(productId),
}));

