
import { MainLayout } from '@/Components/Layouts/MainLayout';

import useUserPage from './useUserPage';
function UserPage(){
    const [head, icon, content, panel] = useUserPage();

    return (
        <MainLayout header={head}>
            {panel}
            {icon}
            {content}
        </MainLayout>
    );
}

export default UserPage;