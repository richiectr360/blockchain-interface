"use client"

import { Provider } from "next-redux-wrapper";
import { makeStore } from "@/lib/store";
import { useRef } from "react";

export default function StoreProvider({ children }) {
    const store = useRef(null);
    if(!storeRef.current) {
        //Create the store instance the first time this renders
        storeRef.current = makeStore();
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}