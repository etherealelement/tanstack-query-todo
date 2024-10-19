import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../api";
import { useCallback, useRef } from "react";

export function useTodoList() {
  const {
    data: todoItems,
    error,
    status,
    fetchStatus,
    isPlaceholderData,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfiniteQueryOptions()
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="flex gap-2 items-center mt-4" ref={cursorRef}>
      {!hasNextPage && <span>No more data</span>}
      {isFetchingNextPage && <span>Loading...</span>}
    </div>
  );

  return {
    isLoading,
    todoItems,
    cursor,
    error,
    status,
    fetchStatus,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
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
