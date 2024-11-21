import { getIdUserFetchData } from "../../hooks/getIdUserFetchData";
import { formatDatetime } from "../../utils/formatDateTime";

export const Comment = ({ data }) => {
  const { userData } = getIdUserFetchData(data.account_id);

  return (
    <div className="comment-item">
      <div className="item-image">
        <img
          className="image"
          src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          alt=""
        />
      </div>
      <div className="item-info">
        <div className="item-info_user">
          <p>{userData?.username}</p>
          <p style={{ color: "#ccc" }}>{formatDatetime(data?.createdAt)}</p>
        </div>
        <div className="item-info_comment">
          <p>{data?.comment}</p>
        </div>
      </div>
    </div>
  );
};
