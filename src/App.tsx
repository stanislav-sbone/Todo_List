import Layout from './layout';
import ThemeProvider from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
