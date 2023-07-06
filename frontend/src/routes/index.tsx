import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { trpc } from "../utils/client";

export const useTRPC = routeAction$(async () => {
  return await trpc.greeting.query();
});

// const getWs = $(() => {
//   return trpc.randomNumber.subscribe(undefined, {
//     onData: (number) => {
//       numbers.push(number.randomNumber);
//     },
//   });
// });

export default component$(() => {
  const action = useTRPC();
  const numbers = useStore<number[]>([]);
  // const getWs = trpc.randomNumber.subscribe(undefined, {
  //   onData: (number) => {
  //     numbers.push(number.randomNumber);
  //   },
  // });

  // const getWs = $(() => {
  //   return trpc.randomNumber.subscribe(undefined, {
  //     onData: (number) => {
  //       numbers.push(number.randomNumber);
  //     },
  //   });
  // });

  useVisibleTask$(
    () => {
      trpc.randomNumber.subscribe(undefined, {
        onData: (number) => {
          numbers.push(number.randomNumber);
        },
      });
    },
    {
      strategy: "document-ready",
    },
  );
  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <button
        onClick$={async () => {
          // console.log(await trpc.greeting.query());
          await action.submit();
        }}
      >
        Klicken
      </button>
      <p>{numbers[numbers.length - 1]}</p>
      <p>{action.value?.name}</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

