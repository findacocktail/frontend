import { Box } from "@mui/joy";
import { PropsWithChildren } from "react";
import MainBar from "../components/mainbar.tsx";

export default function Template(props: PropsWithChildren) {
  return (
    <>
      <MainBar />
      <Box
        position="relative"
        marginLeft="10%"
        marginRight="10%"
        width="70%"
        marginTop="100px"
      >
        {props.children}
      </Box>
    </>
  );
}
