import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useGetPostsByPageQuery } from "../services/api";
import { DataTable } from "components/Table";
import { useSearchParams } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 780 },
];

export const PostsPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, error, isLoading } = useGetPostsByPageQuery(page);
  return (
    <div>
      {error && error}
      <DataTable
        title="Posts"
        rows={data?.posts}
        columns={columns}
        isLoading={isLoading}
        pageCount={data?.pageCount}
      />
    </div>
  );
};
