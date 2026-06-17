
import AddUserToEvent from '@/Components/Pages/AddUserToEvent';
import ApplicationPage from '@/Components/Pages/ApplicationPage';
import CalendarPage from '@/Components/Pages/Calendar/CalendarPage';
import CommentPage from '@/Components/Pages/CommentPage';
import CreateEventPage from '@/Components/Pages/CreateEventPage';
import EditEventPage from '@/Components/Pages/EditEventPage';
import EditPage from '@/Components/Pages/EditPage';
import EditPagesOfEventPage from '@/Components/Pages/EditPagesOfEventPage';
import EditUserPage from '@/Components/Pages/EditUser/EditUserPage';
import EventPage from '@/Components/Pages/Event/EventPage';
import EventContentPage from '@/Components/Pages/EventContentPage';
import SignPage from '@/Components/Pages/Sign/SignPage';
import SpecPage from '@/Components/Pages/SpecPage';
import UserPage from '@/Components/Pages/User/UserPage';
import UserListPage from '@/Components/Pages/UserList/UserListPage';
import UsersOfEventPage from '@/Components/Pages/UsersOfEventPage';
import Background from '@/Components/UI/Background';
import useTheme from '@/Hooks/useTheme';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';

// npm install react-router-dom
// npm install sass
// npm install @craco/craco --save-dev
// npm install react-markdown



export default function App() {
  
  const {ThemeContextProvider} = useTheme();

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Background>
            <Routes>
              <Route path="/" element={<SignPage />} />

              <Route path='/event' element={<EventPage />}/>
              <Route path='/event/:id' element={<EventContentPage />}/>
              <Route path='/event/:id/edit' element={<EditEventPage />}/>
              <Route path='/event/:id/edit/pages' element={<EditPagesOfEventPage />}/>
              <Route path='/event/:id/edit/pages/edit/:id_page' element={<EditPage />}/>
              <Route path='/event/:id/users' element={<UsersOfEventPage />}/>
              <Route path='/event/:id/users/add' element={<AddUserToEvent />}/>
              <Route path='/event/:id/comment' element={<CommentPage />}/> 
              <Route path='/event/calendar' element={<CalendarPage />}/>
              <Route path='/event/create' element={<CreateEventPage />}/>

              <Route path="/user" element={<UserPage />}/>
              <Route path="/user/edit" element={<EditUserPage />}/>
              <Route path="/user/spec" element={<SpecPage />}/>
              <Route path="/user/:id" element={<UserPage />}/>
              <Route path="/user/:id/spec" element={<SpecPage />}/>

              <Route path="/users" element={<UserListPage />}/>
              <Route path="/users/application" element={<ApplicationPage />}/>
            </Routes>
        </Background>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
