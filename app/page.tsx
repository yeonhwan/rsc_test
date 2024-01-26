import * as Counter from "./components/Counter";

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
      <h1 className="text-4xl font-extrabold">Counter: Rendered on client</h1>
      <Counter.Layout>
        <Counter.Display />
        <Counter.Toggle />
      </Counter.Layout>
      <div className="w-1/2 h-max flex flex-col my-10">
        <h1 className="text-4xl font-extrabold">
          Generated from server using RSC
        </h1>
        <ul className="flex w-full h-max flex-col bg-slate-400/50 p-10 mt-10 rounded-xl">
          {rscTestData.map((item, idx) => {
            return (
              <li
                className="bg-slate-500 rounded-xl p-2 mb-2 list-disc"
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
