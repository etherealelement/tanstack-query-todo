import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "../api";
import { useCallback, useRef } from "react";

export function useTodoList() {
  const { data: todoItems, error, refetch, isLoading } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => data.reverse()
  });

  return {
    isLoading,
    refetch,
    todoItems,
    error
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
