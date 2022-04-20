import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Form, Field } from "react-final-form";

import { TextField } from "@mui/material";
import { selectToken, setCredentials } from "redux/reducers/auth";

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const required = (value: string) => (value ? undefined : "Required");

type SaveAccessTokenModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SaveAccessTokenModal({
  open,
  onClose,
}: SaveAccessTokenModalProps) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleSubmit = (values) => {
    dispatch(setCredentials({ token: values.token }));
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            onClick={onClose}
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography id="modal-modal-description" sx={{ mb: "20px" }}>
              Enter access token for{" "}
              <a target="_blank" href="https://gorest.co.in/" rel="noreferrer">
                gorest.co
              </a>
            </Typography>
            <Form
              initialValues={{ token }}
              onSubmit={handleSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                valid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="token" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        type="text"
                        error={meta.error && meta.touched}
                        id={input.name}
                        label="Token"
                        helperText={<span>{meta.error}</span>}
                        {...input}
                      />
                    )}
                  </Field>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      disabled={submitting || pristine || !valid}
                      variant="contained"
                      sx={{ width: 100, mt: "20px", mr: "5px" }}
                    >
                      Save
                    </Button>
                    <Button
                      disabled={!dirty}
                      onClick={form.reset}
                      variant="contained"
                      sx={{ width: 100, mt: "20px" }}
                    >
                      Undo
                    </Button>
                  </Box>
                </form>
              )}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
