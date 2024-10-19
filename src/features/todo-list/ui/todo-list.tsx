import { useTodoList } from "../_model/use-todo-list.tsx";
import { useCreateTodo } from "../_model/use-create-todo.tsx";
import { useDeleteTodo } from "../_model/use-delete-todo.tsx";
import { motion, AnimatePresence } from "framer-motion";

export function TodoList() {
  const { error, isLoading, todoItems } = useTodoList();
  const { handleCreate, isLoadData } = useCreateTodo();
  const { handleDelete, isLoadDelete } = useDeleteTodo();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-[#242424] h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center mt-10"
      >
        Error: {error.message}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-5 mx-auto max-w-[600px] mt-10 bg-[#242424] shadow-lg rounded-lg"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-blue-600"
      >
        Todo List
      </motion.h1>
      <form className="flex gap-3 mb-8" onSubmit={handleCreate}>
        <input
          className="flex-grow rounded-full p-3 border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
          type="text"
          name="text"
          placeholder="Add a new todo..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoadData}
          className="rounded-full px-6 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          Add
        </motion.button>
      </form>
      <AnimatePresence>
        {todoItems?.map(todo => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="list-none mb-4 bg-[#242424] border-blue-500"
          >
            <div className="flex justify-between cursor-pointer  items-center bg-[#242424] border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-white">{todo.text}</span>
              <motion.button
                disabled={isLoadDelete(todo.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(todo.id)}
                className="ml-2 cursor-pointer text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </motion.button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
