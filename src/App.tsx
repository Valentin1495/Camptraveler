import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import CollectionDetails from './pages/CollectionDetails';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='collection/:id' element={<CollectionDetails />} />
          <Route path='search' element={<Search />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* <Route path='/collections' element={<MyCollection />} />
        <Route path='/collection/create' element={<CreateCollection />} />
        <Route path='asset/create' element={<CreateItem />} />
        <Route path='/account/:memberId' element={<MyAccount />} />
        <Route path='/account/profile' element={<EditProfile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
