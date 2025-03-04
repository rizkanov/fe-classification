import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SVMClassifier from "./components/SVMClassifier";
import ReviewList from "./components/ReviewTable";
import ButtonClassify from "./components/ButtonClassify";

function App() {

	return (
		// <>
		// 	<ButtonClassify />
		// 	<ReviewList />
		// </>

		<SVMClassifier />
	);
}

export default App;
