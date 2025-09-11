import axios from "axios";
import { serverApi } from "../../lib/config";
import { Table, TableUpdateInput } from "../../lib/types/table";

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
      localStorage.removeItem("memberData");
      return table;
    } catch (err) {
      console.log("Error, qrLanding: ", err);
      throw err;
    }
  }

  public async updateChosenTable(
    id: string,
    input: TableUpdateInput
  ): Promise<void> {
    try {
      const url = this.path + `/admin/table/${id}`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("updateChosenTable:", result);
      localStorage.removeItem("tableData");
    } catch (err) {
      console.log("Error, updateChosenTable:", err);
      throw err;
    }
  }
}

export default TableService;
