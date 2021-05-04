import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";

const ChakraWrapper = () => {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	);
};

export default ChakraWrapper;
