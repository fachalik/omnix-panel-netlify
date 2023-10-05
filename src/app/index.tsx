import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}
