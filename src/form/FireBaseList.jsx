import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFirestore from "../firebase/useFirestore";
import FireBaseForm from "./FireBaseForm";

const FireBaseList = () => {
  const { t } = useTranslation();
  const { data, loading, error, addData, updateData, deleteData, fetchData } =
    useFirestore("practice");
  useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteData = (id) => {};
  const handleUpdateData = (id, data) => {
    return <FireBaseForm id={id} data={data} />;
  };

  return (
    <div>
      {data && data.length > 0 && (
        <table className="table-responsive">
          <thead className="thead">
            <tr>
              <td>{t("first-name")}</td>
              <td>{t("last-name")}</td>
              <td>{t("email")}</td>
              <td>{t("actions")}</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={`${item.id + index}`}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.userName}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateData(item.id, item)}
                    >
                      {t("update")}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteData(item.id)}
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FireBaseList;
