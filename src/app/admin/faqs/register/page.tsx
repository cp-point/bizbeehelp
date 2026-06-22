import { Suspense } from 'react';
import FaqRegister from '../../../../../components/pages/admin/faqs/register/FaqRegister';

const FaqRegisterPage = () => {
    return (
        <Suspense fallback={null}>
            <FaqRegister />
        </Suspense>
    );
};

export default FaqRegisterPage;
