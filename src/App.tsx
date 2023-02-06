import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/collections' element={<MyCollection />} />
        <Route path='/collection/create' element={<CreateCollection />} />
        <Route path='collection/:id' element={<CollectionDetails />} />
        <Route path='asset/create' element={<CreateItem />} />
        <Route path='/account/:memberId' element={<MyAccount />} />
        <Route path='/account/profile' element={<EditProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
