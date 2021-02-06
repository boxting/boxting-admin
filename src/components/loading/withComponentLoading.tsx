import React from 'react';
function WithLoadingComponent(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return <p style={{ textAlign: 'center', fontSize: '30px' }}>Cargando...</p>;
    };
}
export default WithLoadingComponent;
