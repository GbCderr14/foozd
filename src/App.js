import {Routes,Route,Navigate} from 'react-router-dom';
import Form from './pages/form';
import Detail from './pages/user-detail';
import Layout from './components/layout/Layout';
function App() {
  return (
    <div className="app">
      <Layout>
      <Routes>
      <Route path="/" element={<Navigate replace to="/form" />} />
      <Route path="/form" element={<Form />}/>
      <Route path="/user-detail" element={<Detail/>}/>
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
