
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Add this line to import the component you just created
import PostsComponent from './Components/PostsComponent'
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;