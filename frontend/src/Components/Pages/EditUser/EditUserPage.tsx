
import { MainLayout } from '@/Components/Layouts/MainLayout';

import useEditUserPage from './useEditUserPage';

function EditUserPage(){
    const [head, content] = useEditUserPage();

    return (
        <MainLayout header={head}>
            {content}
        </MainLayout>
    );
}

export default EditUserPage;