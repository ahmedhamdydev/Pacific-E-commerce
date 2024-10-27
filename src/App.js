import { BrowserRouter as Router } from 'react-router-dom'


import './App.css';
import AppRouter from './router/route';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/store';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <Provider store={store}> */}
                <Router>
                    <AppRouter />
                </Router>
                <Toaster position='top center' />
            {/* </Provider> */}
            {/* document.getElementById('root') */}
        </QueryClientProvider>
    );
}

export default App;
