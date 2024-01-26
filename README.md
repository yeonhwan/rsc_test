## RSC with NEXT and its patterns

## RSC

React Server Components were enabled in React 18 and Next 13 in 2023.

## GOTCHAS

- RSC can't pass down any props that can't be serialized to JSON to its children. (Date, Function...etc).

  <br/>

  - That means you cannot pass event handler from RSC to Client Component _( RSC does not expect any kinds of client interactions. Hydration only runs on the client. )_

  <br/>

  - You have to convert it into Client Component by using `"use client"`.

<br/>

- Unless you follow proper ways to use dot notation for Components in Next RSC (e.g. Compound Pattern), you will run into errors such as `Unknwon server component type: undefined`
  <br/>

  - if you want to use it, then you have to use `"use client"` in its top component
    <br/>
  - If you want to use composite pattern using dot notation etc, you have to use different approach than before.
    <br/>

  _e.g. ) reference: radix/ui_

  ```tsx
  //inside of Counter.tsx

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

  //.. import Counter from Home

  import * as Counter from "./components/Counter";
  // you can import component by components
  // you can make bundler to tree-shake for unused

  type TestJSON = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  const testurl = "https://jsonplaceholder.typicode.com/posts/?start=0&_end=10";

  export default async function Home() {
    const rscTestData: TestJSON[] = await fetch(testurl).then((res) =>
      res.json()
    );

    return (
      <div className="w-full h-dvh flex flex-col justify-center items-center bg-slate-500 text-white">
        <h1 className="text-4xl font-extrabold">Counter: rendered on client</h1>
        <Counter.Layout>
          <Counter.Display />
          <Counter.Toggle />
        </Counter.Layout>
        <div className="w-1/2 h-max flex flex-col my-10">
          <h1 className="text-4xl font-extrabold">
            Generated from server using RSC
          </h1>
          <ul className="flex w-full h-max flex-col bg-slate-400 p-10 mt-10">
            {rscTestData.map((item, idx) => {
              return (
                <li
                  className="bg-slate-500 rounded-xl p-2 mb-2"
                  key={"todo" + item.id}
                >
                  <p>{item.userId}</p>
                  <p>{item.title}</p>
                  <p>{item.completed}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  ```
