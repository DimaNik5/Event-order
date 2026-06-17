import SignLayout from '@/Components/Layouts/SignLayout';
import useSignPage from './useSignPage';

export default function SignPage(){
    const content = useSignPage();

    return (
        <SignLayout>
            {content}
        </SignLayout>
    );
}

