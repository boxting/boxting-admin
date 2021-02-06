import React from 'react';
import PlatformLayout from '@/components/dashboard';

const dashboardWrapper = (Component: React.FC): React.FC => {
    const Wrapper: React.FC = () => (
        <PlatformLayout>
            <Component />
        </PlatformLayout>
    );
    return Wrapper;
};

export default dashboardWrapper;
