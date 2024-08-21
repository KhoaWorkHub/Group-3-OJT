import httpRequest from './../utils/HttpRequest';
export const updateQuestions = async (id,updatedQuestion) => {
    try {
        const res = await httpRequest.put(`questions/${id}`, 
            updatedQuestion 
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}