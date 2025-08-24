import { Pagination } from "antd";
import "../custome.scss";
type PaginationType = {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  showSizeChanger: boolean;
};
const PaginationItem = ({
  current,

  total,
  onChange,
}: PaginationType) => {
  return (
    <Pagination
      current={current}
      total={total}
      onChange={onChange}
      showQuickJumper
      className="custom-pagination"
      pageSize={6}
    />
  );
};

export default PaginationItem;
