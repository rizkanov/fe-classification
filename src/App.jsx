import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SVMClassifier from "./components/SVMClassifier";
import ReviewList from "./components/ReviewTable";
import ButtonClassify from "./components/ButtonClassify";
import ReviewClassifier from "./components/ReviewClassifier";

function App() {

	return (
		// <>
		// 	<ButtonClassify />
		// 	<ReviewList />
		// </>

		// <SVMClassifier />
		<ReviewClassifier />
	);
}

export default App;
