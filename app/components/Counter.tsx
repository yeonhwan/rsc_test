"use client";

import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CounterCtx = {
  state: {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
  };
} | null;

const CounterCtx = createContext<CounterCtx>(null);

function CounterContext({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <CounterCtx.Provider value={{ state: { count, setCount } }}>
      {children}
    </CounterCtx.Provider>
  );
}

function CounterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-48 h-48 flex flex-col justify-around items-center border border-cyan-400 rounded-xl my-4">
      <CounterContext>{children}</CounterContext>
    </div>
  );
}

function CounterToggle() {
  const {
    state: { setCount },
  } = useContext(CounterCtx)!;

  return (
    <button
      className="w-max p-2 bg-pink-300 rounded-md text-pink-800 shadow-xl hover:bg-pink-400"
      onClick={() => setCount((prev) => prev + 1)}
    >
      Toggle Me!
    </button>
  );
}

function CounterDisplay() {
  const {
    state: { count },
  } = useContext(CounterCtx)!;

  return (
    <div className="w-10 h-10 bg-cyan-400 rounded-full justify-center items-center flex">
      {count}
    </div>
  );
}

const Display = CounterDisplay;
const Toggle = CounterToggle;
const Layout = CounterLayout;

export { Layout, Display, Toggle };
