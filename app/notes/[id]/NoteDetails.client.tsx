"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./TaskDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>Note title</h2>
            </div>
            <p className={css.content}>Note content</p>
            <p className={css.date}>Created date</p>
          </div>
        </div>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {error && !note && <p>Something went wrong.</p>}
    </>
  );
};

export default NoteDetailsClient;
