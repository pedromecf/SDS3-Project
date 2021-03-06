import axios from "axios";
import Pagination from "components/Pagination";
import { formatLocalDate } from "components/utils/Format";
import { BASE_URL } from "components/utils/Requests";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";

const DataTable = () => {

    const [activePage, setActivePage] = useState(0);
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/api/v1/sales?page=${activePage}&size=20&sort=amount,desc`).then((response) => {
            setPage(response.data);
        })
    }, [activePage])

    const changePage = (index : number) => {
        setActivePage(index);
    }


    return (
        <>
            <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map((item) => (
                            <tr key={item.id}>
                                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                <td>{item.seller.name}</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
}

export default DataTable;