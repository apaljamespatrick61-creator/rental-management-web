import { useQuery } from "@tanstack/react-query";
import { getTransactionByIdRequest } from "../../api/api-transaction";

export const useGetTransactionByIdQuery = (id: string) => {
    const getTransactionByIdQuery = useQuery({
        queryKey: ["transaction", id],
        queryFn: () => getTransactionByIdRequest(id),
        enabled: !!id,
    });
    return { getTransactionByIdQuery };
};
