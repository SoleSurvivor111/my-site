import React from "react";
import { Grid, Typography, Avatar, Divider, Paper, Box } from "@mui/material";
import { BaseCard } from "components/Card";
import { useGetCommentsByPostIdQuery } from "services/api";
import { useParams } from "react-router-dom";

export const Comments = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCommentsByPostIdQuery(id);

  return (
    <Box sx={{ padding: "14px", overflowY: "auto", maxHeight: "675px" }}>
      <Typography variant="h5" sx={{ mb: "15px" }}>
        {data?.length ? "Comments" : "No comment"}
      </Typography>
      <Paper sx={{ padding: "20px 20px", maxHeight: "400px" }}>
        {data?.map(({ name, body }, idx) => (
          <>
            <BaseCard isLoading={isLoading} error={error} maxWidth="700px">
              <Grid container wrap="wrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <Typography
                    variant="h6"
                    sx={{ margin: 0, textAlign: "left" }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {body}
                  </Typography>
                </Grid>
              </Grid>
            </BaseCard>
            {idx !== data?.length - 1 && (
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            )}
          </>
        ))}
      </Paper>
    </Box>
  );
};
