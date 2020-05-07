import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import NavigationScreen from "./Components/NavigateScreen";

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationScreen />
    </ErrorBoundary>
  );
}
