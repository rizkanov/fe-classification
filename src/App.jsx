import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ReviewClassifier from "./components/ReviewClassifier";
import OnnxRuntimeWebClassifier from "./components/OnnxRutimeWebClassifier";

function App() {

	return (
		// <ReviewClassifier />
		<OnnxRuntimeWebClassifier />
	);
}

export default App;
