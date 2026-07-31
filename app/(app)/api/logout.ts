import api from "@/src/shared/lib/axios";

export const logoutRequest = async () => {  
    return api.post("/auth/logout");
};

