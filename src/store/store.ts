import { create } from "zustand";

export type ChoiceType =
    | "scissors"
    | "spock"
    | "paper"
    | "lizard"
    | "rock"
    | "";

type Store = {
    houseChoice: ChoiceType;
    yourChoice: ChoiceType;
    previousChoice: ChoiceType;
    score: number;
    setHouseChoice: (value: ChoiceType) => void;
    setYourChoice: (value: ChoiceType) => void;
    changeScoreBy: (value: number) => void;
};

const useStore = create<Store>()((set) => ({
    houseChoice: "",
    yourChoice: "",
    previousChoice: "",
    score: 0,
    setHouseChoice: (value) => set(() => ({ houseChoice: value })),
    setYourChoice: (value) =>
        set((state) => {
            return {
                previousChoice: state.yourChoice,
                yourChoice: value,
            };
        }),
    changeScoreBy: (value) => set((state) => ({ score: state.score + value })),
}));

export default useStore;
