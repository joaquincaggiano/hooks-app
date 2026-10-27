import { useOptimistic, useState, useTransition } from "react";
// import { toast } from "sonner";

interface Comment {
  id: number;
  text: string;
  optimistic?: boolean;
}

export const InstagromApp = () => {
  const [isPending, startTransition] = useTransition();

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    comments,
    (currentComments, newComment: string) => {
      return [
        ...currentComments,
        {
          id: currentComments.length + 1,
          text: newComment,
          optimistic: true,
        },
      ];
    },
  );

  const handleAddComment = async (formData: FormData) => {
    const newComment = formData.get("post-message") as string;

    addOptimisticComments(newComment);

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setComments((prevComments) => [
        ...prevComments,
        { id: prevComments.length + 1, text: newComment },
      ]);

      //! Este es código para revertir el comentario optimista si ocurre un error
      // setComments((prevComments) => prevComments);
      // toast.error("Error al agregar el comentario");
    });
  };

  return (
    <div className="bg-slate-700 flex h-dvh items-center justify-center p-4">
      <div className="flex max-h-full min-h-0 w-125 flex-col overflow-hidden rounded-3xl bg-gray-300">
        {/* Post de ejemplo */}
        <div className="flex shrink-0 flex-col items-center p-4">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
            alt="Instagrom"
            className="mb-4 h-[min(16rem,35vh)] w-full rounded-xl object-cover"
          />
          <p className="text-center font-bold text-black">
            Mira que interesante esta funcionalidad de la API de React.
          </p>
        </div>

        {/* Comentarios */}
        <ul className="flex min-h-0 flex-col items-start overflow-y-auto px-4">
          {optimisticComments.map((comment) => (
            <li key={comment.id} className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-center text-white">A</span>
              </div>
              <p className="text-black">{comment.text}</p>
              {comment.optimistic && (
                <span className="text-sm text-gray-500">enviando... </span>
              )}
            </li>
          ))}
        </ul>

        {/* Formulario de comentarios */}
        <form
          action={handleAddComment}
          className="flex shrink-0 flex-col items-center p-4"
        >
          <input
            type="text"
            name="post-message"
            placeholder="Escribe un comentario"
            required
            className="mb-2 w-full rounded-md bg-white p-2 text-black"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-blue-500 p-2 text-white cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
