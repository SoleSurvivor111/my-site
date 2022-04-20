import * as React from "react";
import { CardContent, Card, Alert, AlertTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

type CardProps = {
  children: React.ReactChild;
  isLoading: boolean;
  error?: { message?: string };
  maxWidth: string;
};

export const BaseCard = ({
  children,
  isLoading,
  error,
  maxWidth,
}: CardProps) => {
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );

  return (
    <Card>
      <CardContent
        sx={{
          maxWidth: maxWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ width: "50px", height: "50px" }} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};
