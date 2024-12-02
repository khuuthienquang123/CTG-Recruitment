import axios from 'axios'

export async function getJobOpeningDetail(job_opening_id) {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/method/ctg_custom.ctg_custom.recruitment.admin.job_opening_management.get_job_opening_details?job_opening_id=${job_opening_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        return await response.data
    } catch (error) {
        console.error('Error fetching job opening detail: ', error)
    }
}

export async function getJobOpeningList() {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/method/ctg_custom.ctg_custom.recruitment.admin.job_opening_management.get_job_opening_list`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            },
        )
        return await response.data
    } catch (error) {
        console.error('Error fetching job opening list: ', error)
    }
}

export async function submitJobApplication(formData) {
    try {
        console.log("Submitting data via Axios:", formData);
        console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/method/ctg_custom.ctg_custom.recruitment.admin.job_application_management.submit_job_application`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during Axios POST:", error);
        throw error;
    }
}


