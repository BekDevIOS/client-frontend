import axios from "axios";
import { serverApi } from "../../lib/config";
import { Table } from "../../lib/types/table";

class TableService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async qrLanding(id: string): Promise<Table> {
    try {
      const url = this.path + `/table/qr/${id}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("qrLanding: ", result);
      const table = result.data.table;
      localStorage.setItem("tableData", JSON.stringify(table));
      return table;
    } catch (err) {
      console.log("Error, qrLanding: ", err);
      throw err;
    }
  }
}

export default TableService;
