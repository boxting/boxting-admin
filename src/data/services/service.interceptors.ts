
export default function ErrorInterceptor(error: any){

    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (expectedError) {
        throw (error.response.data);
    }
}