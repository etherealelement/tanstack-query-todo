import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../api";
import { useCallback, useRef, useState } from "react";

export function TodoList() {
  const [enabled, setEnabled] = useState(false);

  const {
    data: todoItems,
    error,
    status,
    fetchStatus,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    enabled: enabled,
    ...todoListApi.getTodoListQueryOptions()
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (status === "pending" && fetchStatus === "fetching") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Esrror</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="mb-5">Todo List</h1>
      <button onClick={() => setEnabled(e => !e)}>Toggle enabled</button>
      <ul
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? "animate-pulse" : "")
        }
      >
        {todoItems?.map(todo => (
          <li
            className="decoration-0 border border-blue-500 rounded p-3"
            key={todo.id}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center mt-4" ref={cursorRef}>
        {!hasNextPage && <span>No more data</span>}
        {isFetchingNextPage && <span>Loading...</span>}
      </div>
    </div>
  );
}

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(intersection => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
