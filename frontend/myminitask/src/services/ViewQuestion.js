import httpRequest from './../utils/HttpRequest';
export const viewQuestions = async () => {
    try {
        const res = await httpRequest.get('questions');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}